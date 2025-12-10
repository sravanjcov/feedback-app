/**
 * Real API integration using standard fetch, communicating with 
 * the JSON Server backend running on http://localhost:3000.
 * Data is now persistent in db.json.
 */

const BASE_URL = 'http://localhost:3000/feedback';

/**
 * Fetches all feedback items.
 * Performs a GET request to the JSON Server endpoint.
 * @returns {Promise<Object[]>} - An array of feedback objects.
 */
export const getFeedback = async () => {
  try {
    const response = await fetch(BASE_URL);
    
    // Check for HTTP errors (e.g., 404, 500)
    if (!response.ok) {
      throw new Error(`Failed to fetch feedback. Server responded with status: ${response.status}`);
    }
    
    // JSON Server returns the array of items directly
    return await response.json();
  } catch (err) {
    console.error('API Error (GET):', err);
    // Throw a new error to be caught by the useFeedback hook
    throw new Error(err.message || 'Could not connect to the feedback server.');
  }
};

/**
 * Posts a new feedback item.
 * Performs a POST request to the JSON Server endpoint.
 * @param {Object} newFeedback - The new feedback item (without ID).
 * @returns {Promise<Object>} - The posted item, including the server-generated ID.
 */
export const postFeedback = async (newFeedback) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        // Essential header for sending JSON data to the server
        'Content-Type': 'application/json',
      },
      // Convert the JS object to a JSON string for the request body
      body: JSON.stringify(newFeedback), 
    });
    
    // Check for HTTP errors (e.g., 400, 500)
    if (!response.ok) {
        throw new Error(`Failed to submit feedback. Server responded with status: ${response.status}`);
    }

    // JSON Server returns the newly created item with the ID
    return await response.json();
  } catch (err) {
    console.error('API Error (POST):', err);
    throw new Error(err.message || 'Failed to submit feedback to the server.');
  }
};