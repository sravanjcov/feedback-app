import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * Modern Card Component for a clean, consistent UI.
 * Features subtle entry animation.
 */
function Card({ children, reverse = false, className = '' }) {
  const cardStyle = {
    backgroundColor: reverse ? 'var(--color-dark)' : 'var(--color-white)',
    color: reverse ? 'var(--color-white)' : 'var(--color-text)',
  };

  return (
    <motion.div
      className={`card ${className}`}
      style={cardStyle}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  reverse: PropTypes.bool,
  className: PropTypes.string,
};

// Add general card styling here as an example of component-scoped styles
// In a real project, this would be in index.css or a dedicated CSS module.
// Adding it here for completeness of the component file.
if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    .card {
      padding: 1.5rem;
      border-radius: var(--border-radius);
      box-shadow: var(--shadow-lg);
      transition: box-shadow var(--transition-speed);
      margin-bottom: 1.5rem;
    }
    .card:hover {
        box-shadow: 0 15px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }
  `;
  if (!document.querySelector('style[data-component="card"]')) {
    style.setAttribute('data-component', 'card');
    document.head.appendChild(style);
  }
}

export default Card;