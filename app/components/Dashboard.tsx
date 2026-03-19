import { 
  Package, 
  ShoppingCart, 
  AlertTriangle, 
  TrendingUp, 
  DollarSign,
  Truck,
  CheckCircle,
  Clock
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";
import { orders, shipments, aiRiskLogs, customers, inventory } from "../data/mockData";

export function Dashboard() {
  // Calculate stats
  const totalOrders = orders.length;
  const activeShipments = shipments.filter(s => s.status === "In Transit").length;
  const highRiskShipments = aiRiskLogs.filter(log => log.riskLevel === "High").length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

  // Orders by status
  const ordersByStatus = [
    { name: "Processing", value: orders.filter(o => o.status === "Processing").length, color: "#3B82F6" },
    { name: "In Transit", value: orders.filter(o => o.status === "In Transit").length, color: "#F59E0B" },
    { name: "Customs", value: orders.filter(o => o.status === "Customs Clearance").length, color: "#EF4444" },
    { name: "Delivered", value: orders.filter(o => o.status === "Delivered").length, color: "#10B981" },
  ];

  // Shipments by mode
  const shipmentsByMode = [
    { name: "Sea", count: shipments.filter(s => s.mode === "Sea").length },
    { name: "Air", count: shipments.filter(s => s.mode === "Air").length },
    { name: "Land", count: shipments.filter(s => s.mode === "Land").length },
  ];

  // Weekly revenue (mock data)
  const weeklyRevenue = [
    { day: "Mon", revenue: 12500 },
    { day: "Tue", revenue: 15800 },
    { day: "Wed", revenue: 13200 },
    { day: "Thu", revenue: 18900 },
    { day: "Fri", revenue: 21400 },
    { day: "Sat", revenue: 9800 },
    { day: "Sun", revenue: 7200 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-1">Real-time logistics intelligence and operations monitoring</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={ShoppingCart}
          label="Total Orders"
          value={totalOrders.toString()}
          change="+12%"
          changeType="positive"
          color="blue"
        />
        <StatCard
          icon={Package}
          label="Active Shipments"
          value={activeShipments.toString()}
          change="+8%"
          changeType="positive"
          color="orange"
        />
        <StatCard
          icon={AlertTriangle}
          label="High Risk Alerts"
          value={highRiskShipments.toString()}
          change="-3%"
          changeType="negative"
          color="red"
        />
        <StatCard
          icon={DollarSign}
          label="Total Revenue"
          value={`$${(totalRevenue / 1000).toFixed(1)}K`}
          change="+18%"
          changeType="positive"
          color="green"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders Status Distribution */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Orders by Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={ordersByStatus}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {ordersByStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Shipments by Mode */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipments by Transport Mode</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={shipmentsByMode}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3B82F6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Weekly Revenue Trend */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Revenue Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weeklyRevenue}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Activity & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Shipments */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Shipments</h3>
          <div className="space-y-3">
            {shipments.slice(0, 5).map((shipment) => (
              <div key={shipment.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Truck className="w-5 h-5 text-blue-600" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{shipment.id}</p>
                  <p className="text-xs text-gray-500">{shipment.origin} → {shipment.destination}</p>
                </div>
                <StatusBadge status={shipment.status} />
              </div>
            ))}
          </div>
        </div>

        {/* AI Risk Alerts */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Risk Alerts</h3>
          <div className="space-y-3">
            {aiRiskLogs.slice(0, 5).map((log) => (
              <div key={log.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <AlertTriangle className={`w-5 h-5 mt-0.5 ${
                  log.riskLevel === "High" ? "text-red-600" : 
                  log.riskLevel === "Medium" ? "text-orange-600" : "text-green-600"
                }`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-gray-900">{log.shipmentId}</p>
                    <RiskBadge level={log.riskLevel} score={log.riskScore} />
                  </div>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">{log.reasoning}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, change, changeType, color }: {
  icon: any;
  label: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  color: "blue" | "orange" | "red" | "green";
}) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600",
    orange: "bg-orange-50 text-orange-600",
    red: "bg-red-50 text-red-600",
    green: "bg-green-50 text-green-600",
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200">
      <div className="flex items-center justify-between">
        <div className={`w-12 h-12 rounded-lg ${colorClasses[color]} flex items-center justify-center`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium ${
          changeType === "positive" ? "text-green-600" : "text-red-600"
        }`}>
          <TrendingUp className="w-4 h-4" />
          {change}
        </div>
      </div>
      <div className="mt-4">
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        <p className="text-sm text-gray-600 mt-1">{label}</p>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles = {
    "In Transit": "bg-blue-100 text-blue-700",
    "Processing": "bg-yellow-100 text-yellow-700",
    "Delivered": "bg-green-100 text-green-700",
    "Customs Hold": "bg-red-100 text-red-700",
    "Customs Clearance": "bg-orange-100 text-orange-700",
  }[status] || "bg-gray-100 text-gray-700";

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles}`}>
      {status}
    </span>
  );
}

function RiskBadge({ level, score }: { level: string; score: number }) {
  const styles = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-orange-100 text-orange-700",
    Low: "bg-green-100 text-green-700",
  }[level] || "bg-gray-100 text-gray-700";

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles}`}>
      {level} ({score})
    </span>
  );
}
