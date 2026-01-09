import React from 'react';

/**
 * MinervaCheckbox - A custom checkbox component designed to fit into the 
 * pdf2htmlEX-generated layout while providing interactivity.
 * 
 * @param {Object} props
 * @param {string} props.name - The name of the field in the form state.
 * @param {boolean} props.checked - Whether the checkbox is checked.
 * @param {function} props.onChange - Handler for toggle events.
 * @param {string} props.className - Original layout classes from the PDF template.
 * @param {string} props.label - Optional label text (usually "Si", "No", or specific choices).
 */
const MinervaCheckbox = ({ name, checked, onChange, className, label }) => {
    return (
        <div
            className={`minerva-checkbox-wrapper ${className} ${checked ? 'checked' : ''}`}
            onClick={() => onChange(name, !checked)}
            style={{ cursor: 'pointer' }}
        >
            {label && <span className="minerva-checkbox-label">{label}</span>}
        </div>
    );
};

export default MinervaCheckbox;
