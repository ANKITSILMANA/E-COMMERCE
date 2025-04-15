import styles from './CategorySection.module.css';

const categories = [
  { name: 'Fruits & Vegetables', image: '/images/fruits.png' },
  { name: 'Snacks', image: '/images/snacks.png' },
  { name: 'Dairy & Eggs', image: '/images/dairy.png' },
  { name: 'Beverages', image: '/images/beverages.png' },
  { name: 'Bakery', image: '/images/bakery.png' },
];

function CategorySection() {
  return (
    <div className={styles.categoryWrapper}>
      {categories.map((cat, index) => (
        <div className={styles.categoryItem} key={index}>
          <img src={cat.image} alt={cat.name} className={styles.categoryImage} />
          <p className={styles.categoryName}>{cat.name}</p>
        </div>
      ))}
    </div>
  );
}

export default CategorySection;
