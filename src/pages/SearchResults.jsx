import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard/ProductCard';
import products from '../data/products'; // make sure you're importing product list

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchResults() {
  const query = useQuery();
  const searchTerm = query.get("q")?.toLowerCase() || "";

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="product-section">
      <h2>Search Results for "{searchTerm}"</h2>
      {filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="product-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResults;
