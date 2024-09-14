"use client";

import Image from "next/image";
import Navbar from "@/components/navbar";
import { useState, useEffect } from "react";

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
        }, 2000); // Wait 2 seconds before changing to the next text
      }
    };

    if (isTransitioning) {
      setDisplayText(
        Array(currentText.length).fill(null).map(getRandomChar).join("")
      );
      intervalId = setInterval(animateTransition, 40); // Adjust speed here
    }

    return () => clearInterval(intervalId);
  }, [currentTextIndex, texts, isTransitioning]);

  return (
    <span
      className={`block text-red-600 ${isTransitioning ? "transitioning" : ""}`}
    >
      {displayText}
    </span>
  );
};
interface TypewriterButtonProps {
  text: string;
}

const TypewriterButton: React.FC<TypewriterButtonProps> = ({ text }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [displayText, setDisplayText] = useState(text);

  const getRandomChar = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    return characters.charAt(Math.floor(Math.random() * characters.length));
  };

  useEffect(() => {
    if (isHovered) {
      let startTime = Date.now();
      const intervalId = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime < 1000) {
          // 1 second of random characters
          setDisplayText(text.split("").map(getRandomChar).join(""));
        } else {
          setDisplayText(text);
          clearInterval(intervalId);
        }
      }, 50); // Adjust speed of random character change here

      return () => clearInterval(intervalId);
    } else {
      setDisplayText(text);
    }
  }, [isHovered, text]);

  return (
    <button
      className="bg-white text-black font-bold py-3 px-6 rounded-full uppercase text-lg relative overflow-hidden transition-all duration-300 ease-out hover:text-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="absolute inset-0 bg-orange-500 transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
      <span className="relative z-10 inline-block min-w-full">
        {displayText}
      </span>
    </button>
  );
};

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen font-[family-name:var(--font-geist-sans)] pt-16 relative">
        {/* Grid Layout */}
        <div className="grid grid-cols-4 h-screen">
          <div className="beam-container absolute bottom-0 left-0 w-full h-1 bg-red-600">
            <div className="beam-light"></div>
          </div>
          {[1, 2, 3, 4].map((columnNumber) => (
            <div
              key={columnNumber}
              className="bg-gray-100 p-6 shadow-md border-red-600 border-4"
            >
              <h2 className="text-xl font-bold mb-4">Column {columnNumber}</h2>
              <p>Content for column {columnNumber} goes here.</p>
            </div>
          ))}
        </div>

        {/* Overlapping Header */}
        <header className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center z-10">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight text-center font-[family-name:var(--font-share-tech-mono)] text-white drop-shadow-lg mb-4">
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
          <div className="relative group">
            <TypewriterButton text="Find Your Plan" />
          </div>
        </header>
      </div>
    </>
  );
}
