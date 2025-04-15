// src/components/ProductCard/ProductCard.jsx
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import styles from './ProductCard.module.css';

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className={styles.card}>
      <img src={product.image} alt={product.title} className={styles.image} />
      <h4 className={styles.title}>{product.title}</h4>
      <p className={styles.price}>₹{product.price}</p>
      <button className={styles.button} onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
