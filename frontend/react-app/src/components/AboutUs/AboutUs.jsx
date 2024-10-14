import React from "react";
import "./AboutUs.css";
import GWAboutImg from "./image/gwu_about_img.jpg";


export default function AboutUs() {
  return (
    <div className="AboutUs flex flex-col items-center justify-center p-10">
      {/* Header */}
      <div className="text-left w-full mb-6">
        <h2 className="text-black-400 text-md mb-2">About Us</h2>
    </div>

      <div className="AboutUs flex flex-col lg:flex-row items-center justify-center p-10">
        {/* Main Text Section */}
        <div className="text-section lg:w-1/2 flex flex-col items-center justify-center text-center mt-6 lg:mt-0 lg:text-left">
            <h1 className="text-4xl font-bold">
            We aim to provide DMV students with a safe and reliable method for university housing.
            </h1>
            <p className="mt-5">
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
        className="rounded-xl shadow-lg"
        />
     </div>
     </div>

     <div className="team-section mt-20">
  <h2 className="text-3xl font-bold mb-10">Meet the SubDC Team</h2>
  
  <div className="flex flex-wrap justify-center">
    {/* Team Members - make this an element later bc 2 much code */} 
    <div className="team-member bg-white shadow-lg rounded-lg p-5 m-4 max-w-xs">
      <img 
        src="path-to-team-member1.jpg" 
        alt="Team Member 1" 
        className="w-32 h-32 rounded-full mx-auto mb-4" 
      />
      <h3 className="text-xl font-semibold">Team Member 1</h3>
      <p className="text-gray-600">CEO & Founder</p>
      <p className="text-gray-500 mt-3">
      Blah blah bio.
      </p>
    </div>
    <div className="team-member bg-white shadow-lg rounded-lg p-5 m-4 max-w-xs">
      <img 
        src="path-to-team-member2.jpg" 
        alt="Team Member 2" 
        className="w-32 h-32 rounded-full mx-auto mb-4" 
      />
      <h3 className="text-xl font-semibold">Team Member 2</h3>
      <p className="text-gray-600">Other Person</p>
      <p className="text-gray-500 mt-3">
        Blah blah bio.
      </p>
    </div>
    <div className="team-member bg-white shadow-lg rounded-lg p-5 m-4 max-w-xs">
      <img 
        src="path-to-team-member2.jpg" 
        alt="Team Member 2" 
        className="w-32 h-32 rounded-full mx-auto mb-4" 
      />
      <h3 className="text-xl font-semibold">Team Member 2</h3>
      <p className="text-gray-600">Other Person</p>
      <p className="text-gray-500 mt-3">
        Blah blah bio.
      </p>
    </div>
    <div className="team-member bg-white shadow-lg rounded-lg p-5 m-4 max-w-xs">
      <img 
        src="path-to-team-member2.jpg" 
        alt="Team Member 2" 
        className="w-32 h-32 rounded-full mx-auto mb-4" 
      />
      <h3 className="text-xl font-semibold">Team Member 2</h3>
      <p className="text-gray-600">Other Person</p>
      <p className="text-gray-500 mt-3">
        Blah blah bio.
      </p>
    </div>
    <div className="team-member bg-white shadow-lg rounded-lg p-5 m-4 max-w-xs">
      <img 
        src="path-to-team-member2.jpg" 
        alt="Team Member 2" 
        className="w-32 h-32 rounded-full mx-auto mb-4" 
      />
      <h3 className="text-xl font-semibold">Team Member 2</h3>
      <p className="text-gray-600">Other Person</p>
      <p className="text-gray-500 mt-3">
        Blah blah bio.
      </p>
    </div>
    <div className="team-member bg-white shadow-lg rounded-lg p-5 m-4 max-w-xs">
      <img 
        src="path-to-team-member2.jpg" 
        alt="Team Member 2" 
        className="w-32 h-32 rounded-full mx-auto mb-4" 
      />
      <h3 className="text-xl font-semibold">Team Member 2</h3>
      <p className="text-gray-600">Other Person</p>
      <p className="text-gray-500 mt-3">
        Blah blah bio.
      </p>
    </div>
  </div>
</div>

    </div>
  );
}
