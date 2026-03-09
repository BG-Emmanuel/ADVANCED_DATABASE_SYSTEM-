-- ==========================================================
-- STEP 1: DATABASE INITIALIZATION
-- ==========================================================
-- CREATE DATABASE SmartBorderHub;
-- \c SmartBorderHub;

-- ==========================================================
-- STEP 2: INDEPENDENT LOOKUP TABLES
-- ==========================================================

-- Core currency management for international transit
CREATE TABLE Currencies (
    currency_code CHAR(3) PRIMARY KEY,
    currency_name VARCHAR(50) NOT NULL,
    exchange_rate_to_usd DECIMAL(12,6) DEFAULT 1.0
);

-- Loyalty tiers linked to customs priority or discounts
CREATE TABLE Customer_Tiers (
    tier_id INT PRIMARY KEY,
    tier_name VARCHAR(20) NOT NULL,
    discount_percentage DECIMAL(5,2) CHECK (discount_percentage BETWEEN 0 AND 100),
    min_lifetime_value DECIMAL(12,2) DEFAULT 0
);

-- Physical infrastructure (Ports or CAMPOST Centers)
CREATE TABLE Warehouses (
    warehouse_id INT PRIMARY KEY,
    location VARCHAR(100) NOT NULL,
    capacity_units INT,
    is_bonded_warehouse BOOLEAN DEFAULT FALSE -- Critical for Customs logic
);

-- ==========================================================
-- STEP 3: CORE ENTITIES
-- ==========================================================

-- User/Trader profiles
CREATE TABLE Customers (
    customer_id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    tier_id INT REFERENCES Customer_Tiers(tier_id),
    registered_date DATE DEFAULT CURRENT_DATE
);

-- Goods being shipped
CREATE TABLE Products (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(200) NOT NULL,
    base_price DECIMAL(12,2) NOT NULL,
    currency_code CHAR(3) REFERENCES Currencies(currency_code),
    hs_code VARCHAR(20), -- Harmonized System code for Customs classification
    category VARCHAR(50)
);

-- Lookup table for product specifications
CREATE TABLE Attributes (
    attribute_id INT PRIMARY KEY,
    attribute_name VARCHAR(50) NOT NULL
);

-- ==========================================================
-- STEP 4: RELATIONSHIPS & JUNCTION TABLES
-- ==========================================================

-- Link products to their specific attributes (Many-to-Many)
CREATE TABLE Product_Attributes (
    product_id INT REFERENCES Products(product_id),
    attribute_id INT REFERENCES Attributes(attribute_id),
    value VARCHAR(100) NOT NULL,
    PRIMARY KEY (product_id, attribute_id)
);

-- Real-time stock tracking across various border points
CREATE TABLE Inventory (
    inventory_id INT PRIMARY KEY,
    product_id INT REFERENCES Products(product_id),
    warehouse_id INT REFERENCES Warehouses(warehouse_id),
    quantity_on_hand INT DEFAULT 0,
    reorder_threshold INT DEFAULT 10,
    UNIQUE(product_id, warehouse_id)
);

-- ==========================================================
-- STEP 5: TRANSACTIONS & INNOVATIVE LOGISTICS
-- ==========================================================

CREATE SEQUENCE order_seq START 1000;

-- Financial transaction record
CREATE TABLE Orders (
    order_id INT PRIMARY KEY DEFAULT nextval('order_seq'),
    customer_id INT REFERENCES Customers(customer_id),
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(12,2),
    status VARCHAR(20) DEFAULT 'PENDING'
);

-- The "Innovation": Physical shipment tracking and customs status
CREATE TABLE Shipments (
    shipment_id SERIAL PRIMARY KEY,
    order_id INT REFERENCES Orders(order_id),
    origin_warehouse_id INT REFERENCES Warehouses(warehouse_id),
    tracking_number VARCHAR(100) UNIQUE NOT NULL,
    shipping_mode VARCHAR(20) CHECK (shipping_mode IN ('Sea', 'Air', 'Land')),
    customs_status VARCHAR(20) DEFAULT 'UNDER_REVIEW', -- UNDER_REVIEW, CLEARED, FLAGGED
    estimated_arrival TIMESTAMP
);

-- The "Smart" Component: Destination for AI Agent analysis
CREATE TABLE AI_Risk_Logs (
    log_id SERIAL PRIMARY KEY,
    shipment_id INT REFERENCES Shipments(shipment_id),
    risk_score DECIMAL(5,2), -- 0.00 to 100.00 calculated by your LLM
    ai_reasoning TEXT, -- Narrative explanation for the flag
    assessment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);