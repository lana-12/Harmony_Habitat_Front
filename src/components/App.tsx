import React from 'react';
import Header from './templates/Header';
import Footer from './templates/Footer';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import logo from './logo.svg';
//import './App.css';


function App() {
  return (
    <div className="App" id="container_all">
      <ToastContainer />
      <Header/>
      <main>
        <Outlet />
      </main>
      {/* outlet */}
      <Footer />
    </div>
  );
}

export default App;
