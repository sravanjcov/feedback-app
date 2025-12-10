import PropTypes from 'prop-types';
import Card from './Card';

/**
 * Displays computed feedback statistics (used in App.jsx split layout).
 */
function FeedbackStats({ stats, feedback }) { 
  const { count, averageRating } = stats;
  
  // Calculate percentage of high rating (for visual feedback)
  const highRatingPercentage = count > 0 ? (feedback.filter(item => item.rating >= 4).length / count) * 100 : 0;

  return (
    <div style={{ padding: '1rem', textAlign: 'center' }}>
      <h2 style={{ fontSize: '2.5rem', margin: '0 0 0.5rem', color: 'var(--color-primary)' }}>
        {isNaN(averageRating) ? 0.0 : averageRating}
      </h2>
      <p style={{ fontSize: '1.2rem', color: 'var(--color-dark)', fontWeight: 600 }}>
        Average Rating ({count} Reviews)
      </p>
      
      {/* Simple visual bar for positive feedback percentage */}
      <div style={{ marginTop: '1rem', padding: '0.5rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem' }}>
        <p style={{ fontSize: '0.9rem', marginBottom: '0.25rem', color: 'var(--color-text)' }}>
            Positive Feedback: **{Math.round(highRatingPercentage)}%**
        </p>
        <div style={{ height: '8px', backgroundColor: 'var(--color-border)', borderRadius: '4px' }}>
            <div 
                style={{ 
                    width: `${Math.round(highRatingPercentage)}%`, 
                    height: '100%', 
                    backgroundColor: 'var(--color-secondary)',
                    transition: 'width 0.5s ease-out'
                }}
            ></div>
        </div>
      </div>
    </div>
  );
}

FeedbackStats.propTypes = {
  stats: PropTypes.shape({
    count: PropTypes.number.isRequired,
    averageRating: PropTypes.number.isRequired,
  }).isRequired,
  feedback: PropTypes.array.isRequired 
};

export default FeedbackStats;