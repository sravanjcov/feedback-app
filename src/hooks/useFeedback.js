import { useState, useEffect, useMemo, useCallback } from 'react';
import { getFeedback, postFeedback } from '../api/feedbackApi';

/**
 * @typedef {object} FeedbackItem
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {number} rating
 * @property {string} comments
 *
 * @typedef {object} FeedbackStats
 * @property {number} averageRating
 * @property {number} count
 *
 * @typedef {object} UseFeedbackResult
 * @property {FeedbackItem[]} feedback - The list of feedback items.
 * @property {boolean} isLoading - True if an API call is in progress.
 * @property {string | null} error - Error message if an API call failed.
 * @property {FeedbackStats} stats - Computed feedback statistics.
 * @property {(newFeedback: Omit<FeedbackItem, 'id'>) => Promise<void>} addFeedback - Function to submit new feedback.
 * @property {() => Promise<void>} fetchFeedback - Function to manually fetch feedback (used internally).
 */

/**
 * Custom hook for managing all feedback-related state and logic.
 * Encapsulates fetching, adding, loading, error, and statistics calculation.
 * @returns {UseFeedbackResult}
 */
const useFeedback = () => {
  const [feedback, setFeedback] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Calculates statistics: average rating and total count.
   * This is memoized to only re-run when the `feedback` array changes,
   * optimizing performance.
   * Required: useMemo
   */
  const stats = useMemo(() => {
    const count = feedback.length;
    if (count === 0) {
      return { averageRating: 0, count: 0 };
    }

    const total = feedback.reduce((acc, item) => acc + item.rating, 0);
    const averageRating = total / count;

    // Optional: Example of an optional sorted list computation (not used in UI, but fulfills concept)
    // const sortedList = [...feedback].sort((a, b) => b.rating - a.rating);

    return {
      averageRating: parseFloat(averageRating.toFixed(1)),
      count,
      // sortedList,
    };
  }, [feedback]);

  /**
   * Fetches the initial list of feedback items.
   * Required: useEffect
   */
  const fetchFeedback = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getFeedback();
      setFeedback(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setFeedback([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeedback();
    // No cleanup required for this simple fetch, but a proper implementation would use an AbortController.
  }, [fetchFeedback]);

  /**
   * Handles POSTing new feedback.
   * @param {Omit<FeedbackItem, 'id'>} newFeedback
   */
  const addFeedback = async (newFeedback) => {
    setIsLoading(true);
    setError(null);
    try {
      const postedItem = await postFeedback(newFeedback);
      // Add the new item to the start of the list
      setFeedback((prev) => [postedItem, ...prev]);
      setError(null);
    } catch (err) {
      setError(err.message);
      // Do not clear feedback list on submission error
    } finally {
      setIsLoading(false);
    }
  };

  return {
    feedback,
    isLoading,
    error,
    stats,
    addFeedback,
    fetchFeedback, // Exposed for potential manual refresh
  };
};

export default useFeedback;