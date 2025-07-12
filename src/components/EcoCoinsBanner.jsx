import React from 'react';
import { Leaf, Award, Gift, ArrowRight } from 'lucide-react';

export const EcoCoinsBanner = ({ onRewardsClick }) => {
  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6 mb-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Leaf className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-green-800">Earn EcoCoins with Every Purchase!</h2>
              <p className="text-green-700">
                Get rewarded for choosing eco-friendly products. The higher the carbon rating, the more EcoCoins you earn!
              </p>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center space-x-8">
            <div className="text-center">
              <Award className="w-6 h-6 text-green-600 mx-auto mb-1" />
              <p className="text-sm text-green-700">Earn Points</p>
            </div>
            <button 
              onClick={onRewardsClick}
              className="text-center hover:bg-green-100 p-3 rounded-lg transition-colors group"
            >
              <Gift className="w-6 h-6 text-green-600 mx-auto mb-1" />
              <div className="flex items-center space-x-1">
                <p className="text-sm text-green-700 group-hover:text-green-800">Redeem Rewards</p>
                <ArrowRight className="w-3 h-3 text-green-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};