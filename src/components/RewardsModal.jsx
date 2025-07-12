import React, { useState } from 'react';
import { X, Gift, Percent, Truck, Star, Leaf, Check, Award } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

export const RewardsModal = ({ isOpen, onClose, onRewardRedeemed }) => {
  const { ecoCoins, carbonCredits, spendEcoCoins, spendCarbonCredits } = useUser();
  const [redeemedRewards, setRedeemedRewards] = useState([]);

  const rewards = [
    {
      id: 'discount-5',
      title: '5% Off Next Purchase',
      description: 'Get 5% discount on your next order',
      cost: 500,
      type: 'discount',
      value: 5,
      icon: Percent,
      color: 'blue'
    },
    {
      id: 'discount-10',
      title: '10% Off Next Purchase',
      description: 'Get 10% discount on your next order',
      cost: 1000,
      type: 'discount',
      value: 10,
      icon: Percent,
      color: 'purple'
    },
    {
      id: 'discount-15',
      title: '15% Off Next Purchase',
      description: 'Get 15% discount on your next order',
      cost: 1500,
      type: 'discount',
      value: 15,
      icon: Percent,
      color: 'indigo'
    },
    {
      id: 'free-shipping',
      title: 'Free Shipping',
      description: 'Free shipping on your next order',
      cost: 300,
      type: 'shipping',
      value: 'free',
      icon: Truck,
      color: 'green'
    },
    {
      id: 'premium-support',
      title: 'Premium Support',
      description: '30 days of priority customer support',
      cost: 800,
      type: 'support',
      value: 'premium',
      icon: Star,
      color: 'yellow'
    },
    {
      id: 'eco-bundle',
      title: 'Eco-Starter Bundle',
      description: 'Free eco-friendly starter kit with bamboo products',
      cost: 2000,
      type: 'product',
      value: 'bundle',
      icon: Gift,
      color: 'emerald'
    },
    {
      id: 'carbon-discount-20',
      title: '20% Off with Carbon Credits',
      description: 'Use carbon credits for 20% discount on eco-friendly products',
      cost: 50,
      type: 'carbon-discount',
      value: 20,
      icon: Award,
      color: 'emerald',
      currency: 'credits'
    },
    {
      id: 'carbon-shipping',
      title: 'Free Carbon-Neutral Shipping',
      description: 'Free shipping with carbon offset included',
      cost: 30,
      type: 'carbon-shipping',
      value: 'free',
      icon: Truck,
      color: 'emerald',
      currency: 'credits'
    },
    {
      id: 'tree-planting',
      title: 'Plant 10 Trees',
      description: 'Fund tree planting in your name',
      cost: 100,
      type: 'environmental',
      value: '10-trees',
      icon: Leaf,
      color: 'emerald',
      currency: 'credits'
    }
  ];

  const handleRedeem = (reward) => {
    const canAfford = reward.currency === 'credits' 
      ? carbonCredits >= reward.cost 
      : ecoCoins >= reward.cost;
      
    if (canAfford && !redeemedRewards.includes(reward.id)) {
      const success = reward.currency === 'credits' 
        ? spendCarbonCredits(reward.cost)
        : spendEcoCoins(reward.cost);
        
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
    return colors[color] || colors.green;
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
    return colors[color] || colors.green;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-green-50 to-emerald-50">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-3 rounded-full">
                <Gift className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-green-800">EcoCoins Rewards</h2>
                <p className="text-green-600 text-sm">Redeem your EcoCoins for exclusive rewards</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-green-100 rounded-full">
              <X className="w-5 h-5 text-green-600" />
            </button>
          </div>

          <div className="p-6">
            {/* Balance */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-center space-x-3">
                  <Leaf className="w-6 h-6 text-green-600" />
                  <div className="text-center">
                    <p className="text-green-700 font-medium">EcoCoins Balance</p>
                    <p className="text-3xl font-bold text-green-600">{ecoCoins.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <div className="flex items-center justify-center space-x-3">
                  <Award className="w-6 h-6 text-emerald-600" />
                  <div className="text-center">
                    <p className="text-emerald-700 font-medium">Carbon Credits</p>
                    <p className="text-3xl font-bold text-emerald-600">{carbonCredits.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Rewards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rewards.map((reward) => {
                const canAfford = reward.currency === 'credits' 
                  ? carbonCredits >= reward.cost 
                  : ecoCoins >= reward.cost;
                const isRedeemed = redeemedRewards.includes(reward.id);
                const IconComponent = reward.icon;
                const currentBalance = reward.currency === 'credits' ? carbonCredits : ecoCoins;
                const currencyIcon = reward.currency === 'credits' ? Award : Leaf;
                const currencyColor = reward.currency === 'credits' ? 'text-emerald-600' : 'text-green-600';

                return (
                  <div
                    key={reward.id}
                    className={`border rounded-lg p-6 transition-all duration-200 ${
                      canAfford && !isRedeemed 
                        ? 'border-green-300 hover:shadow-md' 
                        : 'border-gray-200'
                    } ${isRedeemed ? 'bg-gray-50' : 'bg-white'}`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-full ${getColorClasses(reward.color)}`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      {isRedeemed && (
                        <div className="bg-green-100 text-green-800 p-1 rounded-full">
                          <Check className="w-4 h-4" />
                        </div>
                      )}
                    </div>

                    <h3 className="font-semibold text-gray-900 mb-2">{reward.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{reward.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <currencyIcon className={`w-4 h-4 ${currencyColor}`} />
                        <span className={`font-bold ${currencyColor}`}>
                          {reward.cost.toLocaleString()}
                        </span>
                        <span className={`text-xs ${currencyColor}`}>
                          {reward.currency === 'credits' ? 'Credits' : 'EcoCoins'}
                        </span>
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
                          Need {(reward.cost - currentBalance).toLocaleString()} more {reward.currency === 'credits' ? 'Credits' : 'EcoCoins'}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* How to Earn More */}
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-blue-800 mb-3">How to Earn More Rewards</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-blue-700 mb-2">EcoCoins</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-blue-700">Purchase eco-friendly products</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-blue-700">Choose high carbon-rated items</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <h4 className="font-medium text-blue-700 mb-2">Carbon Credits</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                      <span className="text-blue-700">Pay for carbon offsetting</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                      <span className="text-blue-700">10 credits per ₹100 spent</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};