import { useState, useEffect } from 'react';

/**
 * Hook personalizado para autocompletado con historial en localStorage
 * @param {string} fieldName - Nombre del campo
 * @param {Array} predefinedOptions - Opciones predefinidas
 * @returns {Object} - { suggestions, saveSuggestion }
 */
export const useAutocomplete = (fieldName, predefinedOptions = []) => {
    const [suggestions, setSuggestions] = useState(predefinedOptions);

    useEffect(() => {
        // Cargar historial de localStorage
        const storageKey = `minerva_autocomplete_${fieldName}`;
        try {
            const history = JSON.parse(localStorage.getItem(storageKey) || '[]');

            // Combinar predefinidas + historial (sin duplicados)
            const combined = [...predefinedOptions];
            history.forEach(item => {
                if (!combined.includes(item)) {
                    combined.push(item);
                }
            });

            setSuggestions(combined);
        } catch (error) {
            console.warn('Error loading autocomplete history:', error);
            setSuggestions(predefinedOptions);
        }
    }, [fieldName, predefinedOptions]);

    const saveSuggestion = (value) => {
        if (!value || value.trim().length < 2) return;

        const storageKey = `minerva_autocomplete_${fieldName}`;
        try {
            const history = JSON.parse(localStorage.getItem(storageKey) || '[]');

            // Agregar al inicio si no existe, mantener máximo 10 items
            const updated = [
                value.trim(),
                ...history.filter(v => v !== value.trim())
            ].slice(0, 10);

            localStorage.setItem(storageKey, JSON.stringify(updated));
        } catch (error) {
            console.warn('Error saving autocomplete history:', error);
        }
    };

    return { suggestions, saveSuggestion };
};
