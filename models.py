from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class ProductTier(db.Model):
    __tablename__ = 'product_tiers'
    id = db.Column(db.Integer, primary_key=True) [cite: 21]
    name = db.Column(db.String(50), nullable=False) # e.g., Electronics [cite: 22]
    duty_rate = db.Column(db.Float, nullable=False) # percentage [cite: 23]

class Currency(db.Model):
    __tablename__ = 'currencies'
    id = db.Column(db.Integer, primary_key=True) [cite: 25]
    code = db.Column(db.String(3), unique=True) # e.g., USD, XAF [cite: 26]
    exchange_rate_to_base = db.Column(db.Float, default=1.0) [cite: 28]

class Shipment(db.Model):
    __tablename__ = 'shipments'
    id = db.Column(db.Integer, primary_key=True) [cite: 36]
    description = db.Column(db.Text, nullable=False) [cite: 37]
    declared_category = db.Column(db.String(100)) [cite: 38]
    transit_status = db.Column(db.String(50), default='In-port') [cite: 34]