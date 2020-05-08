const ramos = [
    {clave: '28', valor: 'Participaciones a Entidades Federativas y Municipios'},
    {clave: '33', valor: 'Aportaciones Federales para Entidades Federativas y Municipios'},
]

const generos = [
    {'clave': 'F', 'valor': 'Femenino'},
    {'clave': 'M', 'valor': 'Masculino'},
    {'clave': 'O', 'valor': 'Otro'}
];

const puestos = [
    {nombre: "Director de recursos materiales",nivel: "M33"},
    {nombre: "Jefe de departamento de recursos materiales",nivel: "L22"},
    {nombre: "Auxiliar Administrativo",nivel: "A21"}
];

const dependencias = [
    {nombre: "Secretaría Local Anticorrupción de Oaxaca",siglas: "SLAO",clave: "SLAO"},
    {nombre: "Contraloría del Estado de Oaxaca",siglas: "CNTO",clave: "CNTO"}
]

const tiposArea = [
    {'clave': 'T', 'valor': 'Técnica'},
    {'clave': 'RE', 'valor': 'Responsable de la ejecución de los trabajos'},
    {'clave': 'RC', 'valor': 'Responsable de la contratación'},
    {'clave': 'C', 'valor': 'Contratante'},
    {'clave': 'R', 'valor': 'Requirente'},
    {'clave': 'O', 'valor': 'Otra'}
];

const tiposProcedimiento = [
    {'clave': 1, 'valor': 'Contrataciones públicas'},
    {'clave': 2, 'valor': 'Concesiones, licencias, permisos, autorizaciones y prórrogas'},
    {'clave': 3, 'valor': 'Enajenación de bienes muebles'},
    {'clave': 4, 'valor': 'Asignación y emisión de dictámenes de avalúos nacionales'},

];

const nivelesResponsabilidad = [
    {'clave': 'A', 'valor': 'Atención'},
    {'clave': 'T', 'valor': 'Tramitación'},
    {'clave': 'R', 'valor': 'Resolución'}
];

module.exports = {
    ramos,
    generos,
    puestos,
    dependencias,
    tiposArea,
    tiposProcedimiento,
    nivelesResponsabilidad
}