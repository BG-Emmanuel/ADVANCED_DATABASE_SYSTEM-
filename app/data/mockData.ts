// Core Reference Entities
export const currencies = [
  { id: 1, code: "USD", name: "US Dollar", rate: 1.0, symbol: "$" },
  { id: 2, code: "EUR", name: "Euro", rate: 0.92, symbol: "€" },
  { id: 3, code: "GBP", name: "British Pound", rate: 0.79, symbol: "£" },
  { id: 4, code: "JPY", name: "Japanese Yen", rate: 149.5, symbol: "¥" },
  { id: 5, code: "CNY", name: "Chinese Yuan", rate: 7.24, symbol: "¥" },
];

export const customerTiers = [
  { id: 1, name: "Bronze", discountPercentage: 0, minSpend: 0 },
  { id: 2, name: "Silver", discountPercentage: 5, minSpend: 10000 },
  { id: 3, name: "Gold", discountPercentage: 10, minSpend: 50000 },
  { id: 4, name: "Platinum", discountPercentage: 15, minSpend: 100000 },
];

export const warehouses = [
  { id: 1, name: "Shanghai Port Warehouse", location: "Shanghai, China", isBonded: true, capacity: 50000, currentStock: 32500 },
  { id: 2, name: "LA Distribution Center", location: "Los Angeles, USA", isBonded: false, capacity: 35000, currentStock: 28000 },
  { id: 3, name: "Rotterdam Hub", location: "Rotterdam, Netherlands", isBonded: true, capacity: 45000, currentStock: 31000 },
  { id: 4, name: "Dubai Free Zone", location: "Dubai, UAE", isBonded: true, capacity: 30000, currentStock: 18500 },
  { id: 5, name: "Singapore Logistics Park", location: "Singapore", isBonded: true, capacity: 40000, currentStock: 35200 },
];

export const attributes = [
  { id: 1, name: "Weight", unit: "kg" },
  { id: 2, name: "Fragility", unit: "rating" },
  { id: 3, name: "Hazardous Material", unit: "boolean" },
  { id: 4, name: "Temperature Sensitive", unit: "celsius" },
  { id: 5, name: "Perishable", unit: "boolean" },
  { id: 6, name: "High Value", unit: "boolean" },
];

// Commercial Entities
export const customers = [
  { id: 1, name: "TechCorp Industries", email: "contact@techcorp.com", tierId: 3, registrationDate: "2023-05-15", totalOrders: 156, totalSpent: 78500 },
  { id: 2, name: "Global Trade Solutions", email: "info@globaltrade.com", tierId: 4, registrationDate: "2022-11-20", totalOrders: 342, totalSpent: 156000 },
  { id: 3, name: "Pacific Imports Ltd", email: "orders@pacificimports.com", tierId: 2, registrationDate: "2024-01-10", totalOrders: 89, totalSpent: 32400 },
  { id: 4, name: "Eastern Commerce Co", email: "sales@easterncom.com", tierId: 3, registrationDate: "2023-08-22", totalOrders: 203, totalSpent: 92100 },
  { id: 5, name: "Metro Distributors", email: "contact@metrodist.com", tierId: 1, registrationDate: "2025-12-01", totalOrders: 23, totalSpent: 8900 },
];

export const products = [
  { id: 1, name: "Electronic Components A500", hsCode: "8542.31", category: "Electronics", price: 125.50, currencyId: 1 },
  { id: 2, name: "Industrial Machinery Parts", hsCode: "8483.40", category: "Machinery", price: 890.00, currencyId: 1 },
  { id: 3, name: "Textile Fabrics Premium", hsCode: "5407.61", category: "Textiles", price: 45.75, currencyId: 2 },
  { id: 4, name: "Medical Diagnostic Equipment", hsCode: "9027.80", category: "Medical", price: 2350.00, currencyId: 1 },
  { id: 5, name: "Automotive Sensors", hsCode: "9026.20", category: "Automotive", price: 67.30, currencyId: 1 },
  { id: 6, name: "Pharmaceutical Raw Materials", hsCode: "3004.90", category: "Pharmaceuticals", price: 456.80, currencyId: 2 },
  { id: 7, name: "Solar Panel Units", hsCode: "8541.40", category: "Energy", price: 320.00, currencyId: 1 },
  { id: 8, name: "Precision Tools Set", hsCode: "8207.30", category: "Tools", price: 189.99, currencyId: 3 },
];

export const productAttributes = [
  { productId: 1, attributeId: 1, value: "2.5" },
  { productId: 1, attributeId: 2, value: "High" },
  { productId: 2, attributeId: 1, value: "150" },
  { productId: 2, attributeId: 3, value: "false" },
  { productId: 4, attributeId: 4, value: "22" },
  { productId: 4, attributeId: 6, value: "true" },
  { productId: 6, attributeId: 4, value: "18" },
  { productId: 6, attributeId: 5, value: "true" },
];

