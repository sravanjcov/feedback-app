# 🚀 Feedback App - Customer Review System

A modern, responsive web application for collecting and displaying customer feedback. Built with **React** and **Vite**, using a **JSON Server** to simulate a persistent backend API during development.

---

## ✨ Features

* **Persistent Data:** Feedback is saved to `db.json` via the JSON Server and persists across application restarts.
* **Split Layout:** Responsive design that displays statistics and reviews in a clean carousel on one side, and the submission form on the other (using CSS Grid).
* **Dynamic Stats:** Calculates and displays the **average rating** and **positive feedback percentage** in real-time.
* **Custom Hooks:** Uses a custom `useFeedback` hook to manage all application state, API calls, loading, and error handling.
* **Descriptive Ratings:** Displays **emojis and labels** (e.g., "😍 Excellent") inside the review cards instead of the raw numerical rating.

---

## 💻 Tech Stack

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | React, Vite | Core UI framework and lightning-fast build tool. |
| **State/Logic** | React Hooks (`useMemo`, `useCallback`, etc.) | Efficient state management and logic encapsulation. |
| **Mock Backend** | JSON Server | Simulates a persistent REST API for development. |
| **Styling** | CSS3 (CSS Grid, Media Queries) | Responsive layout implementation in `src/index.css`. |

---

## ⚙️ Getting Started

### 1. Prerequisites

You must have **Node.js** and **npm** installed on your system.

### 2. Installation

1.  Clone the repository or navigate to the project directory:
    ```bash
    cd feedback-app
    ```
2.  Install all required dependencies:
    ```bash
    npm install
    ```

### 3. Data File Setup

Ensure you have a `db.json` file in the project root containing the initial data structure. The JSON Server will use this file to store persistent data.

**`db.json` Example:**
```json
{
  "feedback": [
    { "id": "1", "name": "Test User", "rating": 5, "comments": "Initial review." }
  ]
}