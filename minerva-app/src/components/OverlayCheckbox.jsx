import React from 'react';

const OverlayCheckbox = ({ left, top, checked, onChange, id }) => {
    return (
        <div
            style={{
                position: 'absolute',
                left: left,
                top: top,
                width: '18px', // Approximate size, adjustable
                height: '18px',
                transform: 'translate(-50%, -50%)', // Center on the coordinate
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 20, // Ensure it's above the pdf pages
                pointerEvents: 'auto'
            }}
            onClick={(e) => {
                e.stopPropagation(); // Prevent triggering page clicks
                onChange(id);
            }}
        >
            {checked && (
                <span style={{
                    color: 'black',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    lineHeight: 1,
                    fontFamily: 'sans-serif'
                }}>
                    X
                </span>
            )}
            {/* Visual debug border - remove in production or make optional */}
            {/* <div style={{ 
          position: 'absolute', 
          width: '100%', 
          height: '100%', 
          border: '1px solid rgba(0,0,255,0.3)', 
          pointerEvents: 'none' 
      }} /> */}
        </div>
    );
};

export default OverlayCheckbox;
