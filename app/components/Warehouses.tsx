import { Building2, MapPin, Package, AlertCircle } from "lucide-react";
import { warehouses } from "../data/mockData";

export function Warehouses() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Warehouse Management</h1>
          <p className="text-gray-600 mt-1">Monitor storage facilities and bonded zones</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Add Warehouse
        </button>
      </div>

      {/* Warehouses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {warehouses.map((warehouse) => {
          const utilizationPercentage = (warehouse.currentStock / warehouse.capacity) * 100;
          const isHighUtilization = utilizationPercentage >= 80;

          return (
            <div key={warehouse.id} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  warehouse.isBonded ? "bg-purple-100 text-purple-600" : "bg-blue-100 text-blue-600"
                }`}>
                  <Building2 className="w-6 h-6" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{warehouse.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                        <MapPin className="w-4 h-4" />
                        {warehouse.location}
                      </div>
                    </div>
                    {warehouse.isBonded && (
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-700 border border-purple-300">
                        Bonded Zone
                      </span>
                    )}
                  </div>

                  {/* Capacity Info */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Storage Utilization</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">
                          {warehouse.currentStock.toLocaleString()} / {warehouse.capacity.toLocaleString()} units
                        </span>
                        {isHighUtilization && (
                          <AlertCircle className="w-4 h-4 text-orange-600" />
                        )}
                      </div>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          isHighUtilization ? "bg-orange-500" : "bg-blue-500"
                        }`}
                        style={{ width: `${utilizationPercentage}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-500">{utilizationPercentage.toFixed(1)}% full</span>
                      {isHighUtilization && (
                        <span className="text-xs text-orange-600 font-medium">High utilization</span>
                      )}
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Available Space</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {(warehouse.capacity - warehouse.currentStock).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Type</p>
                      <p className="text-sm font-medium text-gray-900">
                        {warehouse.isBonded ? "Customs Controlled" : "Standard Storage"}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      View Inventory
                    </button>
                    <button className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      Manage
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          label="Total Warehouses"
          value={warehouses.length.toString()}
          icon={Building2}
        />
        <StatCard
          label="Bonded Facilities"
          value={warehouses.filter(w => w.isBonded).length.toString()}
          icon={Package}
        />
        <StatCard
          label="Total Capacity"
          value={warehouses.reduce((sum, w) => sum + w.capacity, 0).toLocaleString()}
          icon={Package}
        />
        <StatCard
          label="Current Stock"
          value={warehouses.reduce((sum, w) => sum + w.currentStock, 0).toLocaleString()}
          icon={Package}
        />
      </div>

      {/* Bonded Zone Info */}
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <AlertCircle className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-purple-900 mb-2">Bonded Warehouses</h3>
            <p className="text-sm text-purple-700">
              Bonded warehouses are customs-controlled facilities where imported goods can be stored without payment of import duties. 
              These facilities enable deferred duty payment until goods are moved to domestic markets, providing significant cash flow advantages for international trade operations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon }: { label: string; value: string; icon: any }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200">
      <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-3">
        <Icon className="w-5 h-5" />
      </div>
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
      <p className="text-sm text-gray-600 mt-1">{label}</p>
    </div>
  );
}
