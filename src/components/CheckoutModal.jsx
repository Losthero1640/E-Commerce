import React, { useState } from "react";
import "../styles/CheckoutModal.css";
import { useCart } from "../contexts/CartContext";
import { useUser } from "../contexts/UserContext";
import { IoMdClose } from "react-icons/io";
import { PiSealCheckFill } from "react-icons/pi";

const CheckoutModal = ({ onClose }) => {
  const { cartItems, clearCart } = useCart();
  const { user } = useUser();

  const [shippingInfo, setShippingInfo] = useState({
    name: user?.name || "",
    email: user?.email || "",
    address: "",
    city: "",
    zip: "",
    country: "",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [step, setStep] = useState(1);
  const [carbonOffsetTip, setCarbonOffsetTip] = useState(0);
  const [earnedCarbonCredits, setEarnedCarbonCredits] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const totalEcoCoins = cartItems.reduce(
    (total, item) => total + (item.product?.ecoCoins || 0),
    0
  );

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleTipSelection = (amount) => {
    setCarbonOffsetTip(amount);
  };

  const handleCheckout = () => {
    // Simulate checkout
    setIsComplete(true);
    clearCart();
    setEarnedCarbonCredits(totalEcoCoins);

    setTimeout(() => {
      setIsComplete(false);
      setCarbonOffsetTip(0);
      setEarnedCarbonCredits(0);
      onClose();
    }, 3000);
  };

  const handleClose = () => {
    setShippingInfo({
      name: user?.name || "",
      email: user?.email || "",
      address: "",
      city: "",
      zip: "",
      country: "",
    });
    setPaymentInfo({
      cardNumber: "",
      expiry: "",
      cvv: "",
    });
    setStep(1);
    setCarbonOffsetTip(0);
    setEarnedCarbonCredits(0);
    setIsComplete(false);
    onClose();
  };

  return (
    <div className="checkout-modal-overlay">
      <div className="checkout-modal">
        <button className="close-button" onClick={handleClose} aria-label="Close checkout modal">
          <IoMdClose size={24} />
        </button>

        {isComplete ? (
          <div className="checkout-complete">
            <PiSealCheckFill size={48} color="green" />
            <h2>Thank you for your contribution!</h2>
            <p>You’ve earned <strong>{earnedCarbonCredits}</strong> EcoCoins 🌱</p>
            <p>Your items are on their way. You just made the planet happier!</p>
          </div>
        ) : (
          <>
            <h2>Checkout</h2>

            {step === 1 && (
              <div className="checkout-step">
                <h3>Shipping Information</h3>
                <input type="text" name="name" value={shippingInfo.name} onChange={handleShippingChange} placeholder="Full Name" autoFocus />
                <input type="email" name="email" value={shippingInfo.email} onChange={handleShippingChange} placeholder="Email" />
                <input type="text" name="address" value={shippingInfo.address} onChange={handleShippingChange} placeholder="Address" />
                <input type="text" name="city" value={shippingInfo.city} onChange={handleShippingChange} placeholder="City" />
                <input type="text" name="zip" value={shippingInfo.zip} onChange={handleShippingChange} placeholder="ZIP Code" inputMode="numeric" />
                <input type="text" name="country" value={shippingInfo.country} onChange={handleShippingChange} placeholder="Country" />
                <button onClick={() => setStep(2)}>Continue to Payment</button>
              </div>
            )}

            {step === 2 && (
              <div className="checkout-step">
                <h3>Payment Details</h3>
                <input type="text" name="cardNumber" value={paymentInfo.cardNumber} onChange={handlePaymentChange} placeholder="Card Number" inputMode="numeric" />
                <input type="text" name="expiry" value={paymentInfo.expiry} onChange={handlePaymentChange} placeholder="MM/YY" inputMode="numeric" />
                <input type="text" name="cvv" value={paymentInfo.cvv} onChange={handlePaymentChange} placeholder="CVV" inputMode="numeric" />
                <button onClick={() => setStep(3)}>Continue to Review</button>
              </div>
            )}

            {step === 3 && (
              <div className="checkout-step">
                <h3>Review & Confirm</h3>

                <div className="review-section">
                  <h4>Items:</h4>
                  {cartItems.map((item, index) => (
                    <div key={item.id || `${item.product?.name}-${index}`} className="review-item">
                      <span>{item.product?.name}</span>
                      <span>{item.product?.ecoCoins} EcoCoins</span>
                    </div>
                  ))}
                </div>

                <div className="review-section">
                  <h4>Carbon Offset (Optional):</h4>
                  <div className="carbon-offset-buttons">
                    {[5, 10, 15].map((amount) => (
                      <button
                        key={amount}
                        className={carbonOffsetTip === amount ? "selected" : ""}
                        onClick={() => handleTipSelection(amount)}
                      >
                        ₹{amount}
                      </button>
                    ))}
                    <input
                      type="number"
                      min="0"
                      placeholder="Custom"
                      value={carbonOffsetTip || ""}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value) || 0;
                        setCarbonOffsetTip(value);
                      }}
                    />
                  </div>
                </div>

                <button className="confirm-button" onClick={handleCheckout}>
                  Confirm & Place Order
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;
