const fs = require('fs');
const path = require('path');

const targetFile = '/home/juanda/minerva/minerva-app/src/components/MinervaForm.jsx';
let content = fs.readFileSync(targetFile, 'utf8');

const mapping = {
    'field_0': 'fecha_p1_d',
    'field_1': 'fecha_p1_m',
    'field_2': 'fecha_p1_a',
    'field_3': 'empleo_solicitado',
    'field_4': 'codigo_cargo',
    'field_5': 'apellido_aspirante',
    'field_6': 'nombre_aspirante',
    'field_7': 'direccion_domicilio',
    'field_8': 'ciudad_aspirante',
    'field_9': 'telefono_aspirante',
    'field_10': 'celular_aspirante',
    'field_11': 'email_aspirante',
    'field_12': 'profesion_aspirante',
    'field_13': 'nacionalidad_aspirante',
    'field_14': 'estado_civil_aspirante',
    'field_15': 'tiempo_experiencia_laboral',
    'field_20': 'cedula_numero',
    'field_21': 'cedula_extranjeria_numero',
    'field_22': 'cedula_expedida_en',
    'field_23': 'libreta_militar_numero',
    'field_32': 'tarjeta_profesional_numero',
    'field_44': 'ciudad_mayor_parte_vida',
    'field_45': 'regiones_trabajado',
    'field_46': 'tiempo_residencia',
    'field_47': 'obligaciones_economicas_mensuales',
    'field_48': 'aspiracion_salarial'
};

const allFields = new Set();
const regex = /<input type="text" id="(field_\d+)" name="(field_\d+)" className="minerva-input" placeholder="" \/>/g;

let updatedContent = content.replace(regex, (match, id, name) => {
    const fieldName = mapping[id] || id;
    allFields.add(fieldName);
    return `<input type="text" id="${id}" name="${fieldName}" className="minerva-input" placeholder="" value={formData.${fieldName}} onChange={handleInputChange} />`;
});

// Update formData state initialization
// We need to find the start of useState and append these new keys
const stateStartRegex = /const \[formData, setFormData\] = useState\(\{/;
const lines = updatedContent.split('\n');
let stateLineIndex = -1;
for (let i = 0; i < lines.length; i++) {
    if (stateStartRegex.test(lines[i])) {
        stateLineIndex = i;
        break;
    }
}

if (stateLineIndex !== -1) {
    const newKeys = Array.from(allFields).map(f => `    ${f}: '',`).join('\n');
    lines[stateLineIndex] += '\n' + newKeys;
    updatedContent = lines.join('\n');
}

fs.writeFileSync(targetFile, updatedContent);
console.log('Successfully updated MinervaForm.jsx');
console.log('Total fields handled:', allFields.size);
