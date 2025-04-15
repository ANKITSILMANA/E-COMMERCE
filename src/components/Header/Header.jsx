import { useContext, useEffect, useMemo, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import styles from './Header.module.css';

function Header() {
  const { cartItems } = useContext(CartContext);
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const placeholderOptions = useMemo(() => [
    'Search "paneer"',
    'Search "milk"',
    'Search "banana"',
    'Search "bread"',
    'Search "amul"',
  ], []);  

  // Typing animation effect
  useEffect(() => {
    if (isFocused) return;
  
    const currentText = placeholderOptions[textIndex];
    const typingSpeed = isDeleting ? 50 : 100;
  
    const timer = setTimeout(() => {
      if (isDeleting) {
        setPlaceholder((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else {
        setPlaceholder(currentText.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }
  
      if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => setIsDeleting(true), 1000);
      }
  
      if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % placeholderOptions.length);
      }
    }, typingSpeed);
  
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, textIndex, isFocused, placeholderOptions]);  

  // Handle search submit (Enter)
  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchValue.trim() !== '') {
      navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoYellow}>DE</span>
          <span className={styles.logoGreen}>MO</span>
        </Link>
        <div className={styles.delivery}>
          <h4>Delivery in 14 minutes</h4>
          <p>935H+C4P, Rajeshwar Nagar</p>
        </div>
      </div>

      <input
        type="text"
        className={styles.search}
        placeholder={!searchValue ? placeholder : ''}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleSearch}
      />

      <div className={styles.rightSection}>
        <Link to="/login" className={styles.login}>Login</Link>
        <Link to="/cart" className={styles.cart}>
          <ShoppingCart size={20} />
          <span className={styles.cartText}>My Cart</span>
          {itemCount > 0 && <span className={styles.cartCount}>{itemCount}</span>}
        </Link>
      </div>
    </header>
  );
}

export default Header;
