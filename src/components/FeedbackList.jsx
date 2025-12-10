import PropTypes from 'prop-types';
import FeedbackItem from './FeedbackItem';
import Card from './Card';

/**
 * Container for the list of feedback items, implemented as a scrollable carousel.
 */
function FeedbackList({ feedback, isLoading, error }) {
  if (isLoading) {
    return <Card><p style={{ textAlign: 'center' }}>**Loading Feedback...** ⏳</p></Card>;
  }

  if (error) {
    return <Card><p className="message-error" style={{ textAlign: 'center' }}>**Error:** {error} 🙁</p></Card>;
  }

  if (!feedback || feedback.length === 0) {
    return <p className="message-info">No feedback yet! Be the first to submit a review.</p>;
  }

  return (
    <div className="feedback-carousel">
      {/* The inner container handles the horizontal layout and scrolling */}
      <div className="feedback-carousel-inner">
        {feedback.map((item) => (
          <div key={item.id} className="carousel-item-wrapper">
            <FeedbackItem item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

FeedbackList.propTypes = {
    // ... (existing propTypes)
};

// Add necessary CSS for the carousel directly for clarity
if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    .feedback-carousel {
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      padding-bottom: 1rem; /* Space for scrollbar */
      margin-bottom: 1rem;
      max-height: 400px; /* Limit height for scrollable area */
    }
    .feedback-carousel-inner {
      display: flex;
      gap: 1.5rem;
      padding: 0.5rem;
    }
    .carousel-item-wrapper {
      flex: 0 0 320px; /* Fixed width for each card, defining the carousel item size */
      scroll-snap-align: start;
    }
    /* Hide scrollbar for cleaner design, but keep functionality */
    .feedback-carousel::-webkit-scrollbar {
        display: none;
    }
    .feedback-carousel {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }
  `;
  if (!document.querySelector('style[data-component="feedback-carousel"]')) {
    style.setAttribute('data-component', 'feedback-carousel');
    document.head.appendChild(style);
  }
}


export default FeedbackList;