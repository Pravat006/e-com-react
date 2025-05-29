
const StarryBackground = ({ backgroundImageUrl }) => {
  // Apply background image if URL is provided, otherwise fallback to a default dark color
  const backgroundStyle = backgroundImageUrl
    ? { backgroundImage: `url(${backgroundImageUrl})` }
    : { backgroundColor: '#1a1a2e' }; // Default dark background

  return (
    <div className="starry-background" style={backgroundStyle}>
      <div className="heartbeat-light"></div>
    </div>
  );
};

export default StarryBackground;