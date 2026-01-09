const fs = require('fs');

const replacements = [
    // Page 1
    { class: "c x4c y5c w19 h10", name: "chk_si_recomienda" },
    { class: "c x4f y5d w1c h10", name: "chk_no_recomienda" },
    { class: "c x51 y5e w1d h14", name: "chk_si_parientes" },
    { class: "c x52 y5d w1e h10", name: "chk_no_parientes" },
    { class: "c x32 y67 w27 h10", name: "chk_si_trabajo_antes" },
    { class: "c x57 y67 w28 h10", name: "chk_no_trabajo_antes" },
    { class: "c x45 y68 w28 h10", name: "chk_si_solicito_antes" },
    { class: "c x54 y64 w22 h10", name: "chk_propia" },
    { class: "c x2b y64 w23 h10", name: "chk_alquilada_p1" },
    { class: "c x54 y69 w29 h18", name: "chk_agencia" },
    { class: "c x54 y6a w2a h14", name: "chk_amigo" },
    { class: "c x58 y6c w2b h1b", name: "chk_otro" },

    // Page 2
    { class: "c x3a y85 w44 h10", name: "chk_tecnico" },
    { class: "c x3a y86 w44 h10", name: "chk_tecnologo" },
    { class: "c x3b y87 w44 h10", name: "chk_profesional" },
    { class: "c x31 y8d w49 h10", name: "chk_si_idiomas" },
    { class: "c x3b y8d w49 h10", name: "chk_no_idiomas" },
    { class: "c x3c y90 w49 h10", name: "chk_si_sistemas" },
    { class: "c x42 y90 w4c h10", name: "chk_no_sistemas" },

    // Page 3
    { class: "c x39 y101 w1b h10", name: "chk_si_ingreso" },
    { class: "c x39 y101 w1c h10", name: "chk_no_ingreso" },
    { class: "c x32 y161 w1f h32", name: "chk_si_deporte" },
    { class: "c x15 y161 w1b h32", name: "chk_no_deporte" },
    { class: "c x32 y164 w1f h32", name: "chk_si_distinciones" },
    { class: "c x15 y164 w1b h32", name: "chk_no_distinciones" },
    { class: "c x32 y16b w6b h32", name: "chk_si_asociacion" },
    { class: "c x15 y16b w1b h32", name: "chk_no_asociacion" },

    // Page 4
    { class: "c xe2 y1db w8d h31", name: "chk_seleccionado_si" },
    { class: "c xe2 y1dc w8d h31", name: "chk_seleccionado_no" },
    { class: "c xec y1db w8e h31", name: "chk_elegible_si" }
];

const filePath = '/home/juanda/minerva/minerva-app/src/components/MinervaForm.jsx';
let content = fs.readFileSync(filePath, 'utf8');

let replacedCount = 0;

replacements.forEach(rep => {
    // Greedier regex to match until the SECOND closing div
    // We assume the structure is always <div class="c..."><div class="t...">...</div></div>
    const regex = new RegExp('<div className="' + rep.class + '">[\\s\\S]*?</div></div>', 'g');

    if (content.match(regex)) {
        const replacement = `<MinervaCheckbox name="${rep.name}" checked={formData.${rep.name}} onChange={handleCheckboxChange} className="${rep.class}" />`;
        content = content.replace(regex, replacement);
        console.log(`Replaced: ${rep.class} -> ${rep.name}`);
        replacedCount++;
    } else {
        // Try a non-nested version just in case
        const regexSimple = new RegExp('<div className="' + rep.class + '">[\\s\\S]*?</div>', 'g');
        if (content.match(/<MinervaCheckbox[^>]*name=\"/)) {
            // Already replaced?
        } else {
            console.log(`NOT FOUND: ${rep.class}`);
        }
    }
});

fs.writeFileSync(filePath, content);
console.log(`Total replaced: ${replacedCount}`);
