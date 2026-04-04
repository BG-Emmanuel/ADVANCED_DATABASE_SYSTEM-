import { useState } from "react";
import { Users, Search, Mail, Award, Calendar } from "lucide-react";
import { customers, customerTiers } from "../data/mockData";

export function Customers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [tierFilter, setTierFilter] = useState("All");

  // Filter customers
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTier = tierFilter === "All" || customer.tierId.toString() === tierFilter;
    return matchesSearch && matchesTier;
  });

  // Get tier name
  const getTierName = (tierId: number) => {
    return customerTiers.find(t => t.id === tierId)?.name || "Unknown";
  };

  // Get tier color
  const getTierColor = (tierId: number) => {
    const colors = {
      1: "bg-gray-100 text-gray-700 border-gray-300",
      2: "bg-slate-100 text-slate-700 border-slate-300",
      3: "bg-yellow-100 text-yellow-700 border-yellow-300",
      4: "bg-purple-100 text-purple-700 border-purple-300",
    };
    return colors[tierId as keyof typeof colors] || colors[1];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Customer Management</h1>
          <p className="text-gray-600 mt-1">Manage customer profiles and loyalty tiers</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Add Customer
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Tier Filter */}
          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Tiers</option>
            {customerTiers.map(tier => (
              <option key={tier.id} value={tier.id.toString()}>{tier.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Customer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCustomers.map((customer) => (
          <div key={customer.id} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-semibold">
                {customer.name.charAt(0)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{customer.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                      <Mail className="w-4 h-4" />
                      {customer.email}
                    </div>
                  </div>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getTierColor(customer.tierId)}`}>
                    <Award className="w-3 h-3 inline mr-1" />
                    {getTierName(customer.tierId)}
                  </span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Total Orders</p>
                    <p className="text-lg font-semibold text-gray-900">{customer.totalOrders}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Total Spent</p>
                    <p className="text-lg font-semibold text-gray-900">${(customer.totalSpent / 1000).toFixed(1)}K</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Member Since</p>
                    <p className="text-sm font-medium text-gray-900">{customer.registrationDate}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    View Orders
                  </button>
                  <button className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No customers found</h3>
          <p className="text-gray-600 mt-1">Try adjusting your filters or search query</p>
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {customerTiers.map(tier => {
          const tierCustomers = filteredCustomers.filter(c => c.tierId === tier.id);
          return (
            <div key={tier.id} className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <Award className={`w-5 h-5 ${
                  tier.id === 1 ? "text-gray-500" :
                  tier.id === 2 ? "text-slate-500" :
                  tier.id === 3 ? "text-yellow-500" :
                  "text-purple-500"
                }`} />
                <span className="font-semibold text-gray-900">{tier.name}</span>
              </div>
              <p className="text-2xl font-semibold text-gray-900">{tierCustomers.length}</p>
              <p className="text-xs text-gray-600 mt-1">{tier.discountPercentage}% discount</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
