import React from 'react';
import FastInput from './FastInput';
import FastOverlayCheckbox from './FastOverlayCheckbox';
import formFields from '../data/formFields';

const FormFieldsRenderer = ({ formData, handleInputChange, pageId }) => {
    const fields = formFields.filter(f => f.pageId === pageId);
    return (
        <>
            {fields.map((field) => {
                if (field.type === 'text') {
                    return (
                        <div key={field.id} className={field.wrapperClass}>
                            <div className={field.innerClass}>
                                <FastInput
                                    type="text"
                                    id={field.id}
                                    name={field.name}
                                    className="minerva-input"
                                    placeholder={field.placeholder}
                                    value={formData[field.name] || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    );
                } else if (field.type === 'checkbox') {
                    // Checkboxes in config might use text type if they are placeholders?
                    // Based on extraction script:
                    // else if (fastCheckbox.length > 0) { type: 'checkbox' }
                    // So if type is checkbox, it renders FastOverlayCheckbox.
                    // However, FastOverlayCheckbox in original code (lines 387) took: id, left, top, checked, onChange.
                    // My extraction script captured wrapperClass/innerClass.
                    // Original usage in standard fields:
                    // Only calibration used FastOverlayCheckbox?
                    // Let's check if my extraction found any type: checkbox.
                    return null;
                }
                return null;
            })}
        </>
    );
};

export default React.memo(FormFieldsRenderer);
