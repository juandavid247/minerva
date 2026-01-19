import React, { useState } from 'react';

const PhotoUpload = ({ style }) => {
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
        ...style,
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
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }}
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
