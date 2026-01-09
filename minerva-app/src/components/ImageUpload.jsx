import React, { useState } from 'react';
import { Rnd } from 'react-rnd';

const ImageUpload = ({ style, className, borderRadius = "0px" }) => {
    const [preview, setPreview] = useState(null);
    const [isUploaded, setIsUploaded] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
                setIsUploaded(true);
            };
            reader.readAsDataURL(file);
        }
    };

    if (!isUploaded) {
        return (
            <div
                className={`image-upload-wrapper ${className || ''}`}
                style={{
                    ...style,
                    position: 'absolute',
                    pointerEvents: 'auto',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: 'rgba(52, 152, 219, 0.05)',
                    border: '1px dashed #3498db',
                    borderRadius: '4px',
                }}
            >
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        opacity: 0,
                        cursor: 'pointer',
                        zIndex: 1001,
                    }}
                    className="no-print"
                />
                <div style={{ textAlign: 'center', color: '#3498db', fontSize: '10px', fontWeight: 'bold' }}>
                    <span style={{ fontSize: '14px', display: 'block' }}>✍️</span>
                    <span>Click para subir firma</span>
                </div>
            </div>
        );
    }

    // Wrap Rnd in a container that matches the initial 'style' exactly.
    // This solves the "appears just where we want it" issue by anchoring it.
    return (
        <div style={{ ...style, position: 'absolute', pointerEvents: 'auto' }}>
            <Rnd
                default={{
                    x: 0,
                    y: 0,
                    width: '100%',
                    height: '100%',
                }}
                style={{
                    zIndex: 2000,
                    border: '1px solid rgba(52, 152, 219, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                bounds="window"
                enableResizing={{
                    top: true, right: true, bottom: true, left: true,
                    topRight: true, bottomRight: true, bottomLeft: true, topLeft: true
                }}
                className="signature-rnd-container"
            >
                <img
                    src={preview}
                    alt="Signature Preview"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        borderRadius,
                        pointerEvents: 'none'
                    }}
                />
                <div className="resize-handle top-left"></div>
                <div className="resize-handle top-right"></div>
                <div className="resize-handle bottom-left"></div>
                <div className="resize-handle bottom-right"></div>
                <style>
                    {`
                        .signature-rnd-container:hover {
                            border: 1px solid #3498db !important;
                            background: rgba(52, 152, 219, 0.05);
                        }
                        .resize-handle {
                            position: absolute;
                            width: 8px;
                            height: 8px;
                            background: #3498db;
                            border-radius: 50%;
                            display: none;
                        }
                        .signature-rnd-container:hover .resize-handle {
                            display: block;
                        }
                        .top-left { top: -4px; left: -4px; cursor: nwse-resize; }
                        .top-right { top: -4px; right: -4px; cursor: nesw-resize; }
                        .bottom-left { bottom: -4px; left: -4px; cursor: nesw-resize; }
                        .bottom-right { bottom: -4px; right: -4px; cursor: nwse-resize; }
                        
                        @media print {
                            .signature-rnd-container { border: none !important; background: transparent !important; }
                            .resize-handle { display: none !important; }
                        }
                    `}
                </style>
            </Rnd>
        </div>
    );
};

export default ImageUpload;
