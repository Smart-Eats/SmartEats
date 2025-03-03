import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; // Import Router from react-router-dom
import { App } from './App'; // Import your main App component
import './App.css'; // Your global styles

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>  {/* Wrap your App component with Router */}
      <App />
    </Router>
  </StrictMode>,
);

