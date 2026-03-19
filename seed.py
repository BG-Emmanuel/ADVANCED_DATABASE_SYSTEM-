from app import app
from models import db, ProductTier, Currency

def seed_data():
    with app.app_context():
        # Add Product Tiers [cite: 20, 22, 23]
        if not ProductTier.query.first():
            tiers = [
                ProductTier(name="Electronics", duty_rate=15.0),
                ProductTier(name="Perishables", duty_rate=5.0),
                ProductTier(name="General Goods", duty_rate=10.0)
            ]
            db.session.bulk_save_objects(tiers)
        
        # Add Currencies [cite: 24, 26, 28]
        if not Currency.query.first():
            currencies = [
                Currency(code="USD", name="US Dollar", exchange_rate_to_base=600.0), # Example XAF rate
                Currency(code="XAF", name="Central African CFA Franc", exchange_rate_to_base=1.0)
            ]
            db.session.bulk_save_objects(currencies)
            
        db.session.commit()
        print("Database seeded successfully!")

if __name__ == "__main__":
    seed_data()