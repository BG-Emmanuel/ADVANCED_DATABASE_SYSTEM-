import { useState } from "react";
import { Package, MapPin, Calendar, Ship, Plane, Truck, Search, Filter } from "lucide-react";
import { shipments, orders, aiRiskLogs } from "../data/mockData";

export function Shipments() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [modeFilter, setModeFilter] = useState("All");

  // Filter shipments
  const filteredShipments = shipments.filter(shipment => {
    const matchesSearch = shipment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         shipment.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || shipment.status === statusFilter;
    const matchesMode = modeFilter === "All" || shipment.mode === modeFilter;
    return matchesSearch && matchesStatus && matchesMode;
  });

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case "Sea": return Ship;
      case "Air": return Plane;
      case "Land": return Truck;
      default: return Package;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Shipment Tracking</h1>
          <p className="text-gray-600 mt-1">Monitor all shipments in real-time</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          New Shipment
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by ID or tracking number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            title="Filter by shipment status"
          >
            <option value="All">All Statuses</option>
            <option value="In Transit">In Transit</option>
            <option value="Customs Hold">Customs Hold</option>
            <option value="Delivered">Delivered</option>
          </select>

          {/* Mode Filter */}
          <select
            value={modeFilter}
            onChange={(e) => setModeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            title="Filter by shipment mode"
          >
            <option value="All">All Modes</option>
            <option value="Sea">Sea</option>
            <option value="Air">Air</option>
            <option value="Land">Land</option>
          </select>
        </div>
      </div>

      {/* Shipments Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredShipments.map((shipment) => {
          const ModeIcon = getModeIcon(shipment.mode);
          const riskLog = aiRiskLogs.find(log => log.shipmentId === shipment.id);
          
          return (
            <div key={shipment.id} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  shipment.mode === "Sea" ? "bg-blue-100 text-blue-600" :
                  shipment.mode === "Air" ? "bg-purple-100 text-purple-600" :
                  "bg-green-100 text-green-600"
                }`}>
                  <ModeIcon className="w-6 h-6" />
                </div>

                {/* Main Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{shipment.id}</h3>
                      <p className="text-sm text-gray-600">Tracking: {shipment.trackingNumber}</p>
                    </div>
                    <div className="flex gap-2">
                      <StatusBadge status={shipment.status} />
                      {riskLog && <RiskBadge level={riskLog.riskLevel} />}
                    </div>
                  </div>

                  {/* Route */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{shipment.origin}</span>
                    </div>
                    <div className="flex-1 h-px bg-gray-300 relative">
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-400 rounded-full"></div>
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-400 rounded-full"></div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{shipment.destination}</span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <DetailItem label="Mode" value={shipment.mode} />
                    <DetailItem label="Departure" value={shipment.departureDate} />
                    <DetailItem label="Est. Arrival" value={shipment.estimatedArrival} />
                    <DetailItem label="Customs" value={shipment.customsStatus} />
                  </div>

                  {/* AI Risk Info */}
                  {riskLog && riskLog.riskLevel !== "Low" && (
                    <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <p className="text-sm text-gray-700">{riskLog.reasoning}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredShipments.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No shipments found</h3>
          <p className="text-gray-600 mt-1">Try adjusting your filters or search query</p>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles = {
    "In Transit": "bg-blue-100 text-blue-700",
    "Processing": "bg-yellow-100 text-yellow-700",
    "Delivered": "bg-green-100 text-green-700",
    "Customs Hold": "bg-red-100 text-red-700",
  }[status] || "bg-gray-100 text-gray-700";

  return (
    <span className={`px-3 py-1 text-xs font-medium rounded-full ${styles}`}>
      {status}
    </span>
  );
}

function RiskBadge({ level }: { level: string }) {
  const styles = {
    High: "bg-red-100 text-red-700 border-red-300",
    Medium: "bg-orange-100 text-orange-700 border-orange-300",
    Low: "bg-green-100 text-green-700 border-green-300",
  }[level] || "bg-gray-100 text-gray-700 border-gray-300";

  return (
    <span className={`px-3 py-1 text-xs font-medium rounded-full border ${styles}`}>
      🤖 {level} Risk
    </span>
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
