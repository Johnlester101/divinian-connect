/**
 * SlideCarousel.tsx
 * ============================================================================
 * PPT-STYLE SLIDE CAROUSEL
 * ============================================================================
 * Presentation-style slide deck with navigation dots and auto-advance.
 * ============================================================================
 */

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

interface Slide {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const slides: Slide[] = [
  {
    title: 'Your Voice.',
    subtitle: 'Share campus concerns',
    description: 'Post about facilities, Wi-Fi, cleanliness, academics, and more. Every Divinian deserves to be heard.',
    icon: <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>,
    color: 'bg-blue-500',
  },
  {
    title: 'Your Campus.',
    subtitle: 'Track & resolve problems',
    description: 'Report campus issues with reference numbers. Watch status change from Open → Under Review → In Progress → Resolved.',
    icon: <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg></div>,
    color: 'bg-amber-500',
  },
  {
    title: 'Your Community.',
    subtitle: 'Support ideas & vote',
    description: 'Submit suggestions, support fellow students, and vote in polls that shape campus decisions.',
    icon: <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center text-green-600"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg></div>,
    color: 'bg-green-500',
  },
];

export function SlideCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => setCurrent((prev) => (prev + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, [current, isPlaying]);

  return (
    <div className="relative h-[600px] w-full overflow-hidden bg-gray-50">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`transition-all duration-700 ease-in-out ${
            index === current
              ? 'opacity-100 translate-x-0 scale-100'
              : 'opacity-0 translate-x-10 scale-95'
          } absolute inset-0 flex flex-col items-center justify-center text-center p-8`}
        >
          <div className={`w-16 h-16 rounded-2xl ${slide.color} flex items-center justify-center mb-8 shadow-lg`}>
            {slide.icon}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{slide.title}</h1>
          <h3 className="text-xl text-navy-600 font-semibold mb-4">{slide.subtitle}</h3>
          <p className="text-gray-600 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
            {slide.description}
          </p>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/90 backdrop-blur rounded-full text-navy-600 hover:bg-navy-600 hover:text-white transition-colors shadow-md"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1))}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/90 backdrop-blur rounded-full text-navy-600 hover:bg-navy-600 hover:text-white transition-colors shadow-md"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Play/Pause Toggle */}
      <button
        onClick={() => setIsPlaying((prev) => !prev)}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 p-2 bg-white/90 backdrop-blur rounded-full text-gray-600 hover:text-navy-600 transition-colors"
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
      </button>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 right-8 z-10 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === current ? 'bg-navy-600' : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
