import React, { useState, useRef, useCallback } from "react";

const FastInput = React.memo(({ value, onChange, ...props }) => {
    const isInitialMount = useRef(true);
    const [localValue, setLocalValue] = useState(value || "");
    const debounceTimerRef = useRef(null);
    const lastSyncedValueRef = useRef(value || "");

    // Only sync with parent value on initial mount
    if (isInitialMount.current) {
        isInitialMount.current = false;
        if (value !== undefined && value !== localValue) {
            setLocalValue(value);
            lastSyncedValueRef.current = value;
        }
    }

    const syncToParent = useCallback((newValue) => {
        // Only sync if value actually changed
        if (newValue !== lastSyncedValueRef.current && onChange) {
            lastSyncedValueRef.current = newValue;
            // Create synthetic event
            const syntheticEvent = {
                target: {
                    name: props.name,
                    value: newValue
                }
            };
            onChange(syntheticEvent);
        }
    }, [onChange, props.name]);

    const handleChange = (e) => {
        const newValue = e.target.value;
        setLocalValue(newValue);

        // Clear existing timer
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        // Set new timer to sync after 300ms of inactivity
        debounceTimerRef.current = setTimeout(() => {
            syncToParent(newValue);
        }, 300);
    };

    const handleBlur = (e) => {
        // Clear debounce timer
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }
        // Immediately sync on blur
        syncToParent(e.target.value);
    };

    return (
        <input
            {...props}
            value={localValue}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            data-lpignore="true"
        />
    );
});

FastInput.displayName = 'FastInput';

export default FastInput;
