const fs = require('fs');
const path = require('path');

// Load current formFields.json
const formFieldsPath = path.join(__dirname, 'minerva-app/src/data/formFields.json');
const formFields = JSON.parse(fs.readFileSync(formFieldsPath, 'utf8'));

// Load Page 3 semantic mapping
const PAGE3_SEMANTIC_MAPPING = require('./page3_semantic_mapping.js');

// Apply corrections
let correctedCount = 0;

formFields.forEach(field => {
    if (PAGE3_SEMANTIC_MAPPING[field.id]) {
        field.name = PAGE3_SEMANTIC_MAPPING[field.id];
        correctedCount++;
    }
});

// Save corrected file
fs.writeFileSync(formFieldsPath, JSON.stringify(formFields, null, 2), 'utf8');

console.log('\n✅ Page 3 corrections applied successfully!');
console.log(`   Total fields corrected: ${correctedCount}`);
console.log(`\n📄 Updated file: ${formFieldsPath}`);
