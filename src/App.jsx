import Header from './components/Header';
import FeedbackForm from './components/FeedbackForm';
import FeedbackStats from './components/FeedbackStats';
import FeedbackList from './components/FeedbackList';
import useFeedback from './hooks/useFeedback';

function App() {
  const { feedback, isLoading, error, stats, addFeedback } = useFeedback();

  return (
    <>
      <Header />
      <div className="container">
        {/* The main-app-grid class handles the 1fr 2fr split in index.css */}
        <div className="main-app-grid"> 
          {/* RIGHT SECTION (FORM) */}
          <section className="form-section">
            <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '2rem' }}>
              💌 Share Your Experience
            </h2>
            <FeedbackForm handleAdd={addFeedback} isLoading={isLoading} />
          </section>
          {/* LEFT SECTION (STATS & LIST) */}
          <section className="stats-and-list-section">
            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.75rem' }}>🌟 Review Snapshot</h2>
            
            {!isLoading && !error && <FeedbackStats stats={stats} feedback={feedback} />}
            
            <h3 style={{ margin: '2rem 0 1rem', fontSize: '1.5rem' }}>Recent Reviews</h3>
            <FeedbackList feedback={feedback} isLoading={isLoading} error={error} />
          </section>
        </div>
      </div>
      {/* Ensure NO <style> block remains here */}
    </>
  );
}

export default App;