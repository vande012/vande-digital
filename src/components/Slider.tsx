import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Slide() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const slides = [
    [
      { image: "/slide.png", title: "Slide 1" },
      { image: "/slide.png", title: "Slide 2" },
      { image: "/slide.png", title: "Slide 3" },
      { image: "/slide.png", title: "Slide 4" },
    ],
    [
      { image: "/slide.png", title: "Slide 5" },
      { image: "/slide.png", title: "Slide 6" },
      { image: "/slide.png", title: "Slide 7" },
      { image: "/slide.png", title: "Slide 8" },
    ],
    // Add more sets of slides as needed
  ];

  // Handle swipe events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (isSwiping) {
      if (touchStartX - touchEndX > 50) {
        nextSlide(); // Swipe left
      } else if (touchStartX - touchEndX < -50) {
        prevSlide(); // Swipe right
      }
    }
    setIsSwiping(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <>
      <div className="relative overflow-hidden bg-black/40">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          // Change transform behavior based on viewport size
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slideSet, setIndex) => (
            <div key={setIndex} className="w-full flex-shrink-0">
              <div className="flex py-5">
                {slideSet.map((slide, index) => (
                  <div
                    key={index}
                    // Show one image on mobile (w-full) and four on larger screens (w-1/4)
                    className="w-full md:w-1/4 p-2 relative group"
                  >
                    <div className="flex justify-center relative overflow-hidden group">
                      <div className="relative w-96 overflow-hidden">
                        {/* Image */}
                        <Image
                          src="/slide.png"
                          alt={slide.title}
                          layout="responsive"
                          width={500}
                          height={500}
                          objectFit="cover"
                        />

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-customGreen to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-400"></div>

                        {/* Text overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <h3 className="text-white text-lg font-bold">
                            {slide.title}
                          </h3>
                        </div>

                       
                        {/* Corner borders */}
                        <div className="absolute inset-0 pointer-events-none">
                          {/* Top-left corner */}
                          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-customGreen opacity-50 group-hover:opacity-100 group-hover:w-8 group-hover:h-8 transition-all duration-300"></div>
                          {/* Top-right corner */}
                          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-customGreen opacity-50 group-hover:opacity-100 group-hover:w-8 group-hover:h-8 transition-all duration-300"></div>
                          {/* Bottom-left corner */}
                          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-customGreen opacity-50 group-hover:opacity-100 group-hover:w-8 group-hover:h-8 transition-all duration-300"></div>
                          {/* Bottom-right corner */}
                          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-customGreen opacity-50 group-hover:opacity-100 group-hover:w-8 group-hover:h-8 transition-all duration-300"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Button
          onClick={prevSlide}
          variant="default"
          size="icon"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 rounded-full"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          onClick={nextSlide}
          variant="default"
          size="icon"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
}
