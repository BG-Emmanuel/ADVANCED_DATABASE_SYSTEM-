import { useState } from "react";
import { useNavigate } from "react-router";
import { 
  Package, 
  Brain, 
  Ship, 
  ShieldCheck, 
  TrendingUp, 
  Globe,
  ArrowRight,
  CheckCircle,
  Zap,
  BarChart3,
  Users,
  LogIn
} from "lucide-react";
import { AuthModal } from "./modals/AuthModal";

export function Landing() {
  const navigate = useNavigate();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup" | "forgot">("login");

  const handleAuthSuccess = () => {
    navigate("/dashboard");
  };

  const openAuthModal = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Risk Assessment",
      description: "Local LLM agent analyzes shipments in real-time, providing automated risk scoring and compliance recommendations.",
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: Ship,
      title: "Multi-Modal Tracking",
      description: "Monitor shipments across sea, air, and land routes with real-time customs clearance status updates.",
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: ShieldCheck,
      title: "Bonded Warehouse Management",
      description: "Manage customs-controlled facilities with deferred duty payments and international trade optimization.",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: BarChart3,
      title: "Smart Analytics",
      description: "Comprehensive dashboards with real-time insights into orders, inventory, and revenue trends.",
      color: "from-orange-500 to-red-600"
    },
    {
      icon: Globe,
      title: "Global Compliance",
      description: "HS Code integration ensures international regulatory compliance across all products and destinations.",
      color: "from-cyan-500 to-blue-600"
    },
    {
      icon: Users,
      title: "Customer Tier Management",
      description: "Automated loyalty programs with tier-based discounts and personalized service levels.",
      color: "from-violet-500 to-purple-600"
    }
  ];

  const stats = [
    { value: "94.3%", label: "AI Accuracy Rate" },
    { value: "<2s", label: "Risk Assessment Time" },
    { value: "12+", label: "Analysis Factors" },
    { value: "24/7", label: "System Monitoring" }
  ];

  const benefits = [
    "Reduce customs clearance delays by up to 60%",
    "Automated compliance checks for international regulations",
    "Real-time visibility across entire supply chain",
    "Multi-currency support with live exchange rates",
    "Inventory optimization with smart reorder alerts",
    "Comprehensive audit trails for all transactions"
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Smart-Border</h1>
                <p className="text-xs text-gray-600">Logistics Hub</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => openAuthModal("login")}
                className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </button>
              <button
                onClick={() => openAuthModal("signup")}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-sm text-blue-700 font-medium mb-6">
            <Zap className="w-4 h-4" />
            AI-Powered Logistics Intelligence
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Smart Cross-Border<br />
            <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Logistics Platform
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Streamline international trade with AI-driven risk assessment, real-time shipment tracking, 
            and intelligent warehouse management. Your complete solution for modern logistics operations.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => openAuthModal("signup")}
              className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all hover:shadow-lg font-medium text-lg flex items-center gap-2"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="#features"
              className="px-8 py-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-lg"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything You Need for Smart Logistics
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Built for modern supply chains with cutting-edge technology and intelligent automation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className={`w-14 h-14 bg-linear-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-linear-to-br from-blue-50 to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Optimize Your Supply Chain Operations
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                Smart-Border Logistics Hub combines advanced AI technology with comprehensive 
                management tools to deliver unmatched efficiency and compliance in international trade.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8">
                <div className="space-y-6">
                  {/* Mock Dashboard Preview */}
                  <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Live Dashboard</h3>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">156</div>
                      <div className="text-sm text-gray-600">Active Shipments</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">$2.4M</div>
                      <div className="text-sm text-gray-600">Monthly Revenue</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Ship className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">SHP-2601</div>
                        <div className="text-xs text-gray-500">Shanghai → Los Angeles</div>
                      </div>
                      <div className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                        On Track
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Brain className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">AI Risk Analysis</div>
                        <div className="text-xs text-gray-500">3 alerts require attention</div>
                      </div>
                      <div className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
                        Review
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-linear-to-br from-blue-400 to-indigo-500 rounded-full opacity-20 blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-linear-to-br from-purple-400 to-pink-500 rounded-full opacity-20 blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-linear-to-br from-blue-600 to-indigo-700 rounded-3xl p-12 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Transform Your Logistics?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join the future of smart border logistics with AI-powered insights and seamless operations
            </p>
            <button
              onClick={() => openAuthModal("signup")}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-50 transition-all hover:shadow-lg font-medium text-lg"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          
          {/* Background pattern */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-linear-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Smart-Border Logistics Hub</div>
                <div className="text-sm text-gray-600">Intelligent Supply Chain Management</div>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              © 2026 Smart-Border. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
        onSwitchMode={setAuthMode}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}