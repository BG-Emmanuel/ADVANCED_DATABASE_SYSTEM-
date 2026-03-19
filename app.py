from flask import Flask, request, jsonify
from models import db, Shipment, ProductTier, Currency
from services import call_local_llm, calculate_customs_duty
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@localhost/border_db'
db.init_app(app)

@app.route('/api/shipment/declare', methods=['POST'])
def declare_shipment():
    data = request.json
    
    # 1. Run LLM Fraud Check [cite: 12]
    is_valid, reason = call_local_llm(data['description'], data['declared_category'])
    
    # 2. Create Shipment Record [cite: 35]
    new_shipment = Shipment(
        description=data['description'],
        declared_category=data['declared_category'],
        transit_status='Flagged' if not is_valid else 'In-port' [cite: 45]
    )
    db.session.add(new_shipment)
    db.session.commit()
    
    # 3. Calculate Duty if not flagged [cite: 61]
    duty = 0
    if is_valid:
        duty = calculate_customs_duty(data['value'], data['tier_id'], data['currency_id'])
        
    return jsonify({
        "shipment_id": new_shipment.id,
        "verified": is_valid,
        "flag_reason": reason if not is_valid else None,
        "calculated_duty": duty,
        "status": new_shipment.transit_status
    })

if __name__ == '__main__':
    with app.app_context():
        db.create_all() # Creates tables on first run
    app.run(debug=True)