import './Home.css';
import ProductCard from '../components/ProductCard/ProductCard';
import { Link } from 'react-router-dom';


const promoTiles = [
  {
    title: "Pharmacy at your doorstep!",
    desc: "Cough syrups, pain relief sprays & more",
    btnText: "Order Now",
    bg: "#00C2C2",
    route: "/category/pharmacy"
  },
  {
    title: "Pet Care supplies in minutes",
    desc: "Food, treats, toys & more",
    btnText: "Order Now",
    bg: "#FFD400",
    route: "/category/pet-care"
  },
  {
    title: "No time for a diaper run?",
    desc: "Get baby care essentials in minutes",
    btnText: "Order Now",
    bg: "#C9D6F2",
    route: "/category/baby-care"
  }
];


const categories = [
  { name: "Paan Corner", slug: "paan-corner", image: "paan.png" },
  { name: "Dairy, Bread & Eggs", slug: "dairy-bread-eggs", image: "dairy.png" },
  { name: "Fruits & Vegetables", slug: "fruits-vegetables", image: "fruits.png" },
  { name: "Cold Drinks & Juices", slug: "cold-drinks-juices", image: "drinks.png" },
  // Add more
];

const products = [
  {
    id: 1,
    title: 'Fresh Bananas',
    price: 30,
    image: 'https://www.bigbasket.com/media/uploads/p/m/10000148_15-fresho-banana-robusta.jpg',
  },
  {
    id: 2,
    title: 'Amul Milk',
    price: 25,
    image: 'https://www.bigbasket.com/media/uploads/p/m/241604_4-amul-taaza-homogenised-toned-milk.jpg',
  },
  {
    id: 3,
    title: 'Tomatoes',
    price: 18,
    image: 'https://www.bigbasket.com/media/uploads/p/m/10000200_19-fresho-tomato-hybrid.jpg',
  },
  // add more if needed
];

function Home() {
  return (
    <div className="home-container">

      {/* Banner Section */}
      <div className="home-banner">
        <h1>Paan Corner</h1>
        <p>Your favourite paan shop is now online</p>
        <button>Shop Now</button>
      </div>

      {/* Promo Tiles Section */}
      <div className="promo-section">
        {promoTiles.map((tile, i) => (
          <div key={i} className="promo-tile" style={{ backgroundColor: tile.bg }}>
            <h3>{tile.title}</h3>
            <p>{tile.desc}</p>
            <Link to={tile.route}>
              <button>{tile.btnText}</button>
            </Link>
          </div>
        ))}
      </div>

      {/* Category Section */}
      <div className="category-section">
        {categories.map((cat, i) => (
          <Link to={`/category/${encodeURIComponent(cat.slug)}`} key={i} className="category-card">
            <img src={cat.image} alt={cat.name} className="category-image" />
            <p>{cat.name}</p>
          </Link>
        ))}
      </div>

      {/* Product Grid */}
      <div className="product-section">
        <h2>Products For You</h2>
        <div className="product-grid">
          {products.map(product => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>

    </div>
  );
}

export default Home;
