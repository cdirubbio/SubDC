import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Listings from './components/Listings/Listings';
import CreateListing from './components/CreateListing/CreateListing';
import Authentication from './components/Authentication/Authentication';
import VerifyEmail from './components/Authentication/VerifyEmail/VerifyEmail';
import AboutUs from './components/AboutUs/AboutUs';
import ListingPage from './components/ListingPage/ListingPage';
import Account from './components/Account/Account';


window.BACKEND_URL = "http://ec2-3-80-188-158.compute-1.amazonaws.com:8080"


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Home />} />
        <Route path='listings' element={<Listings />} />
        <Route path="/listing/:id" element={<ListingPage />} />
        <Route path='createListing' element={<CreateListing />} />
        <Route path='aboutUs' element={<AboutUs />} /> 
        <Route path='authentication' element={<Authentication />} />
        <Route path='verifyEmail' element={<VerifyEmail />} />
        <Route path='account' element={<Account />} />
      </Route>
    </Routes>
    <Footer/>
  </BrowserRouter>
  );
}
export default App;
