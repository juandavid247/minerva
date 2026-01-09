import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';

const SignaturePad = () => {
    const sigCanvas = useRef({});
    const [isEmpty, setIsEmpty] = useState(true);

    const clear = () => {
        sigCanvas.current.clear();
        setIsEmpty(true);
    };

    const onEnd = () => {
        setIsEmpty(sigCanvas.current.isEmpty());
    };

    const containerStyle = {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        borderBottom: '1px solid #000',
        backgroundColor: 'rgba(255, 255, 255, 0.1)'
    };

    return (
        <div className="signature-pad-container" style={containerStyle}>
            <SignatureCanvas
                ref={sigCanvas}
                penColor="black"
                canvasProps={{ className: 'sigCanvas', style: { width: '100%', height: '100%' } }}
                onEnd={onEnd}
            />
            {!isEmpty && (
                <button
                    onClick={clear}
                    className="no-print"
                    style={{
                        position: 'absolute',
                        bottom: '2px',
                        right: '2px',
                        fontSize: '10px',
                        padding: '2px 5px',
                        background: '#eee',
                        border: '1px solid #ccc',
                        cursor: 'pointer',
                        opacity: 0.7
                    }}
                >
                    Clear
                </button>
            )}
        </div>
    );
};

export default SignaturePad;
