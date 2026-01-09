import './App.css'
import MinervaForm from './components/MinervaForm'

function App() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="App">
      <div className="no-print control-panel" style={{ padding: '10px', background: '#333', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Minerva 1003 Generator</h1>
        <button onClick={handlePrint} style={{ padding: '8px 16px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Save as PDF / Print
        </button>
      </div>
      <div className="form-wrapper">
        <MinervaForm />
      </div>
    </div>
  )
}

export default App
