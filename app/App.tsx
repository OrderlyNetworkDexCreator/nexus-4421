import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import OnboardingModal from './OnboardingModal';

const App = () => {
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (hasVisited) {
      setIsFirstVisit(false);
    } else {
      localStorage.setItem('hasVisited', 'true');
    }
  }, []);

  return (
    <Router>
      <Helmet>
        <title>My App</title>
      </Helmet>
      {isFirstVisit && <OnboardingModal />}
      {/* Other components go here */}
    </Router>
  );
};

export default App;