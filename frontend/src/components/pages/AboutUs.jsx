import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import "./AboutUs.css";

export default function AboutUs({ logoUrl }) {
  const navigate = useNavigate();

  const proprietors = [
    {
      name: "Padin, Joshua",
      image: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1761847347/779a4dcc-fc37-4ca4-89ee-8f34cd4fa363.png",
      link: "https://www.facebook.com/john.padin.520"
    },
    {
      name: "Abayon, Ash Justine",
      image: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1761847044/8c83f682-0fa9-4854-866e-f976ca7747b4.png",
      link: "https://www.facebook.com/ashurii.23"
    },
    {
      name: "Peralta, Faith Maegan",
      image: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1761847101/25bf2511-c285-422b-a3ae-7e6b02041bf4.png",
      link: "https://www.facebook.com/maegan.lim93"
    },
    {
      name: "Ramirez, Kimberly",
      image: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1761847457/b3056ab4-07da-4997-bacc-432b67cdb00e.png",
      link: "https://www.facebook.com/kmbrlyrmrz"
    },
    {
      name: "Rito, Justin Carl",
      image: "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1761847238/e340ac80-7897-454d-9b58-b40819eaf00c.png",
      link: "https://www.facebook.com/justin.carl.rito"
    }
  ];

  return (
    <MainLayout>
      <section className="about-page-wrapper">
        <div className="about-container">
          <h1 className="about-main-title">About Us</h1>
          
          {/* Institution Section */}
          <div className="institution-section">
            <div className="institution-image">
                <img src="https://res.cloudinary.com/dxnb2ozgw/image/upload/v1762083046/cropped-RTU-logo_cdwpe6.png" alt="RTU Logo" />
            </div>
            <div className="institution-text">
                <h2 className="section-title">Institution</h2>
                <h3 className="institution-name">Rizal Technological University - Mandaluyong Campus</h3>
                <p className="institution-description">
                Rizal Technological University (RTU) is a state university located in Mandaluyong City, Philippines. 
                The Mandaluyong Campus is committed to providing quality education in technology, engineering, and various 
                academic disciplines. RTU focuses on producing globally competitive graduates through innovative teaching 
                methods and comprehensive research programs, preparing students for the challenges of the modern workforce.
                </p>
            </div>
          </div>

          {/* Proprietors Section */}
          <div className="proprietors-section">
            <h2 className="section-title">TypeVenture Proprietors</h2>
            <div className="proprietors-list">
              {proprietors.map((proprietor, index) => (
                <div key={index} className="proprietor-item">
                  <div className="proprietor-image-container">
                    <img 
                      src={proprietor.image || "https://via.placeholder.com/150"} 
                      alt={proprietor.name}
                      className="proprietor-image"
                    />
                  </div>
                  <div className="proprietor-info">
                    <h3 className="proprietor-name">{proprietor.name}</h3>
                    <a 
                      href={proprietor.link || "#"} 
                      className="proprietor-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Profile
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}