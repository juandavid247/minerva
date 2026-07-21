# Aplicación de Formulario Minerva

Esta es una aplicación web basada en React para diligenciar el formato de hoja de vida "Minerva 10-03". Proporciona una interfaz interactiva con superposiciones precisas para campos de texto, casillas de verificación y carga de firmas, coincidiendo exactamente con el diseño del formato físico estándar.

## Características

- **Diligenciamiento Digital**: Mapea con precisión los campos de entrada sobre la imagen de fondo del formato Minerva 10-03.
- **Casillas de Verificación Superpuestas**: Componentes de checkbox personalizados que se alinean perfectamente con la cuadrícula del formulario.
- **Soporte para Firmas**: Permite a los usuarios dibujar o cargar su firma con capacidades de redimensionamiento y arrastre (usando `react-rnd`).
- **Persistencia de Datos**: El estado del formulario se gestiona internamente en React.
- **Diseño Responsivo**: Utiliza un diseño basado en contenedores para mantener la relación de aspecto y la alineación correcta.

## Tecnologías

- **Framework**: [React](https://react.dev/)
- **Herramienta de Construcción**: [Vite](https://vitejs.dev/)
- **Estilos**: CSS Modules / CSS Estándar
- **Librerías**:
  - `react-rnd`: Para componentes de firma arrastrables y redimensionables.
  - `react-signature-canvas`: Para dibujar firmas.
  - `react-dropzone`: Para la carga de archivos.

## Requisitos Previos

Antes de comenzar, asegúrese de cumplir con los siguientes requisitos:

- **Node.js**: versión 18.x o superior recomendada.
- **npm**: generalmente se instala junto con Node.js.

## Instalación

1.  **Clonar el repositorio**:
    ```bash
    git clone https://github.com/juandavid247/minerva.git
    cd minerva/minerva-app
    ```

2.  **Instalar dependencias**:
    ```bash
    npm install
    # o si usa yarn
    yarn install
    ```

## Uso

1.  **Iniciar el servidor de desarrollo**:
    ```bash
    npm run dev
    ```

2.  **Abrir la aplicación**:
    Abra su navegador y navegue a `http://localhost:5173` (o el puerto que se muestre en su terminal).

3.  **Construir para producción**:
    ```bash
    npm run build
    ```
    Los archivos compilados se guardarán en el directorio `dist/`.

## Estructura del Proyecto

- `src/components/`: Contiene componentes de React como `MinervaForm`, `ImageUpload` y `OverlayCheckbox`.
- `src/data/`: Contiene archivos de mapeo de coordenadas (ej. `formCoordinates.js`) para la alineación precisa de los inputs.
- `public/`: Activos estáticos (imágenes de fondo, iconos).

## Contribución

¡Las contribuciones son siempre bienvenidas!

1.  Haga un Fork del proyecto.
2.  Cree su rama de funcionalidad (`git checkout -b feature/NuevaFuncionalidad`).
3.  Haga Commit de sus cambios (`git commit -m 'Agregar alguna NuevaFuncionalidad'`).
4.  Haga Push a la rama (`git push origin feature/NuevaFuncionalidad`).
5.  Abra un Pull Request.

## Licencia

Distribuido bajo la Licencia MIT. Consulte `LICENSE` para más información.
