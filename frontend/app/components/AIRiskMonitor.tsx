import { Brain, AlertTriangle, TrendingUp, Shield, Clock, FileText } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { aiRiskLogs, shipments } from "../data/mockData";

export function AIRiskMonitor() {
  // Risk distribution
  const riskDistribution = [
    { name: "High Risk", value: aiRiskLogs.filter(log => log.riskLevel === "High").length, color: "#EF4444" },
    { name: "Medium Risk", value: aiRiskLogs.filter(log => log.riskLevel === "Medium").length, color: "#F59E0B" },
    { name: "Low Risk", value: aiRiskLogs.filter(log => log.riskLevel === "Low").length, color: "#10B981" },
  ];

  // Risk scores for chart
  const riskScores = aiRiskLogs.map(log => ({
    shipmentId: log.shipmentId.replace("SHP-", ""),
    score: log.riskScore,
    level: log.riskLevel,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">AI Risk Monitor</h1>
          <p className="text-gray-600 mt-1">Automated risk assessment powered by Local LLM Agent</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-green-700 font-medium">AI Agent Active</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          icon={Brain}
          label="Total Assessments"
          value={aiRiskLogs.length.toString()}
          color="blue"
        />
        <StatCard
          icon={AlertTriangle}
          label="High Risk Alerts"
          value={aiRiskLogs.filter(log => log.riskLevel === "High").length.toString()}
          color="red"
        />
        <StatCard
          icon={Shield}
          label="Low Risk"
          value={aiRiskLogs.filter(log => log.riskLevel === "Low").length.toString()}
          color="green"
        />
        <StatCard
          icon={TrendingUp}
          label="Avg Risk Score"
          value={(aiRiskLogs.reduce((sum, log) => sum + log.riskScore, 0) / aiRiskLogs.length).toFixed(1)}
          color="purple"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Distribution */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Level Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={riskDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {riskDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Scores */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Scores by Shipment</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={riskScores}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="shipmentId" />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Bar dataKey="score" fill="#3B82F6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Risk Logs */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent AI Risk Assessments</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {aiRiskLogs.map((log) => {
            const shipment = shipments.find(s => s.id === log.shipmentId);
            
            return (
              <div key={log.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    log.riskLevel === "High" ? "bg-red-100 text-red-600" :
                    log.riskLevel === "Medium" ? "bg-orange-100 text-orange-600" :
                    "bg-green-100 text-green-600"
                  }`}>
                    <Brain className="w-6 h-6" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">
                          Shipment {log.shipmentId}
                        </h4>
                        {shipment && (
                          <p className="text-sm text-gray-600 mt-1">
                            {shipment.origin} → {shipment.destination} via {shipment.mode}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <RiskBadge level={log.riskLevel} score={log.riskScore} />
                        <div className="text-right">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="w-4 h-4" />
                            {log.timestamp}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* AI Reasoning */}
                    <div className="bg-gray-50 p-4 rounded-lg mb-3">
                      <div className="flex items-start gap-2 mb-2">
                        <Brain className="w-4 h-4 text-blue-600 mt-0.5" />
                        <h5 className="text-sm font-semibold text-gray-900">AI Analysis</h5>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">{log.reasoning}</p>
                    </div>

                    {/* Recommendations */}
                    <div className="border-l-4 border-blue-500 pl-4">
                      <div className="flex items-start gap-2 mb-2">
                        <FileText className="w-4 h-4 text-blue-600 mt-0.5" />
                        <h5 className="text-sm font-semibold text-gray-900">Recommended Actions</h5>
                      </div>
                      <ul className="space-y-1">
                        {log.recommendations.split(";").map((rec, idx) => (
                          <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                            <span className="text-blue-600 mt-1">•</span>
                            <span>{rec.trim()}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI System Info */}
      <div className="bg-linear-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Local LLM Agent System</h3>
            <p className="text-sm text-gray-700 mb-4">
              Our AI Risk Assessment Agent analyzes shipments in real-time using multiple factors including product category, 
              HS codes, destination regulations, historical compliance data, and route complexity. The system provides automated 
              risk scoring and actionable recommendations to ensure smooth customs clearance.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InfoCard
                label="Analysis Factors"
                value="12+"
                description="Product type, regulations, history"
              />
              <InfoCard
                label="Response Time"
                value="<2s"
                description="Real-time risk assessment"
              />
              <InfoCard
                label="Accuracy Rate"
                value="94.3%"
                description="Based on historical data"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: {
  icon: any;
  label: string;
  value: string;
  color: "blue" | "red" | "green" | "purple";
}) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600",
    red: "bg-red-50 text-red-600",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200">
      <div className={`w-12 h-12 rounded-lg ${colorClasses[color]} flex items-center justify-center mb-4`}>
        <Icon className="w-6 h-6" />
      </div>
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
      <p className="text-sm text-gray-600 mt-1">{label}</p>
    </div>
  );
}

function RiskBadge({ level, score }: { level: string; score: number }) {
  const styles = {
    High: "bg-red-100 text-red-700 border-red-300",
    Medium: "bg-orange-100 text-orange-700 border-orange-300",
    Low: "bg-green-100 text-green-700 border-green-300",
  }[level] || "bg-gray-100 text-gray-700 border-gray-300";

  return (
    <div className={`px-4 py-2 rounded-lg border ${styles}`}>
      <div className="text-xs font-medium">{level} Risk</div>
      <div className="text-lg font-semibold">{score}/10</div>
    </div>
  );
}

function InfoCard({ label, value, description }: { label: string; value: string; description: string }) {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="text-xl font-semibold text-gray-900 mb-1">{value}</p>
      <p className="text-xs text-gray-600">{description}</p>
    </div>
  );
}
