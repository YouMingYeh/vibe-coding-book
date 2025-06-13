"use client";

import React, { useEffect, useState } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      
      setProgress(Math.min(Math.max(scrollPercent, 0), 100));
      setIsVisible(scrollPercent > 5); // Show after 5% scroll
    };

    const throttledUpdate = () => {
      requestAnimationFrame(updateProgress);
    };

    window.addEventListener('scroll', throttledUpdate);
    window.addEventListener('resize', throttledUpdate);
    updateProgress(); // Initial call

    return () => {
      window.removeEventListener('scroll', throttledUpdate);
      window.removeEventListener('resize', throttledUpdate);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const circumference = 2 * Math.PI * 20; // radius is 20
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={`fixed bottom-6 right-6 z-40 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <button
        onClick={scrollToTop}
        className="relative group cursor-pointer focus:outline-none rounded-full reading-progress"
        aria-label={`Reading progress: ${Math.round(progress)}%. Click to scroll to top.`}
      >
        {/* Background circle */}
        <svg
          className="w-12 h-12 transform -rotate-90 transition-all duration-300 group-hover:scale-110 group-active:scale-95"
          viewBox="0 0 44 44"
        >
          {/* Background track */}
          <circle
            cx="22"
            cy="22"
            r="20"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-muted/20"
          />
          
          {/* Progress circle */}
          <circle
            cx="22"
            cy="22"
            r="20"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="text-foreground/70 transition-all duration-500 ease-out group-hover:text-foreground"
          />
        </svg>

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none transform translate-y-1 group-hover:translate-y-0">
          <div className="bg-foreground/90 text-background text-xs px-3 py-1.5 rounded-md whitespace-nowrap backdrop-blur-sm">
            {Math.round(progress)}% read
            <div className="absolute top-full right-3 w-0 h-0 border-l-2 border-r-2 border-t-4 border-l-transparent border-r-transparent border-t-foreground/90"></div>
          </div>
        </div>
      </button>
    </div>
  );
}
