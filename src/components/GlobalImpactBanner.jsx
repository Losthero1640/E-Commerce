import React, { useState, useEffect } from 'react';
import { Leaf, Users, TreePine, Award, TrendingUp, Globe } from 'lucide-react';
import { getGlobalImpactStats } from '../lib/database';

export const GlobalImpactBanner = () => {
  const [stats, setStats] = useState({
    total_carbon_saved_kg: 1247.5,
    total_eco_purchases: 3420,
    total_customers_helped: 892,
    trees_equivalent: 62
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGlobalStats();
  }, []);

  const fetchGlobalStats = async () => {
    try {
      const data = await getGlobalImpactStats();
      setStats(data);
    } catch (error) {
      console.log('Using demo stats - Supabase not connected');
      // Keep default demo stats
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
  };

  return (
    <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-8 mb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Globe className="w-8 h-8" />
            <h2 className="text-3xl font-bold">EcoMart Global Impact</h2>
          </div>
          <p className="text-green-100 text-lg">
            Together, we're making a difference for our planet
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Carbon Saved */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-8 h-8" />
            </div>
            <div className="text-3xl font-bold mb-2">
              {formatNumber(stats.total_carbon_saved_kg)}kg
            </div>
            <div className="text-green-100 text-sm">
              Carbon Emissions Saved
            </div>
            <div className="text-xs text-green-200 mt-1">
              Through eco-friendly purchases
            </div>
          </div>

          {/* Eco Purchases */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8" />
            </div>
            <div className="text-3xl font-bold mb-2">
              {formatNumber(stats.total_eco_purchases)}
            </div>
            <div className="text-green-100 text-sm">
              Eco-Friendly Purchases
            </div>
            <div className="text-xs text-green-200 mt-1">
              Products with 4.0+ carbon rating
            </div>
          </div>

          {/* Customers Helped */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8" />
            </div>
            <div className="text-3xl font-bold mb-2">
              {formatNumber(stats.total_customers_helped)}
            </div>
            <div className="text-green-100 text-sm">
              Eco-Conscious Customers
            </div>
            <div className="text-xs text-green-200 mt-1">
              Making sustainable choices
            </div>
          </div>

          {/* Trees Equivalent */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <TreePine className="w-8 h-8" />
            </div>
            <div className="text-3xl font-bold mb-2">
              {formatNumber(stats.trees_equivalent)}
            </div>
            <div className="text-green-100 text-sm">
              Trees Equivalent
            </div>
            <div className="text-xs text-green-200 mt-1">
              Annual CO₂ absorption
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <Award className="w-6 h-6" />
              <span className="text-xl font-semibold">Join the Movement</span>
            </div>
            <p className="text-green-100 mb-4">
              Every eco-friendly purchase you make contributes to reducing global carbon emissions. 
              Choose products with higher carbon ratings and help us reach our next milestone!
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                <span>Real-time impact tracking</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                <span>Verified carbon savings</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                <span>Community impact</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};