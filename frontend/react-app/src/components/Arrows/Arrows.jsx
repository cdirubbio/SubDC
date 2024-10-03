import React from 'react';
import "./Arrows.css";
const CustomLeftArrow = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="custom-arrow left-arrow"
      aria-label="Previous slide"
    >
      &#9664;
    </button>
  );
};


const CustomRightArrow = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="custom-arrow right-arrow"
      aria-label="Next slide"
    >
      &#9654;
    </button>
  );
};

export { CustomLeftArrow, CustomRightArrow };
