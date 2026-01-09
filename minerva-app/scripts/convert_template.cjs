const fs = require('fs');
const cheerio = require('cheerio');
const path = require('path');

const htmlPath = path.join(__dirname, '../../minerva (1).html');
const cssPath = path.join(__dirname, '../src/components/MinervaForm.css');
const jsxPath = path.join(__dirname, '../src/components/MinervaForm.jsx');

console.log('Reading HTML file...');
const html = fs.readFileSync(htmlPath, 'utf8');
const $ = cheerio.load(html);

console.log('Extracting CSS...');
let cssContent = '';
$('style').each((i, el) => {
    cssContent += $(el).html() + '\n';
});

fs.writeFileSync(cssPath, cssContent);
console.log(`CSS written to ${cssPath}`);

console.log('Processing HTML body...');
const container = $('#page-container');

if (container.length === 0) {
    console.error('Error: #page-container not found in HTML.');
    process.exit(1);
}

console.log('Traversing DOM for replacements (Inputs, Photo, Signature)...');
let inputCount = 0;
let photoReplaced = false;
let signatureReplaced = false;
let elementCount = 0;

// Single pass to avoid DOM state issues
$('*').each((i, el) => {
    elementCount++;
    if (el.tagName === 'script' || el.tagName === 'style' || el.tagName === 'body' || el.tagName === 'head' || el.tagName === 'html') return;
    if ($(el).attr('id') === 'page-container') return;

    // We need to check conditions carefully
    const text = $(el).text();
    const trimmedText = text.trim();
    const hasChildren = $(el).children().length > 0;

    // 1. INPUTS: Leaf node with exact text "test"
    if (!hasChildren && trimmedText === 'test') {
        const inputId = `field_${inputCount++}`;
        $(el).html(`<input type="text" id="${inputId}" name="${inputId}" class="minerva-input" placeholder="" />`);
        return; // Done with this element
    }

    // 2. PHOTO: Leaf node (or close) contains "Clic aquí"
    // To avoid replacing parents, we only replace if no children OR specific case
    if (!hasChildren && text.includes('Clic aquí para cargar')) {
        // Use a placeholder string that won't be messed up by cheerio's HTML parsing/serialization
        $(el).text('__PHOTO_UPLOAD_COMPONENT__');
        photoReplaced = true;
        return;
    }

    // 3. SIGNATURE
    // We want to avoid matching the whole page.
    // We check text length to avoid huge blocks?
    // Or just reliance on not being page-container (already filtered).
    // Safe to replace specific line div.
    if (text.includes('Firma de quien') && text.includes('autoriza')) {
        // Avoid replacing parents that contain this text too large (e.g. column wrappers)
        // Heuristic: check if text length is reasonable (e.g. < 500 chars)
        if (text.length > 500) return;

        console.log(`FOUND Signature Label: "${text.substring(0, 50)}..."`);

        const padPlaceholder = '__SIGNATURE_PAD_COMPONENT__';

        // Avoid double injection
        if (!$(el).text().includes(padPlaceholder)) {
            // Prepend placeholder text
            const currentText = $(el).text();
            $(el).text(padPlaceholder + currentText);
            signatureReplaced = true;
            console.log('Injected SignaturePad placeholder.');
        }
    }
});

console.log(`Traversed ${elementCount} elements.`);
console.log(`Replaced ${inputCount} input fields.`);
if (!photoReplaced) console.log('Warning: Photo placeholder not found.');
if (!signatureReplaced) console.log('Warning: Signature label not found.');

// Add signature overlay style
cssContent += `
.signature-overlay {
    position: absolute;
    width: 300px;
    height: 80px;
    transform: translate(450px, -60px);
    z-index: 10;
}
`;
// Update CSS file with new content (overwrite previous write if needed, or just append now)
// We already wrote cssContent at the start. Let's rewrite it or append.
fs.writeFileSync(cssPath, cssContent);
console.log(`CSS updated with signature styles.`);

// 4. Generate JSX
console.log('Generating JSX...');
// Use original container reference which should track updates
let jsxContent = container.html();

if (!jsxContent) {
    console.error('Error: jsxContent is null. Dump of root HTML:');
    console.error($.root().html().substring(0, 500));
    process.exit(1);
}

// REPLACE PLACEHOLDERS with actual JSX

// REPLACE PLACEHOLDERS with actual JSX
jsxContent = jsxContent.replace(/__PHOTO_UPLOAD_COMPONENT__/g, '<PhotoUpload />');
jsxContent = jsxContent.replace(/__SIGNATURE_PAD_COMPONENT__/g, '<div className="signature-overlay"><SignaturePad /></div>');

// Fix class -> className
jsxContent = jsxContent.replace(/\sclass="/g, ' className="');

// Fix self-closing tags for React
jsxContent = jsxContent.replace(/<img([^>]*)>/g, '<img$1 />');
jsxContent = jsxContent.replace(/<input([^>]*)>/g, '<input$1 />');
jsxContent = jsxContent.replace(/<br([^>]*)>/g, '<br$1 />');

// Remove comments
jsxContent = jsxContent.replace(/<!--[\s\S]*?-->/g, '');

// Fix style attributes (if any remain) - cheerio keeps them as strings "width:..."
// React needs object. But since we are injecting HTML string via parsing?
// Wait, we are generating code.
// The HTML string: `<div class="..." style="width: 10px;">`
// We need to convert style string to object?
// Actually, `pdf2htmlEX` usually uses classes for everything.
// My injected styles for SignaturePad are inline strings.
// `style="position: absolute..."` -> needs to be `style={{position: 'absolute'...}}` for JSX?
// YES. `jsxContent` is currently HTML string.
// If I save this as `.jsx`, `<div style="color: red">` is invalid in React.
// I must convert inline styles to objects or avoid them.
// I used inline style for `SignaturePad` container in my `padHtml`.
// I should use a class for the signature container instead, to avoid parsing complexity!

// FIX: Regex to convert style="..." is hard.
// BETTER: Add a CSS class for signature container in the .css file (or append to it) and use className.
// But I need to write to CSS file again or just rely on App.css?
// I can add it to `MinervaForm.css` via `fs.appendFileSync`.

const componentCode = `
import React from 'react';
import './MinervaForm.css';
import PhotoUpload from './PhotoUpload';
import SignaturePad from './SignaturePad';

const MinervaForm = () => {
  return (
    <div className="minerva-form-container">
        <div id="page-container">
        ${jsxContent}
        </div>
    </div>
  );
};

export default MinervaForm;
`;

// Helper to fix style prop if I can't avoid it? 
// Actually, let's fix the pad injection to use a class 'signature-overlay'.
// Then append that class to css.

// Re-write the Pad Injection to use class
// See below in execution...

fs.writeFileSync(jsxPath, componentCode);
console.log(`JSX component written to ${jsxPath}`);
