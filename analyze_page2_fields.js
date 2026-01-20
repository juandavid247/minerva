const fs = require('fs');
const cheerio = require('./minerva-app/node_modules/cheerio');

const htmlPath = './minerva (1).html';
const html = fs.readFileSync(htmlPath, 'utf8');
const $ = cheerio.load(html);

// Find Page 2 (pf2)
const page2 = $('#pf2');

if (!page2.length) {
    console.error('Page 2 not found');
    process.exit(1);
}

// Extract all text labels (not "test" placeholders)
const labels = [];
page2.find('.t').each((i, el) => {
    const text = $(el).text().trim();
    if (text && text !== 'test') {
        const classes = $(el).attr('class');
        const yClass = classes.match(/y[0-9a-f]+/)?.[0];
        labels.push({
            text,
            yClass,
            classes
        });
    }
});

// Extract all "test" fields (input placeholders)
const fields = [];
page2.find('.t').each((i, el) => {
    const text = $(el).text().trim();
    if (text === 'test') {
        const parent = $(el).parent();
        const wrapperClass = parent.attr('class');
        const innerClass = $(el).attr('class');
        const yClass = innerClass.match(/y[0-9a-f]+/)?.[0];

        fields.push({
            wrapperClass,
            innerClass,
            yClass
        });
    }
});

console.log('=== LABELS (Page 2) ===');
labels.forEach((label, i) => {
    console.log(`${i}: [${label.yClass}] ${label.text}`);
});

console.log('\n=== FIELDS (Page 2) ===');
console.log(`Total fields: ${fields.length}`);

// Try to match fields with nearby labels
const mapping = [];
fields.forEach((field, i) => {
    // Find labels with similar Y position
    const nearbyLabels = labels.filter(l => l.yClass === field.yClass);

    mapping.push({
        fieldIndex: i,
        fieldId: `field_${49 + i}`, // Starting from field_49
        yClass: field.yClass,
        wrapperClass: field.wrapperClass,
        nearbyLabels: nearbyLabels.map(l => l.text)
    });
});

console.log('\n=== FIELD MAPPING ===');
mapping.forEach(m => {
    console.log(`${m.fieldId}: ${m.nearbyLabels.join(' | ')}`);
});

// Save to JSON
fs.writeFileSync('./page2_field_mapping.json', JSON.stringify(mapping, null, 2));
console.log('\n✅ Saved to page2_field_mapping.json');
