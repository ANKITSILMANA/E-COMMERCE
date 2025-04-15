import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  // You can replace this with your backend later
  useEffect(() => {
    fetch('/data/products.json') // adjust if using real API
      .then(res => res.json())
      .then(data => {
        const item = data.find(p => p.id.toString() === id);
        setProduct(item);
      });
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>{product.title}</h2>
      <img src={product.image} alt={product.title} style={{ width: '200px' }} />
      <p>{product.description}</p>
      <p><strong>Price:</strong> ₹{product.price}</p>
    </div>
  );
}

export default ProductDetail;
