import React from 'react';
import './CongModal.css'; // Import your CSS file

const CongratulationModal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  // Function to generate confetti pieces (for dynamic styling)
  const generateConfetti = () => {
    const confettiPieces = [];
    const colors = ['#A8E61D', '#FFD700', '#2e7d32', '#FFC107']; // Green and yellow palette

    for (let i = 0; i < 50; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const duration = Math.random() * 2 + 1; // 1 to 3 seconds
      const delay = Math.random() * 0.5; // 0 to 0.5 seconds delay
      const left = Math.random() * 100;
      const top = Math.random() * -20; // Start above the modal
      const rotate = Math.random() * 360;

      confettiPieces.push(
        <div
          key={i}
          className="confetti-piece"
          style={{
            backgroundColor: color,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
            left: `${left}%`,
            top: `${top}%`,
            transform: `rotate(${rotate}deg)`
          }}
        ></div>
      );
    }
    return confettiPieces;
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="confetti-container">
          {generateConfetti()}
        </div>
        <h2 className="modal-title">Congratulations!</h2>
        <p className="modal-message">{message}</p>
        <button className="close-button" onClick={onClose}>
          Awesome!
        </button>
      </div>
    </div>
  );
};

export default CongratulationModal;