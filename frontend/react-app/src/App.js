import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Listings from './components/Listings/Listings';
import CreateListing from './components/CreateListing/CreateListing';
import Authentication from './components/Authentication/Authentication';
import AboutUs from './components/AboutUs/AboutUs';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Home />} />
        <Route path='Home' element={<Home />} />
        <Route path='Listings' element={<Listings />} />
        <Route path='CreateListing' element={<CreateListing />} />
        <Route path='AboutUs' element={<AboutUs />} /> 
        <Route path='Authentication' element={<Authentication />} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
