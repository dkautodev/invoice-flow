import { Download, Receipt } from 'lucide-react';

const Header = ({ onDownload, invoiceNumber }) => {
  return (
    <header className="app-header">
      <div className="logo-brand">
        <div className="logo-icon">
          <Receipt size={24} />
        </div>
        <h1>InvoiceFlow</h1>
      </div>
      <button 
        className="btn btn-primary"
        onClick={() => onDownload(`Facture-${invoiceNumber || '001'}.pdf`)}
      >
        <Download size={20} />
        Générer la facture
      </button>
    </header>
  );
};

export default Header;
