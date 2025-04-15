import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // 👈 import auth hook
import LogoutButton from './LogoutButton';         // 👈 import logout

function Navbar() {
  const { user, loading } = useAuth();

  return (
    <nav style={styles.navbar}>
      <div style={styles.left}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/cart" style={styles.link}>Cart</Link>
      </div>

      <div style={styles.right}>
        {!loading && !user && (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
        {!loading && user && <LogoutButton />}
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    background: '#f0f0f0',
    borderBottom: '1px solid #ccc',
  },
  left: {
    display: 'flex',
    gap: '1rem',
  },
  right: {
    display: 'flex',
    gap: '1rem',
  },
  link: {
    textDecoration: 'none',
    color: '#333',
    fontWeight: 'bold',
  }
};

export default Navbar;
