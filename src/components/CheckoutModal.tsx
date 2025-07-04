import React, { useState } from 'react';
import { X, CreditCard, Truck, Shield, Leaf, CheckCircle } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useUser } from '../contexts/UserContext';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { items, total, clearCart } = useCart();
  const { addEcoCoins } = useUser();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [earnedEcoCoins, setEarnedEcoCoins] = useState(0); // Store the earned amount
  const [formData, setFormData] = useState({
    email: 'demo@ecomart.com',
    fullName: 'Demo User',
    address: '123 Eco Street',
    city: 'Green City',
    zipCode: '12345',
    cardNumber: '4532 1234 5678 9012',
    expiryDate: '12/25',
    cvv: '123'
  });

  const totalEcoCoinsEarned = items.reduce((sum, item) => 
    sum + (item.product ? Math.floor(item.product.price * item.product.carbon_rating * item.quantity) : 0), 0
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Store the earned EcoCoins amount BEFORE clearing the cart
    const coinsToEarn = totalEcoCoinsEarned;
    setEarnedEcoCoins(coinsToEarn);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Add EcoCoins to user account
    addEcoCoins(coinsToEarn);
    
    // Clear cart and show success
    clearCart();
    setIsProcessing(false);
    setIsComplete(true);

    // Auto close after 4 seconds
    setTimeout(() => {
      setIsComplete(false);
      setEarnedEcoCoins(0); // Reset for next time
      onClose();
    }, 4000);
  };

  const handleClose = () => {
    setIsComplete(false);
    setEarnedEcoCoins(0);
    onClose();
  };

  if (!isOpen) return null;

  if (isComplete) {
    return (
      <div className="fixed inset-0 z-50 overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full text-center animate-slide-in-right">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Complete!</h2>
            <p className="text-gray-600 mb-4">Thank you for your eco-friendly purchase!</p>
            
            <div className="bg-green-50 p-4 rounded-lg mb-4 border border-green-200">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Leaf className="w-5 h-5 text-green-600" />
                <span className="text-green-700 font-medium">EcoCoins Earned!</span>
              </div>
              <span className="text-3xl font-bold text-green-600">+{earnedEcoCoins}</span>
              <p className="text-sm text-green-600 mt-1">Added to your account</p>
            </div>
            
            <p className="text-sm text-gray-500 mb-4">
              Your order will be shipped within 2-3 business days.
            </p>

            <button
              onClick={handleClose}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold">Checkout</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Order Summary */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Order Summary</h3>
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.product?.name} x{item.quantity}</span>
                    <span>${((item.product?.price || 0) * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              {/* EcoCoins Reward */}
              <div className="mt-4 bg-green-50 p-3 rounded-lg border border-green-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Leaf className="w-4 h-4 text-green-600" />
                    <span className="text-green-700 font-medium">You'll earn:</span>
                  </div>
                  <span className="text-green-600 font-bold text-lg">+{totalEcoCoinsEarned} EcoCoins</span>
                </div>
                <p className="text-xs text-green-600 mt-1">
                  Based on carbon rating × price for each item
                </p>
              </div>
            </div>

            {/* Shipping Information */}
            <div>
              <h3 className="font-semibold mb-3">Shipping Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Address"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent md:col-span-2"
                  required
                />
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="City"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  placeholder="ZIP Code"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Payment Information */}
            <div>
              <h3 className="font-semibold mb-3">Payment Information</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="Card Number"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    placeholder="CVV"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Security Features */}
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Shield className="w-4 h-4" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center space-x-1">
                <Truck className="w-4 h-4" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center space-x-1">
                <CreditCard className="w-4 h-4" />
                <span>Protected</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5" />
                  <span>Complete Order - ${total.toFixed(2)}</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};