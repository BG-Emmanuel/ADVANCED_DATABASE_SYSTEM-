import { useState } from "react";
import { Box, Search, AlertCircle, TrendingDown } from "lucide-react";
import { inventory, products, warehouses } from "../data/mockData";

export function Inventory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [warehouseFilter, setWarehouseFilter] = useState("All");

  // Filter inventory
  const filteredInventory = inventory.filter(item => {
    const product = products.find(p => p.id === item.productId);
    const matchesSearch = product?.name.toLowerCase().includes(searchQuery.toLowerCase()) || false;
    const matchesWarehouse = warehouseFilter === "All" || item.warehouseId.toString() === warehouseFilter;
    return matchesSearch && matchesWarehouse;
  });

  // Get product details
  const getProduct = (productId: number) => {
    return products.find(p => p.id === productId);
  };

  // Get warehouse name
  const getWarehouseName = (warehouseId: number) => {
    return warehouses.find(w => w.id === warehouseId)?.name || "Unknown";
  };

  // Check if reorder needed
  const needsReorder = (item: typeof inventory[0]) => {
    return item.quantity <= item.reorderThreshold;
  };

  const lowStockItems = filteredInventory.filter(needsReorder);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600 mt-1">Track stock levels across all warehouses</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Add Stock
        </button>
      </div>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-orange-900">Low Stock Alert</h3>
              <p className="text-sm text-orange-700 mt-1">
                {lowStockItems.length} item{lowStockItems.length > 1 ? "s" : ""} below reorder threshold
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by product name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Warehouse Filter */}
          <select
            value={warehouseFilter}
            onChange={(e) => setWarehouseFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            title="Filter by warehouse"
          >
            <option value="All">All Warehouses</option>
            {warehouses.map(w => (
              <option key={w.id} value={w.id.toString()}>{w.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Inventory Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredInventory.map((item) => {
          const product = getProduct(item.productId);
          const lowStock = needsReorder(item);
          const stockPercentage = (item.quantity / (item.reorderThreshold * 3)) * 100;

          return (
            <div key={item.id} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  lowStock ? "bg-orange-100 text-orange-600" : "bg-blue-100 text-blue-600"
                }`}>
                  {lowStock ? <TrendingDown className="w-6 h-6" /> : <Box className="w-6 h-6" />}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{product?.name}</h3>
                      <p className="text-sm text-gray-600">HS Code: {product?.hsCode}</p>
                    </div>
                    {lowStock && (
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-700 border border-orange-300">
                        Low Stock
                      </span>
                    )}
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <DetailItem label="Warehouse" value={getWarehouseName(item.warehouseId)} />
                    <DetailItem label="Current Stock" value={item.quantity.toLocaleString()} />
                    <DetailItem label="Reorder At" value={item.reorderThreshold.toLocaleString()} />
                    <DetailItem label="Last Updated" value={item.lastUpdated} />
                  </div>

                  {/* Stock Level Bar */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-600">Stock Level</span>
                      <span className="text-xs font-medium text-gray-900">
                        {item.quantity.toLocaleString()} units
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          lowStock ? "bg-orange-500" : "bg-blue-500"
                        }`}
                        style={{ width: Math.min(stockPercentage, 100) + '%' }}
                        aria-label="Stock level bar"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredInventory.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <Box className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No inventory items found</h3>
          <p className="text-gray-600 mt-1">Try adjusting your filters or search query</p>
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard label="Total Items" value={filteredInventory.length.toString()} />
        <StatCard label="Low Stock Items" value={lowStockItems.length.toString()} color="orange" />
        <StatCard
          label="Total Units"
          value={filteredInventory.reduce((sum, item) => sum + item.quantity, 0).toLocaleString()}
        />
        <StatCard
          label="Warehouses"
          value={new Set(filteredInventory.map(item => item.warehouseId)).size.toString()}
        />
      </div>
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="text-sm font-medium text-gray-900">{value}</p>
    </div>
  );
}

function StatCard({ label, value, color = "blue" }: { label: string; value: string; color?: "blue" | "orange" }) {
  const colorClass = color === "orange" ? "text-orange-600" : "text-blue-600";
  
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200">
      <p className={`text-2xl font-semibold ${colorClass}`}>{value}</p>
      <p className="text-sm text-gray-600 mt-1">{label}</p>
    </div>
  );
}
