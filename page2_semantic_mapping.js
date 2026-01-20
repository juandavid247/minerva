/**
 * SEMANTIC FIELD MAPPING - PAGE 2: GRUPO FAMILIAR
 * 
 * Basado en la estructura estándar del formulario Minerva 10-03
 * Total: 84 campos (field_49 a field_132)
 * 
 * Estructura típica:
 * - Sección II: Grupo Familiar
 *   - Cónyuge/Compañero(a): Nombre, Edad, Ocupación, Teléfono
 *   - Hijos (hasta 6): Nombre, Edad, Ocupación, Teléfono (cada uno)
 *   - Padre: Nombre, Edad, Ocupación, Teléfono
 *   - Madre: Nombre, Edad, Ocupación, Teléfono
 *   - Hermanos (hasta 6): Nombre, Edad, Ocupación, Teléfono (cada uno)
 */

const PAGE2_SEMANTIC_MAPPING = {
    // CÓNYUGE/COMPAÑERO(A) - Fila 1
    "field_49": "conyuge_nombre",
    "field_50": "conyuge_edad",
    "field_51": "conyuge_ocupacion",

    // HIJO 1 - Fila 2
    "field_52": "hijo_1_nombre",
    "field_53": "hijo_1_edad",
    "field_54": "hijo_1_ocupacion",
    "field_55": "hijo_1_telefono",
    "field_56": "hijo_1_vive_con_usted", // Checkbox
    "field_57": "hijo_1_depende_economicamente", // Checkbox
    "field_58": "hijo_1_observaciones",

    // HIJO 2 - Fila 3
    "field_59": "hijo_2_nombre",
    "field_60": "hijo_2_edad",
    "field_61": "hijo_2_ocupacion",
    "field_62": "hijo_2_telefono",
    "field_63": "hijo_2_vive_con_usted",
    "field_64": "hijo_2_depende_economicamente",

    // HIJO 3 - Fila 4
    "field_65": "hijo_3_nombre",
    "field_66": "hijo_3_edad",
    "field_67": "hijo_3_ocupacion",
    "field_68": "hijo_3_telefono",
    "field_69": "hijo_3_vive_con_usted",
    "field_70": "hijo_3_depende_economicamente",

    // HIJO 4 - Fila 5
    "field_71": "hijo_4_nombre",
    "field_72": "hijo_4_edad",
    "field_73": "hijo_4_ocupacion",
    "field_74": "hijo_4_telefono",
    "field_75": "hijo_4_observaciones",

    // HIJO 5 - Fila 6
    "field_76": "hijo_5_nombre",
    "field_77": "hijo_5_edad",
    "field_78": "hijo_5_ocupacion",
    "field_79": "hijo_5_telefono",
    "field_80": "hijo_5_vive_con_usted",

    // HIJO 6 - Fila 7
    "field_81": "hijo_6_nombre",
    "field_82": "hijo_6_observaciones",
    "field_83": "hijo_6_edad",
    "field_84": "hijo_6_ocupacion",

    // PADRE - Fila 8
    "field_85": "padre_nombre",
    "field_86": "padre_edad",
    "field_87": "padre_ocupacion",
    "field_88": "padre_telefono",
    "field_89": "padre_vive_con_usted",

    // MADRE - Fila 9
    "field_90": "madre_nombre",
    "field_91": "madre_edad",
    "field_92": "madre_ocupacion",
    "field_93": "madre_telefono",
    "field_94": "madre_vive_con_usted", // Nota: Este campo aparece como "chk_tecnico" en final_mapping.json - ERROR

    // HERMANO 1 - Fila 10
    "field_95": "hermano_1_nombre",
    "field_96": "hermano_1_edad",
    "field_97": "hermano_1_ocupacion",
    "field_98": "hermano_1_telefono",
    "field_99": "hermano_1_vive_con_usted",
    "field_100": "hermano_1_depende_economicamente",
    "field_101": "hermano_1_observaciones",

    // HERMANO 2 - Fila 11
    "field_102": "hermano_2_nombre",
    "field_103": "hermano_2_edad",
    "field_104": "hermano_2_ocupacion",
    "field_105": "hermano_2_telefono",

    // HERMANO 3 - Fila 12
    "field_106": "hermano_3_nombre",
    "field_107": "hermano_3_edad",
    "field_108": "hermano_3_ocupacion",
    "field_109": "hermano_3_telefono",
    "field_110": "hermano_3_vive_con_usted",
    "field_111": "hermano_3_depende_economicamente",

    // HERMANO 4 - Fila 13
    "field_112": "hermano_4_nombre",
    "field_113": "hermano_4_edad",
    "field_114": "hermano_4_ocupacion",
    "field_115": "hermano_4_telefono",
    "field_116": "hermano_4_vive_con_usted",

    // HERMANO 5 - Fila 14
    "field_117": "hermano_5_nombre",
    "field_118": "hermano_5_observaciones",
    "field_119": "hermano_5_edad",
    "field_120": "hermano_5_ocupacion",

    // HERMANO 6 - Fila 15
    "field_121": "hermano_6_nombre",
    "field_122": "hermano_6_edad",
    "field_123": "hermano_6_ocupacion",
    "field_124": "hermano_6_telefono",
    "field_125": "hermano_6_vive_con_usted",
    "field_126": "hermano_6_depende_economicamente",
    "field_127": "hermano_6_observaciones",

    // OTROS FAMILIARES / PERSONAS A CARGO - Filas 16-17
    "field_128": "otro_familiar_1_nombre",
    "field_129": "otro_familiar_1_parentesco",
    "field_130": "otro_familiar_1_edad",
    "field_131": "otro_familiar_1_ocupacion",
    "field_132": "otro_familiar_1_telefono"
};

/**
 * ERRORES DETECTADOS EN SCHEMA ACTUAL:
 * 
 * 1. field_94 está mapeado como "chk_tecnico" en final_mapping.json
 *    - DEBERÍA SER: "madre_vive_con_usted" o similar
 *    - CONTEXTO: Página 2, sección Grupo Familiar
 * 
 * 2. Campos faltantes potenciales:
 *    - ¿Existe campo para "conyuge_telefono"?
 *    - ¿Existe campo para "conyuge_vive_con_usted"?
 * 
 * 3. Campos con nombres inconsistentes:
 *    - Algunos usan "vive_con_usted", otros no
 *    - Algunos usan "depende_economicamente", otros no
 * 
 * ACCIÓN REQUERIDA:
 * - Validar contra PDF original
 * - Corregir field_94
 * - Completar campos faltantes de cónyuge
 */

module.exports = PAGE2_SEMANTIC_MAPPING;
