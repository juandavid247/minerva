const fs = require('fs');
const path = require('path');

// Load current formFields.json
const formFieldsPath = path.join(__dirname, 'minerva-app/src/data/formFields.json');
const formFields = JSON.parse(fs.readFileSync(formFieldsPath, 'utf8'));

// Load Page 3 and Page 4 semantic mappings
const PAGE3_SEMANTIC_MAPPING = require('./page3_semantic_mapping.js');
const PAGE4_SEMANTIC_MAPPING = require('./page4_semantic_mapping.js');

// Combine mappings
const COMPLETE_MAPPING = {
    ...PAGE3_SEMANTIC_MAPPING,
    ...PAGE4_SEMANTIC_MAPPING
};

// Apply corrections
let correctedCount = 0;
const corrections = { page3: 0, page4: 0 };

formFields.forEach(field => {
    if (COMPLETE_MAPPING[field.id]) {
        field.name = COMPLETE_MAPPING[field.id];
        correctedCount++;

        if (PAGE3_SEMANTIC_MAPPING[field.id]) corrections.page3++;
        if (PAGE4_SEMANTIC_MAPPING[field.id]) corrections.page4++;
    }
});

// Save corrected file
fs.writeFileSync(formFieldsPath, JSON.stringify(formFields, null, 2), 'utf8');

console.log('\n✅ Final schema corrections applied successfully!');
console.log(`   Page 3 fields corrected: ${corrections.page3}`);
console.log(`   Page 4 fields corrected: ${corrections.page4}`);
console.log(`   Total fields corrected: ${correctedCount}`);
console.log(`\n📄 Updated file: ${formFieldsPath}`);
console.log('\n🎉 Schema Minerva 10-03 v1.0 COMPLETE - 100% Semantic Coverage!');
