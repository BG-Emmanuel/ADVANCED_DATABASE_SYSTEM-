# 🚀 AI-Driven Smart-Border Logistics Hub

> An advanced database system for automating cross-border trade, customs duty calculations, and AI-powered shipment fraud detection — designed with Cameroon's regional trade context in mind.

---

## 📋 Table of Contents

- [The Problem](#the-problem)
- [The Solution](#the-solution)
- [Key Features](#key-features)
- [Database Architecture](#database-architecture)
  - [Schema Overview](#schema-overview)
  - [Table Descriptions](#table-descriptions)
  - [Entity-Relationship Summary](#entity-relationship-summary)
- [AI & LLM Integration](#ai--llm-integration)
- [Transit Status Workflow](#transit-status-workflow)
- [Automated Duty Calculation](#automated-duty-calculation)
- [Setup & Installation](#setup--installation)
- [Usage Examples](#usage-examples)
- [Innovation Highlights](#innovation-highlights)
- [Technology Stack](#technology-stack)
- [Contributing](#contributing)

---

## The Problem

Cross-border trade in Central and West Africa — particularly through Cameroon's key border points — faces significant operational bottlenecks:

- **Manual Fraud Detection:** Customs officers must manually review thousands of shipping manifests, making it easy for misclassified goods to slip through and evade proper tariffs.
- **Complex Multi-Currency Customs Duties:** Traders deal with XAF (Central African Franc), USD, EUR, and other currencies simultaneously, making accurate duty calculation error-prone and time-consuming.
- **Lack of Real-Time Shipment Visibility:** Traders, logistics companies, and customs authorities have limited visibility into where goods are in the transit pipeline (port, customs clearance, in-transit).
- **Classification Fraud:** Fraudulent actors deliberately misclassify high-tariff goods under low-tariff HS codes to pay less duty.

---

## The Solution

The **Smart-Border Logistics Hub** is an AI-augmented database platform that:

1. **Automates duty calculations** using real-time exchange rates from the `Currencies` table and tiered pricing from `Customer_Tiers`.
2. **Tracks shipment transit status** in real time across border points and warehouses.
3. **Deploys a Local Large Language Model (LLM)** — such as [DeepSeek](https://www.deepseek.com/) or [Llama 3](https://llama.meta.com/) — via API to scan shipping descriptions and detect misclassification fraud.
4. **Logs AI risk assessments** in a dedicated `AI_Risk_Logs` table for audit trails and human review.

---

## Key Features

| Feature | Description |
|---|---|
| 🌍 **Multi-Currency Support** | Real-time exchange rate management via the `Currencies` table |
| 🏷️ **Tiered Customer Pricing** | Loyalty/compliance tiers with customs priority and discounts |
| 📦 **Transit Status Tracking** | Three-stage status: `In-Port` → `Customs-Cleared` → `In-Transit` |
| 🤖 **AI Fraud Detection** | LLM-powered scanning of shipping descriptions vs. HS codes |
| 🏭 **Bonded Warehouse Support** | Tracks goods in bonded (duty-deferred) warehouses |
| 📊 **Risk Scoring** | Every shipment gets a 0–100 AI risk score with reasoning |
| 🔄 **Harmonized System (HS) Codes** | Integrated HS code field for international customs classification |

---

## Database Architecture

### Schema Overview

The database is structured in five logical layers:

```
┌─────────────────────────────────────────────────────────┐
│  LAYER 1: Lookup Tables                                 │
│  Currencies | Customer_Tiers | Warehouses               │
├─────────────────────────────────────────────────────────┤
│  LAYER 2: Core Entities                                 │
│  Customers | Products | Attributes                      │
├─────────────────────────────────────────────────────────┤
│  LAYER 3: Relationships                                 │
│  Product_Attributes | Inventory                         │
├─────────────────────────────────────────────────────────┤
│  LAYER 4: Transactions                                  │
│  Orders | Shipments                                     │
├─────────────────────────────────────────────────────────┤
│  LAYER 5: AI Intelligence                               │
│  AI_Risk_Logs                                           │
└─────────────────────────────────────────────────────────┘
```

### Table Descriptions

#### 🏦 `Currencies`
Manages all supported currencies and their real-time exchange rates relative to USD.

| Column | Type | Description |
|---|---|---|
| `currency_code` | CHAR(3) PK | ISO 4217 code (e.g., `USD`, `XAF`, `EUR`) |
| `currency_name` | VARCHAR(50) | Full currency name |
| `exchange_rate_to_usd` | DECIMAL(12,6) | Live exchange rate — updated for duty calculations |

---

#### 🎖️ `Customer_Tiers`
Defines loyalty and compliance tiers that affect duty discounts and customs priority.

| Column | Type | Description |
|---|---|---|
| `tier_id` | INT PK | Tier identifier |
| `tier_name` | VARCHAR(20) | e.g., `Bronze`, `Silver`, `Gold`, `Platinum` |
| `discount_percentage` | DECIMAL(5,2) | Duty or pricing discount (0–100%) |
| `min_lifetime_value` | DECIMAL(12,2) | Minimum trade value to qualify for this tier |

---

#### 🏭 `Warehouses`
Represents physical infrastructure such as port terminals and CAMPOST logistics centers.

| Column | Type | Description |
|---|---|---|
| `warehouse_id` | INT PK | Facility identifier |
| `location` | VARCHAR(100) | Physical location (e.g., `Douala Port`, `Kribi Deep Sea Port`) |
| `capacity_units` | INT | Maximum storage units |
| `is_bonded_warehouse` | BOOLEAN | `TRUE` for bonded facilities where duty is deferred |

---

#### 👤 `Customers`
Trader and importer/exporter profiles registered on the platform.

| Column | Type | Description |
|---|---|---|
| `customer_id` | INT PK | Unique trader ID |
| `name` | VARCHAR(100) | Full name or company name |
| `email` | VARCHAR(255) | Unique contact email |
| `tier_id` | INT FK | Reference to `Customer_Tiers` |
| `registered_date` | DATE | Account registration date |

---

#### 📦 `Products`
Goods and commodities being shipped across borders.

| Column | Type | Description |
|---|---|---|
| `product_id` | INT PK | Product identifier |
| `product_name` | VARCHAR(200) | Full product description |
| `base_price` | DECIMAL(12,2) | Declared value in `currency_code` |
| `currency_code` | CHAR(3) FK | Reference to `Currencies` |
| `hs_code` | VARCHAR(20) | Harmonized System code for customs classification |
| `category` | VARCHAR(50) | Product category (used by AI for fraud detection) |

---

#### 🔖 `Attributes` & `Product_Attributes`
A flexible many-to-many system for tagging products with custom specifications (e.g., weight, hazard class, temperature sensitivity).

---

#### 📊 `Inventory`
Real-time stock tracking across all border points and warehouses, with **Transit Status** support.

| Column | Type | Description |
|---|---|---|
| `inventory_id` | INT PK | Record identifier |
| `product_id` | INT FK | Reference to `Products` |
| `warehouse_id` | INT FK | Reference to `Warehouses` |
| `quantity_on_hand` | INT | Current stock at location |
| `reorder_threshold` | INT | Minimum quantity before restocking alert |
| `transit_status` | VARCHAR(20) | `In-Port`, `Customs-Cleared`, or `In-Transit` |

> **Note:** The `transit_status` field extends the base `Inventory` table to support the three-stage logistics pipeline.

---

#### 🛒 `Orders`
Financial transaction records for each trade event, auto-incremented from sequence `order_seq` (starts at 1000).

| Column | Type | Description |
|---|---|---|
| `order_id` | INT PK | Auto-generated order number |
| `customer_id` | INT FK | Linked trader |
| `order_date` | TIMESTAMP | When the order was placed |
| `total_amount` | DECIMAL(12,2) | Total value (in base currency) |
| `status` | VARCHAR(20) | `PENDING`, `CONFIRMED`, `COMPLETED`, `CANCELLED` |

---

#### 🚢 `Shipments`
Physical shipment tracking with customs clearance status.

| Column | Type | Description |
|---|---|---|
| `shipment_id` | SERIAL PK | Auto-generated shipment ID |
| `order_id` | INT FK | Linked order |
| `origin_warehouse_id` | INT FK | Origin facility |
| `tracking_number` | VARCHAR(100) | Unique tracking code |
| `shipping_mode` | VARCHAR(20) | `Sea`, `Air`, or `Land` |
| `customs_status` | VARCHAR(20) | `UNDER_REVIEW`, `CLEARED`, or `FLAGGED` |
| `estimated_arrival` | TIMESTAMP | Expected delivery timestamp |

---

#### 🤖 `AI_Risk_Logs`
The AI intelligence layer. Every shipment reviewed by the LLM generates a risk log entry.

| Column | Type | Description |
|---|---|---|
| `log_id` | SERIAL PK | Auto-generated log ID |
| `shipment_id` | INT FK | Linked shipment |
| `risk_score` | DECIMAL(5,2) | AI-generated risk score (0.00 = safe, 100.00 = high risk) |
| `ai_reasoning` | TEXT | Natural language explanation of the AI's assessment |
| `assessment_date` | TIMESTAMP | When the AI performed the analysis |

---

### Entity-Relationship Summary

```
Currencies ──────< Products >──────── Product_Attributes >── Attributes
                      │
Customer_Tiers ──< Customers ──< Orders ──< Shipments ──< AI_Risk_Logs
                                               │
Warehouses ─────────────────────────────────< Inventory
                      └─────────────────────< Shipments (origin)
```

---

## AI & LLM Integration

### How It Works

The platform integrates a **locally-hosted LLM** (e.g., DeepSeek-R1 or Llama 3) via API to perform automated fraud detection on shipment descriptions.

```
┌──────────────────┐     Shipping Description      ┌─────────────────────┐
│   Shipments      │ ──────────────────────────────>│  Local LLM API      │
│  (new entry)     │                                │  (DeepSeek/Llama-3) │
└──────────────────┘                                └─────────┬───────────┘
                                                              │
                                                   Compares against:
                                                   • Product.category
                                                   • Product.hs_code
                                                   • Known fraud patterns
                                                              │
                                                    ┌─────────▼───────────┐
                                                    │   AI_Risk_Logs      │
                                                    │  risk_score: 0-100  │
                                                    │  ai_reasoning: TEXT │
                                                    └─────────────────────┘
```

### Fraud Detection Logic

The LLM is prompted to:
1. **Parse** the `product_name` and shipping description.
2. **Compare** the declared category and HS code against known classification databases.
3. **Flag** mismatches — for example, electronics declared as "kitchen utensils" to avoid a higher tariff.
4. **Generate** a `risk_score` and `ai_reasoning` narrative for the customs officer's review.

### Example AI Prompt Template

```
You are a customs fraud detection assistant. Analyze the following shipment:

Product Name: {product_name}
Declared Category: {category}
Declared HS Code: {hs_code}
Shipping Description: {shipping_description}

Does this shipment appear correctly classified? 
Provide a risk score from 0 (no risk) to 100 (high fraud risk) 
and a brief explanation of your reasoning.
```

### Recommended LLM Options

| Model | Hosting | Notes |
|---|---|---|
| **DeepSeek-R1** | Local / API | Excellent reasoning capability for classification tasks |
| **Llama 3 (8B/70B)** | Local via Ollama | Open-source, runs on-premise for data sovereignty |
| **Mistral 7B** | Local via Ollama | Lightweight, fast inference for high-volume shipments |

---

## Transit Status Workflow

Every shipment moves through three stages tracked in the `Inventory.transit_status` field:

```
 ┌───────────┐       Customs        ┌──────────────────┐      Cleared      ┌─────────────┐
 │  In-Port  │ ──── Submission ───> │  UNDER_REVIEW    │ ─── by Officer ──>│  Customs-   │
 │           │                      │  (Customs check  │                   │  Cleared    │
 └───────────┘                      │  + AI scan)      │                   └──────┬──────┘
                                    └──────────────────┘                          │
                                             │                                    │ Released
                                        AI flags risk                             ▼
                                             │                            ┌─────────────────┐
                                             ▼                            │   In-Transit    │
                                    ┌──────────────────┐                  │ (to destination)│
                                    │    FLAGGED       │                  └─────────────────┘
                                    │  (Hold for       │
                                    │  manual review)  │
                                    └──────────────────┘
```

---

## Automated Duty Calculation

Duty calculations leverage the `Currencies` and `Customer_Tiers` tables:

```sql
-- Example: Calculate duty-inclusive price in USD for a given product and customer
SELECT
    p.product_name,
    p.base_price,
    p.currency_code,
    c.exchange_rate_to_usd,
    (p.base_price / c.exchange_rate_to_usd) AS price_in_usd,
    ct.discount_percentage,
    (p.base_price / c.exchange_rate_to_usd) 
        * (1 - ct.discount_percentage / 100) AS duty_adjusted_price_usd
FROM Products p
JOIN Currencies c ON p.currency_code = c.currency_code
JOIN Customers cust ON cust.customer_id = :customer_id
JOIN Customer_Tiers ct ON cust.tier_id = ct.tier_id
WHERE p.product_id = :product_id;
```

**How it works:**
1. The declared product price is retrieved in its native currency.
2. The `exchange_rate_to_usd` converts it to a common base for tariff computation.
3. The customer's `discount_percentage` (based on their compliance tier) is applied.
4. The resulting figure is used as the dutiable value.

---

## Setup & Installation

### Prerequisites

- **PostgreSQL** 14+ (or compatible database engine)
- **Ollama** or a compatible LLM API server (for AI fraud detection)
- A preferred LLM model pulled locally: `ollama pull deepseek-r1` or `ollama pull llama3`

### Database Initialization

```bash
# 1. Create the database
psql -U postgres -c "CREATE DATABASE SmartBorderHub;"

# 2. Connect and run the schema script
psql -U postgres -d SmartBorderHub -f "Project sql script.sql"
```

### Adding the Transit Status Column

The `transit_status` column extends the `Inventory` table. Apply this migration after the base schema:

```sql
ALTER TABLE Inventory
ADD COLUMN transit_status VARCHAR(20) 
    DEFAULT 'In-Port' 
    CHECK (transit_status IN ('In-Port', 'Customs-Cleared', 'In-Transit'));
```

### Verify Installation

```sql
-- Check all tables were created
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;
```

Expected output:
```
 table_name
──────────────────
 ai_risk_logs
 attributes
 currencies
 customer_tiers
 customers
 inventory
 orders
 product_attributes
 products
 shipments
 warehouses
```

---

## Usage Examples

### 1. Register a New Currency

```sql
INSERT INTO Currencies (currency_code, currency_name, exchange_rate_to_usd)
VALUES 
    ('XAF', 'Central African CFA Franc', 0.001616),
    ('USD', 'US Dollar', 1.000000),
    ('EUR', 'Euro', 1.085000);
```

### 2. Add a Product with HS Code

```sql
INSERT INTO Products (product_id, product_name, base_price, currency_code, hs_code, category)
VALUES (101, 'Samsung Galaxy S24 Smartphone', 850000.00, 'XAF', '8517.12', 'Electronics');
```

### 3. Track a New Shipment

```sql
INSERT INTO Shipments (order_id, origin_warehouse_id, tracking_number, shipping_mode, customs_status, estimated_arrival)
VALUES (1000, 1, 'DBL-2025-XAF-00123', 'Sea', 'UNDER_REVIEW', NOW() + INTERVAL '5 days');
```

### 4. Log an AI Risk Assessment

```sql
INSERT INTO AI_Risk_Logs (shipment_id, risk_score, ai_reasoning)
VALUES (
    1,
    78.50,
    'Declared category "kitchen utensils" (HS: 7323.99) is inconsistent with the 
    product description containing terms such as "processor", "GHz", and "display". 
    High probability of electronics misclassification to avoid 30% import tariff.'
);
```

### 5. Query High-Risk Shipments

```sql
SELECT 
    s.tracking_number,
    s.customs_status,
    s.shipping_mode,
    a.risk_score,
    a.ai_reasoning,
    a.assessment_date
FROM Shipments s
JOIN AI_Risk_Logs a ON s.shipment_id = a.shipment_id
WHERE a.risk_score > 70
ORDER BY a.risk_score DESC;
```

---

## Innovation Highlights

| Innovation | Implementation |
|---|---|
| **Real-time currency conversion** | `Currencies.exchange_rate_to_usd` powers all duty calculations without manual currency lookups |
| **Tiered compliance rewards** | `Customer_Tiers.discount_percentage` incentivizes accurate declarations by giving verified traders lower duty rates |
| **AI-augmented customs** | `AI_Risk_Logs` stores LLM-generated risk scores so human officers focus only on flagged shipments |
| **Bonded warehouse logic** | `Warehouses.is_bonded_warehouse` enables duty-deferred storage, critical for transit trade corridors |
| **HS Code verification** | `Products.hs_code` field allows cross-referencing declared codes against LLM-known classification databases |
| **Audit trail** | Every AI assessment is timestamped and stored, creating a defensible audit trail for customs disputes |

---

## Technology Stack

| Component | Technology |
|---|---|
| **Database** | PostgreSQL 14+ |
| **Schema Language** | SQL (ANSI / PostgreSQL dialect) |
| **AI Model** | DeepSeek-R1 or Llama 3 (via Ollama or API) |
| **Currency Data** | Real-time exchange rate feed (e.g., Open Exchange Rates API) |
| **HS Code Reference** | World Customs Organization (WCO) Harmonized System |

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request.

Please ensure any SQL changes are backward-compatible and include migration scripts where needed.

---

*Built as part of an Advanced Database Systems academic project — this repository is educational in nature and serves as a proof-of-concept for applying AI-augmented database design to real-world cross-border logistics challenges in emerging markets. It is not intended for production deployment without further security hardening, performance tuning, and regulatory compliance review.*
