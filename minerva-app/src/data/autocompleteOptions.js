// Opciones predefinidas optimizadas para guardas de seguridad en Colombia
export const AUTOCOMPLETE_OPTIONS = {
    // Cargo solicitado
    empleo_solicitado: [
        'Guarda de Seguridad',
        'Supervisor de Seguridad',
        'Escolta',
        'Vigilante',
        'Celador',
        'Guarda de Seguridad Armado',
        'Coordinador de Seguridad'
    ],

    // Ciudades principales de Colombia
    ciudad: [
        'Bogotá',
        'Medellín',
        'Cali',
        'Barranquilla',
        'Cartagena',
        'Cúcuta',
        'Bucaramanga',
        'Pereira',
        'Santa Marta',
        'Ibagué',
        'Pasto',
        'Manizales',
        'Neiva',
        'Villavicencio',
        'Armenia'
    ],

    // Nivel educativo común en guardas
    nivel_educativo: [
        'Bachiller',
        'Técnico en Seguridad',
        'Tecnólogo en Seguridad',
        'Bachillerato Incompleto',
        'Primaria'
    ],

    // Estado civil
    estado_civil: [
        'Soltero(a)',
        'Casado(a)',
        'Unión Libre',
        'Divorciado(a)',
        'Viudo(a)'
    ],

    // Tipo de vivienda
    tipo_vivienda: [
        'Arrendada',
        'Familiar',
        'Propia'
    ],

    // Empresas de seguridad comunes en Colombia
    empresa_anterior: [
        'Seguridad Atlas',
        'Prosegur',
        'G4S',
        'Securitas',
        'Servicio de Vigilancia Ltda',
        'Cooservicios',
        'Vigilancia y Seguridad Privada',
        'Sevig Ltda'
    ],

    // Cargos anteriores
    cargo_anterior: [
        'Guarda de Seguridad',
        'Vigilante',
        'Supervisor',
        'Escolta',
        'Celador',
        'Operador de Monitoreo'
    ],

    // Cursos/certificaciones comunes
    curso_certificacion: [
        'Curso de Vigilancia y Seguridad Privada',
        'Manejo de Armas',
        'Primeros Auxilios',
        'Manejo de Extintores',
        'Defensa Personal',
        'Control de Acceso',
        'CCTV y Monitoreo'
    ],

    // Idiomas
    idioma: [
        'Español',
        'Inglés Básico',
        'Inglés Intermedio'
    ],

    // Sistemas/software
    sistemas: [
        'Microsoft Office',
        'Excel Básico',
        'Sistemas de Control de Acceso',
        'Cámaras de Seguridad'
    ],

    // Disponibilidad horaria
    disponibilidad: [
        'Tiempo Completo',
        'Turnos Rotativos',
        'Nocturno',
        'Diurno',
        'Fines de Semana'
    ],

    // Aspiración salarial (en pesos colombianos)
    aspiracion_salarial: [
        '1.300.000',
        '1.500.000',
        '1.800.000',
        '2.000.000',
        '2.500.000'
    ]
};

// Mapeo de nombres de campos a sus opciones
export const getAutocompleteOptions = (fieldName) => {
    // Mapeo directo
    if (AUTOCOMPLETE_OPTIONS[fieldName]) {
        return AUTOCOMPLETE_OPTIONS[fieldName];
    }

    // Mapeo por patrones
    if (fieldName.includes('ciudad') || fieldName.includes('lugar')) {
        return AUTOCOMPLETE_OPTIONS.ciudad;
    }
    if (fieldName.includes('empresa')) {
        return AUTOCOMPLETE_OPTIONS.empresa_anterior;
    }
    if (fieldName.includes('cargo')) {
        return AUTOCOMPLETE_OPTIONS.cargo_anterior;
    }
    if (fieldName.includes('curso') || fieldName.includes('certificacion')) {
        return AUTOCOMPLETE_OPTIONS.curso_certificacion;
    }
    if (fieldName.includes('idioma')) {
        return AUTOCOMPLETE_OPTIONS.idioma;
    }
    if (fieldName.includes('salarial') || fieldName.includes('salario')) {
        return AUTOCOMPLETE_OPTIONS.aspiracion_salarial;
    }

    return [];
};
