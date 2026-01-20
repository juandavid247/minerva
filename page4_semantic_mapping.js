/**
 * SEMANTIC FIELD MAPPING - PAGE 4: EXPERIENCIA LABORAL + PROCESO DE SELECCIÓN
 * 
 * Basado en la estructura estándar del formulario Minerva 10-03
 * Total: 43 campos (field_205 a field_247)
 * 
 * Estructura típica:
 * - Sección IV: Experiencia Laboral
 *   - Empresas anteriores (3-4 filas): Empresa, Cargo, Fecha ingreso, Fecha retiro, Motivo retiro
 * - Sección V: Referencias Laborales
 *   - Referencias (2-3): Nombre, Cargo, Empresa, Teléfono
 * - Sección VI: Proceso de Selección (Uso exclusivo empresa)
 *   - Evaluación entrevistadores
 *   - Decisión de contratación
 *   - Datos contractuales
 */

const PAGE4_SEMANTIC_MAPPING = {
    // EXPERIENCIA LABORAL - Empresa 1
    "field_205": "empresa_1_nombre",
    "field_206": "empresa_1_cargo",
    "field_207": "empresa_1_fecha_ingreso",
    "field_208": "empresa_1_fecha_retiro",
    "field_209": "empresa_1_motivo_retiro",
    "field_210": "empresa_1_jefe_inmediato",
    "field_211": "empresa_1_telefono",

    // EXPERIENCIA LABORAL - Empresa 2
    "field_212": "empresa_2_nombre",
    "field_213": "empresa_2_cargo",
    "field_214": "empresa_2_fecha_ingreso",
    "field_215": "empresa_2_fecha_retiro",
    "field_216": "empresa_2_motivo_retiro",
    "field_217": "empresa_2_jefe_inmediato",
    "field_218": "empresa_2_telefono",

    // EXPERIENCIA LABORAL - Empresa 3
    "field_219": "empresa_3_nombre",
    "field_220": "empresa_3_cargo",
    "field_221": "empresa_3_fecha_ingreso",
    "field_222": "empresa_3_fecha_retiro",
    "field_223": "empresa_3_motivo_retiro",
    "field_224": "empresa_3_jefe_inmediato",
    "field_225": "empresa_3_telefono",

    // REFERENCIAS LABORALES - Referencia 1
    "field_226": "referencia_laboral_1_nombre",
    "field_227": "referencia_laboral_1_cargo",
    "field_228": "referencia_laboral_1_empresa",
    "field_229": "referencia_laboral_1_telefono",

    // REFERENCIAS LABORALES - Referencia 2
    "field_230": "referencia_laboral_2_nombre",
    "field_231": "referencia_laboral_2_cargo",
    "field_232": "referencia_laboral_2_empresa",
    "field_233": "referencia_laboral_2_telefono",

    // PROCESO DE SELECCIÓN - Evaluación
    "field_234": "evaluacion_desempeno_cargos_anteriores",
    "field_235": "evaluacion_ajuste_perfil",
    "field_236": "evaluacion_motivos_retiro_aceptables",
    "field_237": "evaluacion_otros_aspectos",

    // PROCESO DE SELECCIÓN - Decisión
    "field_238": "primer_entrevistador_nombre",
    "field_239": "segundo_entrevistador_nombre",
    "field_240": "chk_seleccionado_si",
    "field_241": "chk_seleccionado_no",
    "field_242": "chk_elegible_si",
    "field_243": "chk_elegible_no",

    // PROCESO DE SELECCIÓN - Datos Contractuales
    "field_244": "contratacion_fecha",
    "field_245": "contratacion_cargo",
    "field_246": "contratacion_sueldo",
    "field_247": "contratacion_tipo_contrato"
};

/**
 * CAMPOS POTENCIALMENTE FALTANTES:
 * - Firma primer entrevistador (no es input de texto)
 * - Firma segundo entrevistador (no es input de texto)
 * - Firma quien autoriza contratación (no es input de texto)
 * - Referencias verificadas por (checkboxes)
 * 
 * NOTA: Las firmas son elementos gráficos (SignaturePad), no campos de texto,
 * por lo que no aparecen en formFields.json
 */

module.exports = PAGE4_SEMANTIC_MAPPING;
