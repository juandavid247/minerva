import React, { useState } from 'react';

const PhotoUpload = () => {
    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const containerStyle = {
        position: 'absolute',
        top: '-400px',
        left: '50%',
        transform: 'translateX(-17%)',
        width: '355px',
        height: '456px',
        border: '1px solid rgb(204 204 204 / 0%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        cursor: 'pointer',
        pointerEvents: 'auto',
        zIndex: 1000,
        backgroundColor: 'rgb(249 249 249 / 0%)',
    };

    const inputStyle = {
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 0,
        cursor: 'pointer',
        zIndex: 1001,
    };

    const placeholderStyle = {
        textAlign: 'center',
        color: '#999',
        fontSize: '12px'
    };

    return (
        <div className="photo-upload-container" style={containerStyle}>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={inputStyle}
                className="no-print"
            />
            {preview ? (
                <img
                    src={preview}
                    alt="Preview"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px' }}
                />
            ) : (
                <div style={{ textAlign: 'center', color: 'rgb(153, 153, 153)', fontSize: '12px' }}>
                    <p style={{ margin: '0px' }}></p>
                    <p style={{ margin: '0px' }}></p>
                    <p style={{ margin: '0px', fontSize: '10px' }}></p>
                </div>
            )}
        </div>
    );
};

export default PhotoUpload;
