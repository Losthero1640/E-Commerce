import React, { useState } from 'react';
import { X, Gift, Percent, Truck, Star, Leaf, Check, Award } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

export const RewardsModal = ({ isOpen, onClose, onRewardRedeemed }) => {
  const { carbonCredits, spendCarbonCredits } = useUser();
  const [redeemedRewards, setRedeemedRewards] = useState([]);

  const rewards = [
    {
      id: 'discount-5',
      title: '5% Off Next Purchase',
      description: 'Get 5% discount on your next order',
      cost: 50,
      type: 'discount',
      value: 5,
      icon: Percent,
      color: 'blue'
    },
    {
      id: 'discount-10',
      title: '10% Off Next Purchase',
      description: 'Get 10% discount on your next order',
      cost: 100,
      type: 'discount',
      value: 10,
      icon: Percent,
      color: 'purple'
    },
    {
      id: 'discount-15',
      title: '15% Off Next Purchase',
      description: 'Get 15% discount on your next order',
      cost: 150,
      type: 'discount',
      value: 15,
      icon: Percent,
      color: 'indigo'
    },
    {
      id: 'free-shipping',
      title: 'Free Carbon-Neutral Shipping',
      description: 'Free shipping with carbon offset included',
      cost: 30,
      type: 'shipping',
      value: 'free',
      icon: Truck,
      color: 'green'
    },
    {
      id: 'premium-support',
      title: 'Premium Eco-Support',
      description: '30 days of priority eco-friendly product guidance',
      cost: 80,
      type: 'support',
      value: 'premium',
      icon: Star,
      color: 'yellow'
    },
    {
      id: 'eco-bundle',
      title: 'Eco-Starter Bundle',
      description: 'Free eco-friendly starter kit with bamboo products',
      cost: 200,
      type: 'product',
      value: 'bundle',
      icon: Gift,
      color: 'emerald'
    },
    {
      id: 'tree-planting-10',
      title: 'Plant 10 Trees',
      description: 'Fund tree planting in your name',
      cost: 100,
      type: 'environmental',
      value: '10-trees',
      icon: Leaf,
      color: 'emerald'
    },
    {
      id: 'tree-planting-25',
      title: 'Plant 25 Trees',
      description: 'Fund tree planting project in your name',
      cost: 200,
      type: 'environmental',
      value: '25-trees',
      icon: Leaf,
      color: 'emerald'
    },
    {
      id: 'carbon-offset-premium',
      title: 'Premium Carbon Offset',
      description: 'Offset 1 ton of CO2 through verified projects',
      cost: 300,
      type: 'environmental',
      value: '1-ton-offset',
      icon: Award,
      color: 'emerald'
    }
  ];

  const handleRedeem = (reward) => {
    const canAfford = carbonCredits >= reward.cost;
      
    if (canAfford && !redeemedRewards.includes(reward.id)) {
      const success = spendCarbonCredits(reward.cost);
        
      if (success) {
        setRedeemedRewards([...redeemedRewards, reward.id]);
        if (onRewardRedeemed) {
          onRewardRedeemed(reward);
        }
        
        // Auto close after 2 seconds
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    }
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-800 border-blue-200',
      purple: 'bg-purple-100 text-purple-800 border-purple-200',
      indigo: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      green: 'bg-green-100 text-green-800 border-green-200',
      yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      emerald: 'bg-emerald-100 text-emerald-800 border-emerald-200'
    };
    return colors[color] || colors.emerald;
  };

  const getButtonClasses = (color, canAfford, isRedeemed) => {
    if (isRedeemed) {
      return 'bg-gray-100 text-gray-500 cursor-not-allowed';
    }
    if (!canAfford) {
      return 'bg-gray-200 text-gray-400 cursor-not-allowed';
    }
    
    const colors = {
      blue: 'bg-blue-600 hover:bg-blue-700 text-white',
      purple: 'bg-purple-600 hover:bg-purple-700 text-white',
      indigo: 'bg-indigo-600 hover:bg-indigo-700 text-white',
      green: 'bg-green-600 hover:bg-green-700 text-white',
      yellow: 'bg-yellow-600 hover:bg-yellow-700 text-white',
      emerald: 'bg-emerald-600 hover:bg-emerald-700 text-white'
    };
    return colors[color] || colors.emerald;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-emerald-50 to-green-50">
            <div className="flex items-center space-x-3">
              <div className="bg-emerald-100 p-3 rounded-full">
                <Award className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-emerald-800">Carbon Credits Rewards</h2>
                <p className="text-emerald-600 text-sm">Redeem your carbon credits for exclusive eco-friendly rewards</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-emerald-100 rounded-full">
              <X className="w-5 h-5 text-emerald-600" />
            </button>
          </div>

          <div className="p-6">
            {/* Balance */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-center space-x-3">
                <Award className="w-8 h-8 text-emerald-600" />
                <div className="text-center">
                  <p className="text-emerald-700 font-medium">Carbon Credits Balance</p>
                  <p className="text-4xl font-bold text-emerald-600">{carbonCredits.toLocaleString()}</p>
                  <p className="text-sm text-emerald-600 mt-1">Earned through carbon offsetting</p>
                </div>
              </div>
            </div>

            {/* Rewards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rewards.map((reward) => {
                const canAfford = carbonCredits >= reward.cost;
                const isRedeemed = redeemedRewards.includes(reward.id);
                const IconComponent = reward.icon;

                return (
                  <div
                    key={reward.id}
                    className={`border rounded-lg p-6 transition-all duration-200 ${
                      canAfford && !isRedeemed 
                        ? 'border-emerald-300 hover:shadow-md' 
                        : 'border-gray-200'
                    } ${isRedeemed ? 'bg-gray-50' : 'bg-white'}`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-full ${getColorClasses(reward.color)}`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      {isRedeemed && (
                        <div className="bg-emerald-100 text-emerald-800 p-1 rounded-full">
                          <Check className="w-4 h-4" />
                        </div>
                      )}
                    </div>

                    <h3 className="font-semibold text-gray-900 mb-2">{reward.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{reward.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Award className="w-4 h-4 text-emerald-600" />
                        <span className="font-bold text-emerald-600">
                          {reward.cost.toLocaleString()}
                        </span>
                        <span className="text-xs text-emerald-600">Credits</span>
                      </div>
                      
                      <button
                        onClick={() => handleRedeem(reward)}
                        disabled={!canAfford || isRedeemed}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${getButtonClasses(
                          reward.color,
                          canAfford,
                          isRedeemed
                        )}`}
                      >
                        {isRedeemed ? 'Redeemed' : canAfford ? 'Redeem' : 'Not Enough'}
                      </button>
                    </div>

                    {!canAfford && !isRedeemed && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <p className="text-xs text-gray-500">
                          Need {(reward.cost - carbonCredits).toLocaleString()} more Credits
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* How to Earn More */}
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-blue-800 mb-3">How to Earn More Carbon Credits</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                  <span className="text-blue-700">Pay for carbon offsetting during checkout</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                  <span className="text-blue-700">Earn 10 credits for every ₹100 spent on offsetting</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                  <span className="text-blue-700">Higher contributions for items with lower carbon ratings</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};