import { useState, useEffect, useRef } from 'react';

const CursorFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trail, setTrail] = useState([]);
  const trailRef = useRef([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Add star trail effect
      const star = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now() + Math.random(),
        size: Math.random() * 8 + 4
      };

      trailRef.current = [...trailRef.current, star].slice(-12); // Keep last 12 stars
      setTrail([...trailRef.current]);

      // Remove stars after animation
      setTimeout(() => {
        trailRef.current = trailRef.current.filter(s => s.id !== star.id);
        setTrail([...trailRef.current]);
      }, 800);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      {/* Star trail particles */}
      {trail.map((star) => (
        <div
          key={star.id}
          className="cursor-star"
          style={{
            left: `${star.x}px`,
            top: `${star.y}px`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
        >
          ✨
        </div>
      ))}

      {/* Main cursor follower */}
      <div
        className={`cursor-follower ${isVisible ? 'visible' : ''} ${isClicking ? 'clicking' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
      
      {/* Secondary cursor ring */}
      <div
        className={`cursor-ring ${isVisible ? 'visible' : ''} ${isClicking ? 'clicking' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
    </>
  );
};

export default CursorFollower;
