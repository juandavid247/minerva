import React, { useState, useRef, useCallback, useMemo } from "react";
import { useAutocomplete } from "../hooks/useAutocomplete";
import { getAutocompleteOptions } from "../data/autocompleteOptions";

const FastInput = React.memo(({ value, onChange, name, ...props }) => {
    const [localValue, setLocalValue] = useState(value || "");
    const debounceTimerRef = useRef(null);
    const lastSyncedValueRef = useRef(value || "");

    // Autocomplete - memoize to prevent infinite loop
    const predefinedOptions = useMemo(() => getAutocompleteOptions(name), [name]);
    const { suggestions, saveSuggestion } = useAutocomplete(name, predefinedOptions);

    const syncToParent = useCallback((newValue) => {
        // Only sync if value actually changed
        if (newValue !== lastSyncedValueRef.current && onChange) {
            lastSyncedValueRef.current = newValue;
            // Create synthetic event
            const syntheticEvent = {
                target: {
                    name: props.name || name,
                    value: newValue
                }
            };
            onChange(syntheticEvent);
        }
    }, [onChange, props.name, name]);

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
        const finalValue = e.target.value;
        syncToParent(finalValue);

        // Save to autocomplete history
        saveSuggestion(finalValue);
    };

    return (
        <>
            <input
                {...props}
                name={name}
                value={localValue}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                data-lpignore="true"
                list={suggestions.length > 0 ? `autocomplete-${name}` : undefined}
            />
            {suggestions.length > 0 && (
                <datalist id={`autocomplete-${name}`}>
                    {suggestions.map((suggestion, index) => (
                        <option key={index} value={suggestion} />
                    ))}
                </datalist>
            )}
        </>
    );
});

FastInput.displayName = 'FastInput';

export default FastInput;
