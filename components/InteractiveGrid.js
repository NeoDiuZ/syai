"use client";

import { useState, useEffect, useRef } from "react";

const InteractiveGrid = () => {
  const gridRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Use fewer cells for better performance
  const gridSize = { cols: 30, rows: 30 };
  
  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (gridRef.current) {
        setDimensions({
          width: gridRef.current.offsetWidth,
          height: gridRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  // Handle mouse movement with throttling for performance
  const handleMouseMove = (e) => {
    if (!gridRef.current) return;
    
    const rect = gridRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
    setIsHovering(true);
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  // Calculate cell size
  const cellWidth = dimensions.width / gridSize.cols;
  const cellHeight = dimensions.height / gridSize.rows;

  // Calculate which cell is being hovered
  const hoveredCol = Math.floor(mousePosition.x / cellWidth);
  const hoveredRow = Math.floor(mousePosition.y / cellHeight);

  // Only render cells near the cursor for better performance
  const renderCells = () => {
    if (!isHovering) return null;
    
    const cells = [];
    const visibilityRadius = 10; // Only render cells within this radius of the cursor
    
    // Calculate visible range with boundaries
    const startRow = Math.max(0, hoveredRow - visibilityRadius);
    const endRow = Math.min(gridSize.rows - 1, hoveredRow + visibilityRadius);
    const startCol = Math.max(0, hoveredCol - visibilityRadius);
    const endCol = Math.min(gridSize.cols - 1, hoveredCol + visibilityRadius);
    
    for (let row = startRow; row <= endRow; row++) {
      for (let col = startCol; col <= endCol; col++) {
        // Calculate distance from hovered cell
        const distance = Math.sqrt(
          Math.pow(col - hoveredCol, 2) + Math.pow(row - hoveredRow, 2)
        );
        
        const maxGlowRadius = 5;
        const isActive = distance < maxGlowRadius;
        const opacity = isActive 
          ? Math.pow(1 - distance / maxGlowRadius, 1.5) // Smoother falloff
          : 0;
        
        // Only render visible cells for performance
        const isVisible = distance < visibilityRadius;
        
        if (isVisible) {
          cells.push(
            <div
              key={`${row}-${col}`}
              className="absolute"
              style={{
                top: row * cellHeight,
                left: col * cellWidth,
                width: cellWidth,
                height: cellHeight,
                // Only show borders and effects when hovering
                borderRight: '1px solid rgba(136, 136, 136, 0.15)',
                borderBottom: '1px solid rgba(136, 136, 136, 0.15)',
                backgroundColor: isActive ? `rgba(99, 102, 241, ${opacity * 0.15})` : 'transparent',
                boxShadow: isActive 
                  ? `0 0 ${12 * opacity}px ${3 * opacity}px rgba(111, 114, 245, ${opacity * 0.3})` 
                  : 'none',
                opacity: 1,
                transition: 'background-color 150ms ease-out, box-shadow 150ms ease-out',
              }}
            />
          );
        }
      }
    }
    
    return cells;
  };

  // Create a background grid pattern that's visible only when hovering
  const gridPattern = {
    width: '100%',
    height: '100%',
    backgroundSize: `${cellWidth}px ${cellHeight}px`,
    backgroundImage: isHovering 
      ? 'linear-gradient(to right, rgba(136, 136, 136, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(136, 136, 136, 0.05) 1px, transparent 1px)'
      : 'none',
    transition: 'background-image 0.3s ease-in-out',
  };

  return (
    <div
      ref={gridRef}
      className="absolute inset-0 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        perspective: '1000px',
      }}
    >
      {/* Background grid pattern - only visible when hovering */}
      <div className="absolute inset-0" style={gridPattern}></div>
      
      {/* Dynamic cells near cursor */}
      <div className="absolute inset-0">
        {dimensions.width > 0 && dimensions.height > 0 && renderCells()}
      </div>
      
      {/* Light effect following cursor */}
      {isHovering && (
        <div
          className="pointer-events-none absolute rounded-full"
          style={{
            left: mousePosition.x - 100,
            top: mousePosition.y - 100,
            width: 200,
            height: 200,
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, rgba(99, 102, 241, 0.1) 40%, transparent 70%)',
            opacity: 0.8,
            transition: 'left 50ms linear, top 50ms linear',
            mixBlendMode: 'screen',
          }}
        />
      )}
      
      {/* Gradient mask for fading out grid at edges */}
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_70%,transparent_100%)]"></div>
    </div>
  );
};

export default InteractiveGrid; 