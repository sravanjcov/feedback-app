import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import { motion, AnimatePresence } from 'framer-motion';

const initialFormState = {
  name: '',
  email: '',
  rating: 0,
  comments: '',
};

const RATING_MAP = {
  1: { label: 'Terrible', emoji: '😠', color: '#ef4444' }, // Red
  2: { label: 'Bad', emoji: '🙁', color: '#f59e0b' },     // Amber
  3: { label: 'Neutral', emoji: '😐', color: '#3b82f6' },  // Blue
  4: { label: 'Good', emoji: '😊', color: '#10b981' },    // Emerald
  5: { label: 'Excellent', emoji: '😍', color: '#8b5cf6' },// Violet
};

function FeedbackForm({ handleAdd, isLoading }) {
  // --- STATE ---
  const [formData, setFormData] = useState(initialFormState);
  const [message, setMessage] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const { name, email, rating, comments } = formData;

  // --- HANDLERS ---
  const handleRatingChange = (num) => {
    setFormData((prev) => ({ ...prev, rating: num }));
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => { // ⬅️ THIS IS THE MISSING FUNCTION
    e.preventDefault();

    if (comments.trim().length >= 10 && rating > 0) {
      const newFeedback = { name, email, rating, comments };
      
      try {
        await handleAdd(newFeedback);
        
        // Success: Reset form and show success message
        setFormData(initialFormState);
        setFeedbackSubmitted(true);
        setTimeout(() => setFeedbackSubmitted(false), 3000); // Clear message after 3s

      } catch (err) {
        // Error handling is managed by useFeedback
        setFeedbackSubmitted(false);
      }
    } else {
      setMessage('Please select a rating (1-5) and provide a comment of at least 10 characters.');
    }
  };

  // --- EFFECTS / VALIDATION ---
  useEffect(() => {
    // Client-side validation for comments
    if (comments.trim().length > 0 && comments.trim().length < 10) {
      setMessage('Comment must be at least 10 characters long.');
    } else {
      setMessage('');
    }
  }, [comments]);

  const isFormInvalid = comments.trim().length < 10 || rating === 0 || isLoading;

  // --- JSX RENDER ---
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h3 style={{ marginBottom: '1.5rem', textAlign: 'center', color: 'var(--color-primary)' }}>
          How would you rate your experience?
        </h3>

        {/* --- New Bar/Emoji Rating Selector --- */}
        <div className="rating-bar-selector">
          {[1, 2, 3, 4, 5].map((num) => (
            <motion.div
              key={num}
              className={`rating-option ${rating === num ? 'selected' : ''}`}
              style={{ backgroundColor: RATING_MAP[num].color }}
              onClick={() => !isLoading && handleRatingChange(num)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="emoji">{RATING_MAP[num].emoji}</span>
              <span className="label">
                {num} - {RATING_MAP[num].label}
              </span>
            </motion.div>
          ))}
        </div>
        {/* --- End New Rating Selector --- */}

        {/* Comments Textarea */}
        <div className="form-control">
          <label htmlFor="comments">Comments</label>
          <textarea
            id="comments"
            name="comments"
            placeholder="Tell us about your experience..."
            value={comments}
            onChange={handleInputChange}
            disabled={isLoading}
          ></textarea>
        </div>

        {/* Name and Email */}
        <div className="form-control" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-control" style={{ margin: 0 }}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name (Optional)"
              value={name}
              onChange={handleInputChange}
              disabled={isLoading}
            />
          </div>
          <div className="form-control" style={{ margin: 0 }}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your Email (Optional)"
              value={email}
              onChange={handleInputChange}
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Submit Button and Messages */}
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button type="submit" className="btn btn-primary" disabled={isFormInvalid}>
            {isLoading ? 'Submitting...' : 'Send Feedback'}
          </button>
        </div>

        <AnimatePresence>
          {message && !feedbackSubmitted && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="message-error" style={{ textAlign: 'center' }}>
              {message}
            </motion.div>
          )}

          {feedbackSubmitted && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="message-success" style={{ textAlign: 'center' }}>
              Feedback submitted successfully! Thank you.
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </Card>
  );
}

// --- PROPTYPES & STYLES (As provided in previous complete file) ---

FeedbackForm.propTypes = {
  handleAdd: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

// Add CSS for the new rating selector (KEEP THIS BLOCK)
if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    .rating-bar-selector {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
      padding: 0.5rem;
      border-radius: var(--border-radius);
      background-color: var(--color-light);
    }
    .rating-option {
      flex-grow: 1;
      text-align: center;
      padding: 0.75rem 0.5rem;
      border-radius: 0.5rem;
      color: var(--color-white);
      cursor: pointer;
      opacity: 0.6;
      transition: all 0.2s ease;
      font-weight: 500;
      line-height: 1.2;
    }
    .rating-option:hover {
      opacity: 0.8;
    }
    .rating-option.selected {
      opacity: 1;
      transform: scale(1.02);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    .rating-option .emoji {
      display: block;
      font-size: 1.5rem;
    }
    .rating-option .label {
      font-size: 0.75rem;
    }
  `;
  if (!document.querySelector('style[data-component="rating-bar"]')) {
    style.setAttribute('data-component', 'rating-bar');
    document.head.appendChild(style);
  }
}

export default FeedbackForm;