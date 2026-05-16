import { useState, useEffect } from 'react';
import { calculateDueDate, calculateTotals } from './utils/calculations';
import { generatePDF } from './utils/pdfGenerator';
import { Download } from 'lucide-react';
import Header from './components/Header';
import InvoiceEditor from './components/InvoiceEditor';
import InvoicePreview from './components/InvoicePreview';

const INITIAL_STATE = {
  issuer: {
    company: "",
    name: "",
    address: "",
    zip: "",
    city: "",
    country: "France",
    siret: "",
    tvaNumber: ""
  },
  client: {
    name: "",
    address: ""
  },
  invoice: {
    number: "",
    date: new Date().toISOString().split("T")[0],
    dueTerm: "0",
    tvaRate: "0"
  },
  items: [
    { id: 1, label: "", details: "", quantity: 1, price: 0 }
  ],
  bank: {
    beneficiary: "",
    iban: "",
    bic: ""
  },
  legal: ""
};

function App() {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('invoice_data');
    return saved ? JSON.parse(saved) : INITIAL_STATE;
  });
  const [previewScale, setPreviewScale] = useState(1);

  useEffect(() => {
    localStorage.setItem('invoice_data', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    const updateScale = () => {
      const container = document.querySelector('.preview-container');
      if (container) {
        const width = container.offsetWidth;
        const scale = width / 880; 
        setPreviewScale(Math.min(scale, 1));
      }
    };
    window.addEventListener('resize', updateScale);
    updateScale();
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const handleIssuerChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, issuer: { ...prev.issuer, [name]: value } }));
  };

  const handleClientChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, client: { ...prev.client, [name]: value } }));
  };

  const handleInvoiceChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, invoice: { ...prev.invoice, [name]: value } }));
  };

  const handleBankChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, bank: { ...prev.bank, [name]: value } }));
  };

  const addItem = () => {
    setData(prev => ({
      ...prev,
      items: [...prev.items, { id: Date.now(), label: "", details: "", quantity: 1, price: 0 }]
    }));
  };

  const removeItem = (id) => {
    if (data.items.length === 1) return;
    setData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
  };

  const handleItemChange = (id, field, value) => {
    setData(prev => ({
      ...prev,
      items: prev.items.map(item => item.id === id ? { ...item, [field]: value } : item)
    }));
  };

  const totals = calculateTotals(data.items, data.invoice.tvaRate);
  const dueDate = calculateDueDate(data.invoice.date, data.invoice.dueTerm);
  const isTvaZero = parseFloat(data.invoice.tvaRate) === 0;

  return (
    <div className="container">
      <Header />

      <main className="main-layout">
        <div className="editor-side">
          <InvoiceEditor 
            data={data}
            onIssuerChange={handleIssuerChange}
            onClientChange={handleClientChange}
            onInvoiceChange={handleInvoiceChange}
            onBankChange={handleBankChange}
            onAddItem={addItem}
            onRemoveItem={removeItem}
            onItemChange={handleItemChange}
            isTvaZero={isTvaZero}
          />
          <button 
            className="btn btn-primary full-width"
            style={{ marginTop: '2rem', height: '60px', fontSize: '1.1rem' }}
            onClick={() => generatePDF(`Facture-${data.invoice.number || '001'}.pdf`)}
          >
            <Download size={24} />
            Générer la facture
          </button>
        </div>

        <InvoicePreview 
          data={data}
          totals={totals}
          dueDate={dueDate}
          scale={previewScale}
        />
      </main>
    </div>
  );
}

export default App;
