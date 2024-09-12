import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Listings from './components/Listings/Listings';
import CreateListing from './components/CreateListing/CreateListing';
import Authentication from './components/Authentication/Authentication';
import AboutUs from './components/AboutUs/AboutUs';
import ListingPage from './components/ListingPage/ListingPage';
  
window.BACKEND_URL = "http://ec2-98-80-175-250.compute-1.amazonaws.com:8080"

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Home />} />
        <Route path='Home' element={<Home />} />
        <Route path='Listings' element={<Listings />} />
        <Route path="/Listing/:id" element={<ListingPage />} />
        <Route path='CreateListing' element={<CreateListing />} />
        <Route path='AboutUs' element={<AboutUs />} /> 
        <Route path='Authentication' element={<Authentication />} />
      </Route>
    </Routes>
    <Footer/>
  </BrowserRouter>
  );
}
export default App;
