/**
 * SEMANTIC FIELD MAPPING - PAGE 3: EDUCACIÓN Y APTITUDES
 * 
 * Basado en la estructura estándar del formulario Minerva 10-03
 * Total: 72 campos (field_133 a field_204)
 * 
 * Estructura típica:
 * - Sección III: Educación y Aptitudes
 *   - Estudios Primarios: Nombre institución, Título obtenido, Año
 *   - Estudios Bachillerato: Nombre institución, Título obtenido, Año
 *   - Estudios Técnicos/Tecnológicos: Nombre institución, Título obtenido, Año
 *   - Estudios Universitarios: Nombre institución, Título obtenido, Año
 *   - Estudios de Postgrado: Nombre institución, Título obtenido, Año
 *   - Cursos y Certificaciones (múltiples filas)
 *   - Conocimientos en Sistemas/Software
 *   - Idiomas (Habla, Lee, Escribe)
 *   - Estudios Actuales
 */

const PAGE3_SEMANTIC_MAPPING = {
    // ESTUDIOS PRIMARIOS
    "field_133": "primaria_institucion",
    "field_134": "primaria_titulo",
    "field_135": "primaria_año",

    // ESTUDIOS BACHILLERATO
    "field_136": "bachillerato_institucion",
    "field_137": "bachillerato_titulo",
    "field_138": "bachillerato_año",

    // ESTUDIOS TÉCNICOS/TECNOLÓGICOS
    "field_139": "tecnico_institucion",
    "field_140": "tecnico_titulo",
    "field_141": "tecnico_año",

    // ESTUDIOS UNIVERSITARIOS
    "field_142": "universitario_institucion",
    "field_143": "universitario_titulo",
    "field_144": "universitario_año",

    // ESTUDIOS DE POSTGRADO
    "field_145": "postgrado_institucion",
    "field_146": "postgrado_titulo",
    "field_147": "postgrado_año",

    // CURSOS Y CERTIFICACIONES - Fila 1
    "field_148": "curso_1_nombre",
    "field_149": "curso_1_institucion",
    "field_150": "curso_1_duracion",
    "field_151": "curso_1_año",

    // CURSOS Y CERTIFICACIONES - Fila 2
    "field_152": "curso_2_nombre",
    "field_153": "curso_2_institucion",
    "field_154": "curso_2_duracion",
    "field_155": "curso_2_año",

    // CURSOS Y CERTIFICACIONES - Fila 3
    "field_156": "curso_3_nombre",
    "field_157": "curso_3_institucion",
    "field_158": "curso_3_duracion",
    "field_159": "curso_3_año",

    // CURSOS Y CERTIFICACIONES - Fila 4
    "field_160": "curso_4_nombre",
    "field_161": "curso_4_institucion",
    "field_162": "curso_4_duracion",
    "field_163": "curso_4_año",

    // CURSOS Y CERTIFICACIONES - Fila 5
    "field_164": "curso_5_nombre",
    "field_165": "curso_5_institucion",
    "field_166": "curso_5_duracion",
    "field_167": "curso_5_año",

    // CONOCIMIENTOS EN SISTEMAS/SOFTWARE - Fila 1
    "field_168": "sistema_1_nombre",
    "field_169": "sistema_1_nivel", // Básico/Intermedio/Avanzado

    // CONOCIMIENTOS EN SISTEMAS/SOFTWARE - Fila 2
    "field_170": "sistema_2_nombre",
    "field_171": "sistema_2_nivel",

    // CONOCIMIENTOS EN SISTEMAS/SOFTWARE - Fila 3
    "field_172": "sistema_3_nombre",
    "field_173": "sistema_3_nivel",

    // CONOCIMIENTOS EN SISTEMAS/SOFTWARE - Fila 4
    "field_174": "sistema_4_nombre",
    "field_175": "sistema_4_nivel",

    // IDIOMAS - Idioma 1
    "field_176": "idioma_1_nombre",
    "field_177": "idioma_1_habla", // Checkbox o nivel
    "field_178": "idioma_1_lee",
    "field_179": "idioma_1_escribe",

    // IDIOMAS - Idioma 2
    "field_180": "idioma_2_nombre",
    "field_181": "idioma_2_habla",
    "field_182": "idioma_2_lee",
    "field_183": "idioma_2_escribe",

    // IDIOMAS - Idioma 3
    "field_184": "idioma_3_nombre",
    "field_185": "idioma_3_habla",
    "field_186": "idioma_3_lee",
    "field_187": "idioma_3_escribe",

    // ESTUDIOS ACTUALES
    "field_188": "estudios_actuales_si_no", // Checkbox
    "field_189": "estudios_actuales_institucion",
    "field_190": "estudios_actuales_programa",
    "field_191": "estudios_actuales_horario",

    // OTRAS APTITUDES / HABILIDADES
    "field_192": "aptitud_1",
    "field_193": "aptitud_2",
    "field_194": "aptitud_3",
    "field_195": "aptitud_4",
    "field_196": "aptitud_5",

    // REFERENCIAS PERSONALES - Referencia 1
    "field_197": "referencia_personal_1_nombre",
    "field_198": "referencia_personal_1_ocupacion",
    "field_199": "referencia_personal_1_telefono",

    // REFERENCIAS PERSONALES - Referencia 2
    "field_200": "referencia_personal_2_nombre",
    "field_201": "referencia_personal_2_ocupacion",
    "field_202": "referencia_personal_2_telefono",

    // CAMPOS ADICIONALES (si existen)
    "field_203": "observaciones_educacion",
    "field_204": "campo_adicional_educacion"
};

/**
 * NOTAS:
 * - Este mapeo es una aproximación basada en la estructura típica del Minerva 10-03
 * - Requiere validación contra el PDF original para confirmar exactitud
 * - Algunos campos pueden variar según la versión del formulario
 * 
 * VALIDACIÓN PENDIENTE:
 * - Confirmar número exacto de filas para cursos (estimado: 5)
 * - Confirmar número exacto de idiomas (estimado: 3)
 * - Verificar si existen campos de referencias personales en esta página
 */

module.exports = PAGE3_SEMANTIC_MAPPING;
