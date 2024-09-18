"use client";

import Image from "next/image";
import Navbar from "@/components/navbar";
import { useState, useEffect } from "react";
import Slider from "@/components/Slider";

interface TypewriterSpanProps {
  texts: string[];
}

const TypewriterSpan: React.FC<TypewriterSpanProps> = ({ texts }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const getRandomChar = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    return characters.charAt(Math.floor(Math.random() * characters.length));
  };

  useEffect(() => {
    const currentText = texts[currentTextIndex];
    let transitionIndex = 0;
    let intervalId: NodeJS.Timeout;

    const animateTransition = () => {
      if (transitionIndex <= currentText.length) {
        setDisplayText((prevText) => {
          const revealedPart = currentText.slice(0, transitionIndex);
          const randomPart = Array(
            Math.max(0, currentText.length - transitionIndex)
          )
            .fill(null)
            .map(getRandomChar)
            .join("");
          return revealedPart + randomPart;
        });
        transitionIndex++;
      } else {
        clearInterval(intervalId);
        setIsTransitioning(false);
        setTimeout(() => {
          setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
          setIsTransitioning(true);
        }, 1500); // Wait 2 seconds before changing to the next text
      }
    };

    if (isTransitioning) {
      setDisplayText(
        Array(currentText.length).fill(null).map(getRandomChar).join("")
      );
      intervalId = setInterval(animateTransition, 80); // Adjust speed here
    }

    return () => clearInterval(intervalId);
  }, [currentTextIndex, texts, isTransitioning]);

  return (
    <span
      className={`block text-customGreen ${
        isTransitioning ? "transitioning" : ""
      }`}
    >
      {displayText}
    </span>
  );
};
interface TypewriterButtonProps {
  text: string;
  hoverText: string;
}

const TypewriterButton: React.FC<TypewriterButtonProps> = ({
  text,
  hoverText,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [displayText, setDisplayText] = useState(text);

  const getRandomChar = () => {
    const characters = "!@#$%^&*()";
    return characters.charAt(Math.floor(Math.random() * characters.length));
  };

  useEffect(() => {
    if (isHovered) {
      let startTime = Date.now();
      const intervalId = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime < 500) {
          // .5 seconds of random characters
          setDisplayText(hoverText.split("").map(getRandomChar).join(""));
        } else {
          setDisplayText(hoverText);
          clearInterval(intervalId);
        }
      }, 40); // Adjust speed of random character change here

      return () => clearInterval(intervalId);
    } else {
      setDisplayText(text);
    }
  }, [isHovered, text, hoverText]);

  return (
    <button
      className="bg-white text-black font-bold py-3 px-6 rounded-lg uppercase text-lg relative overflow-hidden transition-all duration-300 ease-out hover:text-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: "250px",
        clipPath:
          "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)",
      }} // Adjust this width as needed
    >
      <span className="absolute inset-0 bg-customGreen transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
      <span className="relative z-10 inline-block">{displayText}</span>
    </button>
  );
};

export default function Home() {
  return (
    <>
      <div className="static-overlay"></div>
      <Navbar />
      <div className="bg-black/40 font-[family-name:var(--font-geist-sans)] pt-16 mt-5">
        <div className="flex flex-col">
          {/* Top Grid Layout */}
          <div className="grid grid-cols-2 md:grid-cols-4 min-h-[75vh]">
            {" "}
            {/* Changed to min-height */}
            <div className="absolute bottom-0 left-0 w-full h-1"></div>
            {[1, 2, 3, 4].map((columnNumber) => (
              <div
                key={columnNumber}
                className="p-6 shadow-md border-gray-500 thin-border"
              ></div>
            ))}
          </div>

          {/* Overlapping Header */}
          <header className="absolute top-0 pt-56 left-0 w-full h-[70vh] flex flex-col items-center justify-center z-10">
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold text-center font-[family-name:var(--font-share-tech-mono)] text-gray-300 drop-shadow-lg mb-4">
              <span className="block">Welcome to</span>
              <TypewriterSpan
                texts={[
                  "Our Awesome",
                  "This Amazing",
                  "The Coolest",
                  "Your Favorite",
                ]}
              />
              <span className="block">Website</span>
            </h1>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-share-tech-mono)] text-white drop-shadow-lg mb-8">
              Discover Amazing Things Here
            </h3>
            <div className="relative group text-center">
              <TypewriterButton text="Find Your Plan" hoverText="View Now" />
            </div>
          </header>
        </div>
      </div>
      <Slider />

      <div className="bg-black/40 font-[family-name:var(--font-geist-sans)]">
        <div className="flex flex-col">
          {/* Top Grid Layout */}
          <div className="grid grid-cols-2 md:grid-cols-4 min-h-[75vh]">
            {" "}
            {/* Changed to min-height */}
            <div className="absolute bottom-0 left-0 w-full h-1"></div>
            {[1, 2, 3, 4].map((columnNumber) => (
              <div
                key={columnNumber}
                className="p-6 shadow-md border-gray-500 thin-border"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
