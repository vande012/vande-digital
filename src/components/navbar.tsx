'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (typeof window !== 'undefined') { 
      if (window.scrollY > lastScrollY) { // if scroll down hide the navbar
        setIsVisible(false); 
      } else { // if scroll up show the navbar
        setIsVisible(true);  
      }

      // remember current page location to use in the next move
      setLastScrollY(window.scrollY); 
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <nav className={` fixed top-0 left-0 right-0 transition-transform duration-300 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-full'} flex justify-between items-center p-4 shadow-md z-50 thin-border border-b border-gray-500 backdrop-blur-lg`}>
      {/* Left Button */}
      <Button variant="outline" size="icon">
        <Menu className="h-4 w-4" />
      </Button>

      {/* Center Logo */}
      <div className="flex-grow flex justify-center">
        <Image
          src="/path-to-your-logo.png" // Replace with your logo path
          alt="Logo"
          width={100}
          height={50}
        />
      </div>

      {/* Right Button with Sheet */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <nav className="flex flex-col space-y-4">
            <Link href="/" className="text-lg hover:underline">Home</Link>
            <Link href="/about" className="text-lg hover:underline">About</Link>
            <Link href="/services" className="text-lg hover:underline">Services</Link>
            <Link href="/contact" className="text-lg hover:underline">Contact</Link>
          </nav>
        </SheetContent>
      </Sheet>
    </nav>
  )
}

export default Navbar