import React from "react";
import "./AboutUs.css";
import GWAboutImg from "./image/gwu_about_img.jpg";
import SojiImg from "./image/soji_img.png";
import AhmedImg from "./image/ahmed_img.png";
import AbbyImg from "./image/abby_img.png";
import SimoImg from "./image/simo_img.png";
import ChrisImg from "./image/chris_img.png";
import EmmyImg from "./image/emmy_img.png";




export default function AboutUs() {
  return (
    <div className="AboutUs flex flex-col items-center justify-center p-10">
      {/* Header */}
      <div className="text-left w-full mb-6">
        <h2 className="aboutus-title text-black-400 text-md mb-2">About Us</h2>
    </div>

      <div className="AboutUs flex flex-col lg:flex-row items-center justify-center p-10">
        {/* Main Text Section */}
        <div className="text-section lg:w-1/2 flex flex-col items-center justify-center text-center mt-6 lg:mt-0 lg:text-left">
            <h1 className="aboutus text-4xl font-bold">
            We aim to provide DMV students with a safe and reliable method for university housing.
            </h1>
            <p className="aboutus mt-5">
            Created on the GWU campus, our student founders discovered a need for a safe alternative to subletting. 
            Deterred by the prolific scams and shady business deals of our fellow classmates, we created a platform
            where students can trust that their housing needs will be taken seriously.
            </p>
        </div>

        {/* Image Section */}
     <div className="image-section lg:w-1/2 flex justify-center mt-10 lg:mt-0">
        <img
        src={GWAboutImg}
        alt="Meet the SubDC Team."
        className="main rounded-xl shadow-lg"
        />
     </div>
     </div>

     <div className="team-section mt-20">
  <h2 className="aboutus-title text-3xl font-bold mb-10">Meet the SubDC Team</h2>
  
  <div className="flex flex-wrap justify-center">
    {/* Team Members - make this an element later bc 2 much code */} 
    <a href="https://linkedin.com/in/cdirubbio">
    <div className="team-member bg-white shadow-lg rounded-lg p-5 m-4 max-w-xs">
      <img 
        src={ChrisImg} 
        alt="Chris" 
        className="w-32 h-auto rounded-full mx-auto mb-4 object-cover"  
      />
      <h3 className="text-xl font-semibold">CEO & Developer</h3>
      <p className="text-gray-600">Christian DiRubbio</p>
      <p className="text-gray-500 mt-3">
        
      </p>
    </div>
    </a>
    <div className="team-member bg-white shadow-lg rounded-lg p-5 m-4 max-w-xs">
      <img 
        src={SimoImg} 
        alt="Simo" 
        className="w-32 h-auto rounded-full mx-auto mb-4 object-cover"  
      />
      <h3 className="text-xl font-semibold">CTO</h3>
      <p className="text-gray-600">Simone Levy</p>
      <p className="text-gray-500 mt-3">
        
      </p>
    </div>
    <div className="team-member bg-white shadow-lg rounded-lg p-5 m-4 max-w-xs">
      <img 
        src={SojiImg} 
        alt="Team Member 1" 
        className="w-32 h-auto rounded-full mx-auto mb-4 object-cover"  
      />
      <h3 className="text-xl font-semibold">COO</h3>
      <p className="text-gray-600">Soji Maksudova</p>
      <p className="text-gray-500 mt-3">
      
      </p>
    </div>
    <div className="team-member bg-white shadow-lg rounded-lg p-5 m-4 max-w-xs">
      <img 
        src={AhmedImg} 
        alt="Team Member 2" 
        className="w-32 h-auto rounded-full mx-auto mb-4 object-cover"  
      />
      <h3 className="text-xl font-semibold">CFO</h3>
      <p className="text-gray-600">Ahmed Ismael</p>
      <p className="text-gray-500 mt-3">
        
      </p>
    </div>
    <div className="team-member bg-white shadow-lg rounded-lg p-5 m-4 max-w-xs">
      <img 
        src={AbbyImg} 
        alt="Team Member 2" 
        className="w-32 h-auto rounded-full mx-auto mb-4 object-cover"  
      />
      <h3 className="text-xl font-semibold">CIO</h3>
      <p className="text-gray-600">Abby Mansoor</p>
      <p className="text-gray-500 mt-3">
        
      </p>
    </div>
    <div className="team-member bg-white shadow-lg rounded-lg p-5 m-4 max-w-xs">
      <img 
        src={EmmyImg} 
        alt="Team Member 2" 
        className="w-32 h-auto rounded-full mx-auto mb-4 object-cover"  
      />
      <h3 className="text-xl font-semibold">PM</h3>
      <p className="text-gray-600">Emmy Ly</p>
      <p className="text-gray-500 mt-3">
        
      </p>
    </div>
  </div>
</div>

    </div>
  );
}
