import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.scss';

const App = () => {
  return (
    <div className="App">
      <Outlet />
    </div>
  );
}

export default App;
