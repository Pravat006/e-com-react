import React from 'react';

const BackgroundAnimation = () => {
  return (
    <>
      {/* Bouncing glowing blobs */}
      <div className="absolute bottom-0 left-[10%] w-24 h-24 bg-purple-300 rounded-full filter blur-xl opacity-70 animate-bounceball"></div>
      <div className="absolute bottom-0 left-[30%] w-28 h-28 bg-pink-300 rounded-full filter blur-xl opacity-70 animate-bounceball animation-delay-1500"></div>
      <div className="absolute bottom-0 left-[55%] w-32 h-32 bg-indigo-300 rounded-full filter blur-xl opacity-70 animate-bounceball animation-delay-3000"></div>
      <div className="absolute bottom-0 left-[75%] w-36 h-36 bg-blue-300 rounded-full filter blur-xl opacity-70 animate-bounceball animation-delay-4500"></div>

      <style jsx>{`
        @keyframes bounceball {
          0% {
            transform: translateY(0) scaleY(1) scaleX(1);
          }
          10% {
            transform: translateY(-180px) scaleY(1.1) scaleX(0.9);
          }
          30% {
            transform: translateY(0) scaleY(0.9) scaleX(1.1);
          }
          50% {
            transform: translateY(-90px) scaleY(1.05) scaleX(0.95);
          }
          70% {
            transform: translateY(0) scaleY(0.95) scaleX(1.05);
          }
          85% {
            transform: translateY(-30px) scaleY(1.02) scaleX(0.98);
          }
          100% {
            transform: translateY(0) scaleY(1) scaleX(1);
          }
        }

        .animate-bounceball {
          animation: bounceball 3.5s infinite ease-in-out;
        }

        .animation-delay-1500 {
          animation-delay: 1.5s;
        }

        .animation-delay-3000 {
          animation-delay: 3s;
        }

        .animation-delay-4500 {
          animation-delay: 4.5s;
        }
      `}</style>
    </>
  );
};

export default BackgroundAnimation;
