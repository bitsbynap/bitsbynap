const HoverEffect = ({ children, className = '' }) => {
  return (
    <div className={`transform transition-transform duration-300 hover:scale-105 ${className}`}>
      {children}
    </div>
  );
};

export default HoverEffect; 