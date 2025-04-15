import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard/ProductCard';
import './CategoryPage.css';

// At the top of CategoryPage.jsx
const categoryBanners = {
  'fruits-vegetables': {
    image: 'https://example.com/fruits-banner.jpg',
    title: 'Fresh Fruits & Veggies',
  },
  'dairy-bread-eggs': {
    image: 'https://example.com/dairy-banner.jpg',
    title: 'Dairy, Bread & Eggs',
  },
  'pharmacy': {
    image: 'https://example.com/pharmacy-banner.jpg',
    title: 'Health Essentials',
  },
  // add for other categories
};

const allProducts = [
  // Fruits & Vegetables
  { id: 1, title: 'Fresh Bananas', category: 'fruits-vegetables', price: 30, image: 'https://www.bigbasket.com/media/uploads/p/m/10000148_15-fresho-banana-robusta.jpg' },
  { id: 2, title: 'Tomatoes', category: 'fruits-vegetables', price: 18, image: 'https://www.bigbasket.com/media/uploads/p/m/10000200_19-fresho-tomato-hybrid.jpg' },
  { id: 3, title: 'Onions', category: 'fruits-vegetables', price: 22, image: 'https://www.bigbasket.com/media/uploads/p/m/10000159_15-fresho-onion.jpg' },
  { id: 4, title: 'Potatoes', category: 'fruits-vegetables', price: 20, image: 'https://www.bigbasket.com/media/uploads/p/m/10000142_15-fresho-potato.jpg' },
  { id: 5, title: 'Green Chillies', category: 'fruits-vegetables', price: 15, image: 'https://www.bigbasket.com/media/uploads/p/m/10000203_14-fresho-green-chilli.jpg' },
  { id: 6, title: 'Apples', category: 'fruits-vegetables', price: 120, image: 'https://www.bigbasket.com/media/uploads/p/m/10000067_16-fresho-apple.jpg' },

  // Dairy, Bread & Eggs
  { id: 7, title: 'Amul Milk', category: 'dairy-bread-eggs', price: 25, image: 'https://www.bigbasket.com/media/uploads/p/m/241604_4-amul-taaza-homogenised-toned-milk.jpg' },
  { id: 8, title: 'Paneer', category: 'dairy-bread-eggs', price: 75, image: 'https://www.bigbasket.com/media/uploads/p/m/1203455_2-amul-paneer.jpg' },
  { id: 9, title: 'Brown Bread', category: 'dairy-bread-eggs', price: 40, image: 'https://www.bigbasket.com/media/uploads/p/m/40115310_3-fresho-signature-bread-brown.jpg' },
  { id: 10, title: 'White Eggs (6 pcs)', category: 'dairy-bread-eggs', price: 38, image: 'https://www.bigbasket.com/media/uploads/p/m/20000964_7-fresho-eggs-white-medium-antibiotic-residue-free.jpg' },
  { id: 11, title: 'Butter', category: 'dairy-bread-eggs', price: 50, image: 'https://www.bigbasket.com/media/uploads/p/m/40099810_3-amul-butter.jpg' },
  { id: 12, title: 'Curd', category: 'dairy-bread-eggs', price: 30, image: 'https://www.bigbasket.com/media/uploads/p/m/1203436_2-nandini-curd.jpg' },

  // Pharmacy
  { id: 13, title: 'Pain Relief Spray', category: 'pharmacy', price: 120, image: 'https://www.bigbasket.com/media/uploads/p/m/100.png' },
  { id: 14, title: 'Cough Syrup', category: 'pharmacy', price: 90, image: 'https://www.bigbasket.com/media/uploads/p/m/101.png' },
  { id: 15, title: 'Paracetamol Tablets', category: 'pharmacy', price: 35, image: 'https://www.bigbasket.com/media/uploads/p/m/102.png' },
  { id: 16, title: 'Bandages Pack', category: 'pharmacy', price: 50, image: 'https://www.bigbasket.com/media/uploads/p/m/103.png' },
  { id: 17, title: 'Thermometer', category: 'pharmacy', price: 150, image: 'https://www.bigbasket.com/media/uploads/p/m/104.png' },
  { id: 18, title: 'Hand Sanitizer', category: 'pharmacy', price: 60, image: 'https://www.bigbasket.com/media/uploads/p/m/105.png' },

  // Pet Care
  { id: 19, title: 'Pet Food - Drools', category: 'pet-care', price: 300, image: 'https://www.bigbasket.com/media/uploads/p/m/101.png' },
  { id: 20, title: 'Dog Treats', category: 'pet-care', price: 150, image: 'https://www.bigbasket.com/media/uploads/p/m/106.png' },
  { id: 21, title: 'Cat Litter', category: 'pet-care', price: 200, image: 'https://www.bigbasket.com/media/uploads/p/m/107.png' },
  { id: 22, title: 'Pet Shampoo', category: 'pet-care', price: 180, image: 'https://www.bigbasket.com/media/uploads/p/m/108.png' },
  { id: 23, title: 'Pet Toys', category: 'pet-care', price: 120, image: 'https://www.bigbasket.com/media/uploads/p/m/109.png' },
  { id: 24, title: 'Dog Collar', category: 'pet-care', price: 90, image: 'https://www.bigbasket.com/media/uploads/p/m/110.png' },

  // Baby Care
  { id: 25, title: 'Baby Diapers', category: 'baby-care', price: 250, image: 'https://www.bigbasket.com/media/uploads/p/m/102.png' },
  { id: 26, title: 'Baby Lotion', category: 'baby-care', price: 180, image: 'https://www.bigbasket.com/media/uploads/p/m/111.png' },
  { id: 27, title: 'Baby Powder', category: 'baby-care', price: 120, image: 'https://www.bigbasket.com/media/uploads/p/m/112.png' },
  { id: 28, title: 'Baby Shampoo', category: 'baby-care', price: 150, image: 'https://www.bigbasket.com/media/uploads/p/m/113.png' },
  { id: 29, title: 'Wet Wipes', category: 'baby-care', price: 60, image: 'https://www.bigbasket.com/media/uploads/p/m/114.png' },
  { id: 30, title: 'Baby Soap', category: 'baby-care', price: 40, image: 'https://www.bigbasket.com/media/uploads/p/m/115.png' },
];

function formatCategoryName(slug) {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
}

function CategoryPage() {
  const { categoryName } = useParams();
  const banner = categoryBanners[categoryName];
  const filteredProducts = allProducts.filter(
    (product) => product.category === categoryName
  );

  return (
    <div className="category-page">
      <h2 className="category-heading">{formatCategoryName(categoryName)}</h2>
      {banner && (
        <div className="category-banner">
          <img src={banner.image} alt={banner.title} />
          <h2>{banner.title}</h2>
        </div>
      )}
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products found for this category.</p>
        )}
      </div>
    </div>
  );
}

export default CategoryPage;
