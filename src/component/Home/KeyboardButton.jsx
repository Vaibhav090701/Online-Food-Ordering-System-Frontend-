import React from 'react';

export default function RotatingCardSection() {
  // Define features to display on each face of the cube
  const features = [
    {
      name: "Pizza", // Changed from "Centralized Links" to fit food theme
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop'
    },
    {
      name: 'Rolls',
      image: 'https://img.freepik.com/free-photo/side-view-chicken-roll-grilled-chicken-lettuce-cucumber-tomato-mayo-pita_141793-4849.jpg?ga=GA1.1.404623323.1748892773&semt=ais_items_boosted&w=740',
    },
    {
      name: 'Samosa',
      image: 'https://images.unsplash.com/photo-1732519970445-8f2d6998961f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'Burger',
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop',
    },
    {
      name: 'Pasta',
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=800&auto=format&fit=crop',
    },
  ];

  return (
    <section className="banner relative flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-4 w-full">
        {/* 3D Rotating Cube Setup */}
        <div className="relative h-[220px] md:h-[220px] flex items-center justify-center perspective-1000">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Cube Base Container */}
            <div className="cube-base-container">
              {/* Cube Faces with Feature Cards */}
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`cube-face cube-face-${index + 1} bg-gradient-to-br from-gray-700 to-gray-800 dark:from-gray-700 dark:to-gray-800 rounded-lg shadow-lg`}
                  style={{ backgroundImage: `url(${feature.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                  <div className="flex flex-col items-center justify-center p-2 md:p-2 overflow-hidden text-center">
                    <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                      {feature.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for 3D transformations and animations */}
      <style jsx>{`
        /* Perspective for the 3D scene */
        .perspective-1000 {
          perspective: 1000px;
        }

        /* Cube Base Styles */
        .cube-base-container {
          position: relative;
          width: 220px;
          height: 220px;
          transform-style: preserve-3d;
          transform: rotateX(-20deg) rotateY(0deg);
          animation: cubeRotate 25s linear infinite;
        }

        .cube-face {
          position: absolute;
          width: 100%;
          height: 100%;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: center;
          backface-visibility: hidden;
          color: white;
          font-size: 1rem;
          padding: 1rem;
        }

        /* Positioning for each face of the cube */
        .cube-face-1 { transform: rotateY(0deg) translateZ(110px); }
        .cube-face-2 { transform: rotateY(90deg) translateZ(110px); }
        .cube-face-3 { transform: rotateY(180deg) translateZ(110px); }
        .cube-face-4 { transform: rotateY(-90deg) translateZ(110px); }
        .cube-face-5 { transform: rotateX(90deg) translateZ(110px); }

        /* Keyframe Animation for the Cube */
        @keyframes cubeRotate {
          from { transform: rotateX(-20deg) rotateY(0deg); }
          to { transform: rotateX(-20deg) rotateY(360deg); }
        }

        /* Responsive adjustments for smaller screens */
        @media (max-width: 768px) {
          .cube-base-container {
            width: 180px;
            height: 180px;
            transform: rotateX(-20deg) rotateY(0deg) scale(0.9);
          }
          .cube-face-1 { transform: rotateY(0deg) translateZ(90px); }
          .cube-face-2 { transform: rotateY(90deg) translateZ(90px); }
          .cube-face-3 { transform: rotateY(180deg) translateZ(90px); }
          .cube-face-4 { transform: rotateY(-90deg) translateZ(90px); }
          .cube-face-5 { transform: rotateX(90deg) translateZ(90px); }
        }
      `}</style>
    </section>
  );
}