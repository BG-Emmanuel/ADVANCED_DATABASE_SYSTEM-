import requests
from models import ProductTier, Currency

def call_local_llm(description, category):
    """
    Simulates a call to a local LLM like Llama-3 or DeepSeek[cite: 63].
    Checks if description matches the declared category[cite: 64].
    """
    # In production, replace with: requests.post("http://localhost:11434/api/generate", ...)
    prompt = f"Does '{description}' match the category '{category}'? Answer YES or NO."
    
    # Logic: if description contains 'phone' but category is 'Perishables', flag it.
    if "phone" in description.lower() and category.lower() == "perishables":
        return False, "LLM: description mismatch - electronics found in perishables" [cite: 49]
    return True, "Match"

def calculate_customs_duty(amount, tier_id, currency_id):
    """Computes duty based on product tier and exchange rate[cite: 55, 60]."""
    tier = ProductTier.query.get(tier_id)
    curr = Currency.query.get(currency_id)
    
    # Duty = (Amount * Exchange Rate) * Duty Rate
    base_value = amount * curr.exchange_rate_to_base
    duty_total = base_value * (tier.duty_rate / 100)
    return round(duty_total, 2)