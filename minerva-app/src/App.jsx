import { useState, useRef } from 'react'
import './App.css'
import MinervaForm from './components/MinervaForm'
import pdfIcon from './assets/pdf-icon.png'

function App() {
  const [zoom, setZoom] = useState(100);
  const [isCalibrationMode, setIsCalibrationMode] = useState(false);
  const formRef = useRef(null);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  const toggleCalibrationMode = () => {
    setIsCalibrationMode(prev => !prev);
  };

  const handleSubmit = () => {
    if (formRef.current && formRef.current.getFormData) {
      const formData = formRef.current.getFormData();
      console.log('📋 Form Data:', JSON.stringify(formData, null, 2));
      alert('✅ Datos del formulario exportados a la consola. Presiona F12 para ver el JSON completo.');
    }
  };

  const increaseZoom = () => {
    setZoom(prev => Math.min(prev + 25, 300)); // Max 300%
  };

  const decreaseZoom = () => {
    setZoom(prev => Math.max(prev - 25, 50)); // Min 50%
  };

  return (
    <div className="App">
      {/* Control Panel */}
      <div className="control-panel no-print">
        {/* Action Buttons - Left Side */}
        <div className="action-buttons left-controls">
          {/* <button
            onClick={toggleCalibrationMode}
            className={`action-btn calibrate-btn ${isCalibrationMode ? 'active' : ''}`}
            title="Modo calibración"
          >
            {isCalibrationMode ? '🛑 Desactivar' : '🛠️ Calibrar'}
          </button> */}

          <button
            onClick={handleDownloadPDF}
            className="action-btn download-btn"
            title="Descargar PDF"
          >
            <img src={pdfIcon} alt="Descargar PDF" style={{ width: '24px', height: '24px' }} />
            Descargar
          </button>

          {/* <button
            onClick={handleSubmit}
            className="action-btn submit-btn"
            title="Enviar formulario"
          >
            📤 Enviar
          </button> */}
        </div>

        {/* Zoom Controls - Right Side */}
        <div className="zoom-controls">
          <button
            onClick={decreaseZoom}
            className="zoom-btn"
            title="Disminuir zoom"
          >
            −
          </button>
          <span className="zoom-level">{zoom}%</span>
          <button
            onClick={increaseZoom}
            className="zoom-btn"
            title="Aumentar zoom"
          >
            +
          </button>
        </div>
      </div>

      {/* Form Container with Zoom */}
      <div
        className="form-container"
        style={{ transform: `scale(${zoom / 100})` }}
      >
        <MinervaForm ref={formRef} isCalibrationMode={isCalibrationMode} />
      </div>
    </div>
  )
}

export default App
