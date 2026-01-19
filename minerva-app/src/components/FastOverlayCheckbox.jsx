import React, { useState, useRef } from 'react';

const FastOverlayCheckbox = React.memo(({ left, top, checked, onChange, id }) => {
    const isInitialMount = useRef(true);
    const [localChecked, setLocalChecked] = useState(checked || false);

    // Only sync with parent value on initial mount
    if (isInitialMount.current) {
        isInitialMount.current = false;
        if (checked !== undefined && checked !== localChecked) {
            setLocalChecked(checked);
        }
    }

    const handleClick = (e) => {
        e.stopPropagation();
        const newValue = !localChecked;
        setLocalChecked(newValue);

        // Defer parent update to allow UI to paint first
        setTimeout(() => {
            if (onChange) {
                onChange(id);
            }
        }, 0);
    };

    return (
        <div
            style={{
                position: 'absolute',
                left: left,
                top: top,
                width: '18px',
                height: '18px',
                transform: 'translate(-50%, -50%)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 20,
                pointerEvents: 'auto'
            }}
            onClick={handleClick}
        >
            {localChecked && (
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
        </div>
    );
});

FastOverlayCheckbox.displayName = 'FastOverlayCheckbox';

export default FastOverlayCheckbox;
