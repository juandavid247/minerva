# Minerva Form Application

This is a React-based web application for filling out the "Minerva 10-03" resume form. It provides an interactive interface with precise overlays for text inputs, checkboxes, and signature uploads, matching the layout of the standard physical form.

## Features

- **Digital Form Filling**: Accurately maps input fields to the background image of the Minerva 10-03 form.
- **Overlay Checkboxes**: Custom checkbox components that align perfectly with the form's grid.
- **Signature Support**: allowing users to draw or upload their signature with resize and drag capabilities (`react-rnd`).
- **Data Persistence**: Form state is managed in React state (implementation detail).
- **Responsive Design**: utilizing a container-based layout to maintain aspect ratio and alignment.

## Tech Stack

- **Framework**: [React](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: CSS Modules / Standard CSS
- **Libraries**:
  - `react-rnd`: For draggable/resizable signature components.
  - `react-signature-canvas`: For drawing signatures.
  - `react-dropzone`: For file uploads.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: version 18.x or higher recommended.
- **npm**: usually comes with Node.js.

## Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/juandavid247/minerva.git
    cd minerva/minerva-app
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    # or if you use yarn
    yarn install
    ```

## Usage

1.  **Start the development server**:
    ```bash
    npm run dev
    ```

2.  **Open the app**:
    Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

3.  **Build for production**:
    ```bash
    npm run build
    ```
    The build artifacts will be stored in the `dist/` directory.

## Project Structure

- `src/components/`: Contains React components like `MinervaForm`, `ImageUpload`, and `OverlayCheckbox`.
- `src/data/`: Contains coordinate mapping files (e.g., `formCoordinates.js`) for precise input alignment.
- `public/`: Static assets (background images, icons).

## Contributing

Contributions are always welcome!

1.  Fork the project.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## License

Distributed under the MIT License. See `LICENSE` for more information.
