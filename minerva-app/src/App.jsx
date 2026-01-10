import { useState } from 'react'
import './App.css'
import MinervaForm from './components/MinervaForm'

function App() {
  const [zoom, setZoom] = useState(100);
  const [isCalibrationMode, setIsCalibrationMode] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  const toggleCalibrationMode = () => {
    setIsCalibrationMode(prev => !prev);
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
          <button
            onClick={toggleCalibrationMode}
            className={`action-btn calibrate-btn ${isCalibrationMode ? 'active' : ''}`}
            title="Modo calibración"
          >
            {isCalibrationMode ? '🛑 Desactivar' : '🛠️ Calibrar'}
          </button>

          <button
            onClick={handleDownloadPDF}
            className="action-btn download-btn"
            title="Descargar PDF"
          >
            ⬇ Descargar PDF
          </button>
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
        <MinervaForm isCalibrationMode={isCalibrationMode} />
      </div>
    </div>
  )
}

export default App
