import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import RouteCostPage from 'components/Pages/RouteCostPage';
import React from 'react';
import './App.scss';

function App() {
  return (
    <div className="App container">
      <Header />
      <div className="App-body">
        <RouteCostPage />
      </div>
      <Footer />
    </div>
  );
}

export default App;
