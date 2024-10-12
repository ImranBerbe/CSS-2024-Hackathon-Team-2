import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Change here
import LandingPage from './components/LandingPage';
import HomePage from './Components/HomePage';
import Header from './header';
import DailyQuotes from './Components/DailyQuotes';
import AboutUs from './Components/AboutUs';

const App = () => {
  return (<>
    <Header/>
    <Router>
      <Routes>
        {/* Define routes */}
        <Route path="/about" element={<AboutUs />} />
        <Route path="/daily" element={<DailyQuotes />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/next/:id" element={<HomePage />} />
        
      </Routes>
    </Router>
    </>
  );
};

export default App;
