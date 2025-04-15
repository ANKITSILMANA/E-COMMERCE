import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Cart.css';

// Coupon schema: percent, max discount, expiry date (ISO), single use
const VALID_COUPONS = {
  SAVE10: { percent: 10, maxDiscount: 100, expiry: '2025-12-31', singleUse: true },
  SAVE20: { percent: 20, maxDiscount: 200, expiry: '2025-06-01', singleUse: true },
  SAVE30: { percent: 30, maxDiscount: 300, expiry: '2025-05-01', singleUse: true },
  FIRSTBUY: { percent: 10, maxDiscount: 15, expiry: '2025-05-01', singleUse: true },
  DHARMIK10: { percent: 10, maxDiscount: 150, expiry: '2025-10-01', singleUse: false }
};

function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupons, setAppliedCoupons] = useState([]);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const calculateDiscount = () => {
    let totalDiscount = 0;

    appliedCoupons.forEach(code => {
      const data = VALID_COUPONS[code];
      if (!data) return;

      const rawDiscount = (subtotal * data.percent) / 100;
      totalDiscount += Math.min(rawDiscount, data.maxDiscount);
    });

    return totalDiscount;
  };

  const discountAmount = calculateDiscount();
  const total = subtotal - discountAmount;

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('appliedCoupons'));
    if (stored) setAppliedCoupons(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem('appliedCoupons', JSON.stringify(appliedCoupons));
  }, [appliedCoupons]);

  const isCouponExpired = (expiry) => {
    const today = new Date();
    return new Date(expiry) < today;
  };

  const handleApplyCoupon = () => {
    const code = couponCode.toUpperCase();
    const data = VALID_COUPONS[code];

    if (!data) {
      toast.error('Invalid coupon code!');
      return setCouponCode('');
    }

    if (isCouponExpired(data.expiry)) {
      toast.warning('This coupon has expired.');
      return setCouponCode('');
    }

    if (data.singleUse && appliedCoupons.includes(code)) {
      toast.info('Coupon already used!');
      return setCouponCode('');
    }

    if (!appliedCoupons.includes(code)) {
      setAppliedCoupons([...appliedCoupons, code]);
      toast.success(`${code} applied successfully!`);
    }

    setCouponCode('');
  };

  const handleRemoveCoupon = (code) => {
    const updated = appliedCoupons.filter(c => c !== code);
    setAppliedCoupons(updated);
    toast.info(`${code} removed`);
  };

  const handleCheckout = () => {
    if (!user) {
      toast.info('Please login to proceed to checkout');
      navigate('/login');
    } else {
      toast.success('Proceeding to checkout...');
      // Future checkout logic
    }
  };

  const suggestedCoupons = Object.entries(VALID_COUPONS)
    .filter(([code, data]) => !appliedCoupons.includes(code) && !isCouponExpired(data.expiry))
    .map(([code, data]) => code);

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <span role="img" aria-label="cart">🛒</span>
        <p>Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cartItems.map(item => (
        <div key={item.id} className="cart-item">
          <img src={item.image} alt={item.title} className="cart-image" />
          <div className="cart-details">
            <h4>{item.title}</h4>
            <p>
              Quantity:
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity === 1}
                className="qty-btn"
              >-</button>
              <span className="qty-value">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="qty-btn"
              >+</button>
            </p>
            <p>Total: ₹{item.price * item.quantity}</p>
            <button className="remove-button" onClick={() => {
              removeFromCart(item.id);
              toast.info('Item removed');
            }}>
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="coupon-section">
        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Enter coupon code"
        />
        <button onClick={handleApplyCoupon}>Apply</button>
      </div>

      {suggestedCoupons.length > 0 && appliedCoupons.length === 0 && (
        <div className="coupon-suggestions">
          <p>Try these coupons:</p>
          {suggestedCoupons.map(code => (
            <button key={code} onClick={() => {
              setCouponCode(code);
              handleApplyCoupon();
            }}>{code}</button>
          ))}
        </div>
      )}

      <div className="applied-coupons">
        {appliedCoupons.map(code => (
          <span key={code} className="applied-badge">
            {code}
            <button onClick={() => handleRemoveCoupon(code)}>✕</button>
          </span>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Subtotal: ₹{subtotal.toFixed(2)}</h3>
        <h4>Discount: ₹{discountAmount.toFixed(2)}</h4>
        <h2>Total: ₹{total.toFixed(2)}</h2>
        <button className="checkout-button" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
