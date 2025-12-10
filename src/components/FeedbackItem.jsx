import PropTypes from 'prop-types';
import Card from './Card';

// RATING MAP (Needed to translate number to emoji/label/color)
const RATING_MAP = {
  1: { label: 'Terrible', emoji: '😠', color: '#ef4444' },
  2: { label: 'Bad', emoji: '🙁', color: '#f59e0b' },
  3: { label: 'Neutral', emoji: '😐', color: '#3b82f6' },
  4: { label: 'Good', emoji: '😊', color: '#10b981' },
  5: { label: 'Excellent', emoji: '😍', color: '#8b5cf6' },
};

/**
 * Individual Feedback Item card.
 */
function FeedbackItem({ item }) {
  // Get the specific rating data (safe fallback to rating 3)
  const ratingData = RATING_MAP[item.rating] || RATING_MAP[3]; 

  return (
    // Assuming Card provides a base style and padding
    <Card className="feedback-item">
      
      {/* ❌ REMOVED: The absolutely positioned rating-badge div */}

      {/* ⭐️ NEW: Rating Display Inside the Card (Emoji + Label) */}
      <div 
        className="rating-display-inline"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.5rem 0',
          marginBottom: '0.75rem',
          borderBottom: '1px solid var(--color-border)',
          color: ratingData.color, // Apply dynamic color
        }}
      >
        <span style={{ fontSize: '1.5rem' }}>{ratingData.emoji}</span>
        <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>
          {item.rating} - {ratingData.label}
        </span>
      </div>

      {/* Item Content (No top margin needed as the rating is now inline) */}
      <p style={{ marginTop: '0', fontSize: '1.1rem' }}>
        "{item.comments}"
      </p>

      {/* User Info */}
      <div style={{ 
          marginTop: '1rem', 
          paddingTop: '0.5rem', 
          borderTop: '1px dashed var(--color-border)', 
          fontSize: '0.9rem',
          color: 'var(--color-dark)'
      }}>
        **{item.name || 'Anonymous'}** {item.email && <span style={{ marginLeft: '1rem', opacity: 0.7 }}>({item.email})</span>}
      </div>
    </Card>
  );
}

FeedbackItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    email: PropTypes.string,
    rating: PropTypes.number.isRequired,
    comments: PropTypes.string.isRequired,
  }).isRequired,
};

// ❌ REMOVED: The unnecessary inline style block for position: relative, 
// as absolute positioning is no longer used.

export default FeedbackItem;