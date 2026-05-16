import { Receipt } from 'lucide-react';

const Header = () => {
  return (
    <header className="app-header">
      <div className="logo-brand">
        <div className="logo-icon">
          <Receipt size={24} />
        </div>
        <h1>InvoiceFlow</h1>
      </div>
    </header>
  );
};

export default Header;
