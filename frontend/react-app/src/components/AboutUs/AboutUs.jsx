import React from "react"
import "./AboutUs.css"
import { ReactComponent as ApartmentSVG } from "./../../images/apartment_SVG.svg";
export default function AboutUs() {
    return (
        <div className="AboutUs flex items-center justify-center min-h-screen">
            <div className="flex items-center p-4">
                {/* Even larger logo with proportional scaling */}
                <ApartmentSVG className="h-64 w-64" style={{ fill: "#1B263B" }} alt="SubDC Logo" />
                {/* Stacked text to the right of the logo with proportional scaling */}
                <div className="flex flex-col justify-center ml-6">
                    <span className="text-8xl font-semibold leading-none title-text">
                        <strong>SUB</strong>
                    </span>
                    <span className="text-8xl font-semibold leading-none -mt-4 title-text">
                        <strong>DC</strong>
                    </span>
                </div>
            </div>
        </div>
    );
}