// Operational & AI Logistics Entities
export const orders = [
  { id: 1001, customerId: 1, date: "2026-03-15", totalAmount: 5670.50, currencyId: 1, status: "Processing" },
  { id: 1002, customerId: 2, date: "2026-03-16", totalAmount: 12350.00, currencyId: 1, status: "Shipped" },
  { id: 1003, customerId: 3, date: "2026-03-17", totalAmount: 3240.75, currencyId: 2, status: "Delivered" },
  { id: 1004, customerId: 4, date: "2026-03-17", totalAmount: 8920.00, currencyId: 1, status: "Processing" },
  { id: 1005, customerId: 1, date: "2026-03-18", totalAmount: 15600.25, currencyId: 1, status: "In Transit" },
  { id: 1006, customerId: 5, date: "2026-03-18", totalAmount: 2100.00, currencyId: 1, status: "Processing" },
  { id: 1007, customerId: 2, date: "2026-03-19", totalAmount: 9870.50, currencyId: 1, status: "Customs Clearance" },
];

export const inventory = [
  { id: 1, productId: 1, warehouseId: 1, quantity: 2500, reorderThreshold: 500, lastUpdated: "2026-03-18" },
  { id: 2, productId: 2, warehouseId: 2, quantity: 450, reorderThreshold: 100, lastUpdated: "2026-03-17" },
  { id: 3, productId: 3, warehouseId: 3, quantity: 8900, reorderThreshold: 1000, lastUpdated: "2026-03-19" },
  { id: 4, productId: 4, warehouseId: 1, quantity: 120, reorderThreshold: 50, lastUpdated: "2026-03-18" },
  { id: 5, productId: 5, warehouseId: 4, quantity: 3400, reorderThreshold: 500, lastUpdated: "2026-03-16" },
  { id: 6, productId: 6, warehouseId: 5, quantity: 680, reorderThreshold: 200, lastUpdated: "2026-03-19" },
  { id: 7, productId: 7, warehouseId: 2, quantity: 890, reorderThreshold: 150, lastUpdated: "2026-03-18" },
  { id: 8, productId: 8, warehouseId: 3, quantity: 1560, reorderThreshold: 300, lastUpdated: "2026-03-17" },
];

export const shipments = [
  { id: "SHP-2601", orderId: 1002, trackingNumber: "TRK89234567890", mode: "Sea", origin: "Shanghai", destination: "Los Angeles", departureDate: "2026-03-16", estimatedArrival: "2026-04-05", status: "In Transit", customsStatus: "Cleared" },
  { id: "SHP-2602", orderId: 1005, trackingNumber: "TRK89234567891", mode: "Air", origin: "Rotterdam", destination: "Dubai", departureDate: "2026-03-18", estimatedArrival: "2026-03-21", status: "In Transit", customsStatus: "Pending" },
  { id: "SHP-2603", orderId: 1007, trackingNumber: "TRK89234567892", mode: "Sea", origin: "Singapore", destination: "Los Angeles", departureDate: "2026-03-14", estimatedArrival: "2026-03-25", status: "Customs Hold", customsStatus: "Under Review" },
  { id: "SHP-2604", orderId: 1001, trackingNumber: "TRK89234567893", mode: "Land", origin: "Los Angeles", destination: "New York", departureDate: "2026-03-15", estimatedArrival: "2026-03-22", status: "In Transit", customsStatus: "Not Required" },
  { id: "SHP-2605", orderId: 1003, trackingNumber: "TRK89234567894", mode: "Air", origin: "Dubai", destination: "Singapore", departureDate: "2026-03-10", estimatedArrival: "2026-03-13", status: "Delivered", customsStatus: "Cleared" },
];

export const aiRiskLogs = [
  { id: 1, shipmentId: "SHP-2603", riskScore: 8.5, riskLevel: "High", reasoning: "Product category flagged for additional inspection. HS Code 3004.90 requires pharmaceutical compliance verification. Destination country has strict import regulations.", timestamp: "2026-03-18 14:23:00", recommendations: "Request additional documentation; Schedule inspection; Contact customs broker" },
  { id: 2, shipmentId: "SHP-2602", riskScore: 4.2, riskLevel: "Medium", reasoning: "Air freight with high-value electronics. Temperature-sensitive cargo detected. Transit route through multiple jurisdictions.", timestamp: "2026-03-18 09:15:00", recommendations: "Monitor temperature controls; Verify insurance coverage; Track real-time location" },
  { id: 3, shipmentId: "SHP-2601", riskScore: 1.8, riskLevel: "Low", reasoning: "Standard industrial machinery shipment. All documentation complete. Route has low historical incident rate.", timestamp: "2026-03-16 11:30:00", recommendations: "Standard processing; No additional action required" },
  { id: 4, shipmentId: "SHP-2604", riskScore: 2.3, riskLevel: "Low", reasoning: "Domestic land transport with routine cargo. Customer has excellent compliance history.", timestamp: "2026-03-15 16:45:00", recommendations: "Standard processing; Regular updates to customer" },
  { id: 5, shipmentId: "SHP-2605", riskScore: 6.7, riskLevel: "Medium", reasoning: "Medical diagnostic equipment requires calibration certificates. High value shipment requires enhanced security measures.", timestamp: "2026-03-10 08:20:00", recommendations: "Verify calibration certificates; Enhanced security protocol; Priority handling" },
];
