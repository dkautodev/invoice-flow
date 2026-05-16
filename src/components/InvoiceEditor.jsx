import { 
  Plus, Trash2, 
  Building2, User, Hash, ShoppingCart, CreditCard 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const InvoiceEditor = ({ 
  data, 
  onIssuerChange, 
  onClientChange, 
  onInvoiceChange, 
  onBankChange, 
  onAddItem,
  onRemoveItem,
  onItemChange,
  isTvaZero
}) => {
  return (
    <div className="editor-section">
      {/* Issuer Info Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card">
        <h3 className="section-title"><Building2 size={20} /> Vos Informations</h3>
        <div className="form-grid">
          <div className="form-group full-width">
            <label>Nom de l'entreprise</label>
            <input name="company" value={data.issuer.company} onChange={onIssuerChange} placeholder="Ex: Ma Société SAS" />
          </div>
          <div className="form-group">
            <label>Nom & Prénom</label>
            <input name="name" value={data.issuer.name} onChange={onIssuerChange} placeholder="Jean Dupont" />
          </div>
          <div className="form-group">
            <label>SIRET</label>
            <input name="siret" value={data.issuer.siret} onChange={onIssuerChange} placeholder="123 456 789 00012" />
          </div>
          <div className="form-group full-width">
            <label>Adresse complète</label>
            <input name="address" value={data.issuer.address} onChange={onIssuerChange} placeholder="123 Rue de la Paix" />
          </div>
          <div className="form-group">
            <label>Code Postal</label>
            <input name="zip" value={data.issuer.zip} onChange={onIssuerChange} placeholder="75000" />
          </div>
          <div className="form-group">
            <label>Ville</label>
            <input name="city" value={data.issuer.city} onChange={onIssuerChange} placeholder="Paris" />
          </div>
        </div>
      </motion.div>

      {/* Client & Invoice Details Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card">
        <h3 className="section-title"><User size={20} /> Informations Client</h3>
        <div className="form-grid">
          <div className="form-group full-width">
            <label>Nom du Client</label>
            <input name="name" value={data.client.name} onChange={onClientChange} placeholder="Client SARL" />
          </div>
          <div className="form-group full-width">
            <label>Adresse du Client</label>
            <textarea name="address" value={data.client.address} onChange={onClientChange} rows="2" placeholder="Adresse complète du destinataire" />
          </div>
        </div>

        <h3 className="section-title" style={{ marginTop: '2.5rem' }}><Hash size={20} /> Paramètres Facture</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Numéro de Facture</label>
            <input name="number" value={data.invoice.number} onChange={onInvoiceChange} placeholder="FAC-2024-001" />
          </div>
          <div className="form-group">
            <label>Date d'émission</label>
            <input type="date" name="date" value={data.invoice.date} onChange={onInvoiceChange} />
          </div>
          <div className="form-group">
            <label>Condition de Paiement</label>
            <select name="dueTerm" value={data.invoice.dueTerm} onChange={onInvoiceChange}>
              <option value="0">Immédiat</option>
              <option value="7">Sous 7 jours</option>
              <option value="15">Sous 15 jours</option>
              <option value="30">Sous 30 jours</option>
            </select>
          </div>
          <div className="form-group">
            <label>Taux de TVA (%)</label>
            <input type="number" name="tvaRate" value={data.invoice.tvaRate} onChange={onInvoiceChange} />
            {isTvaZero && <span className="tva-mention-badge">Mention auto activée</span>}
          </div>
        </div>
      </motion.div>

      {/* Line Items Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card">
        <h3 className="section-title"><ShoppingCart size={20} /> Prestations & Produits</h3>
        <div className="line-items">
          <AnimatePresence>
            {data.items.map((item) => (
              <motion.div 
                key={item.id} 
                className="line-item-row"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div className="form-group">
                  <label>Désignation</label>
                  <input 
                    placeholder="Ex: Conseil stratégique" 
                    value={item.label} 
                    onChange={(e) => onItemChange(item.id, 'label', e.target.value)} 
                  />
                </div>
                <div className="form-group">
                  <label>Qté</label>
                  <input 
                    type="number" 
                    value={item.quantity} 
                    onChange={(e) => onItemChange(item.id, 'quantity', e.target.value)} 
                  />
                </div>
                <div className="form-group">
                  <label>Prix Unitaire</label>
                  <input 
                    type="number" 
                    value={item.price} 
                    onChange={(e) => onItemChange(item.id, 'price', e.target.value)} 
                  />
                </div>
                <button className="btn btn-danger-icon" onClick={() => onRemoveItem(item.id)}>
                  <Trash2 size={18} />
                </button>
                <textarea 
                  className="item-details-input full-width"
                  rows="2"
                  placeholder="Description détaillée..." 
                  value={item.details} 
                  onChange={(e) => onItemChange(item.id, 'details', e.target.value)} 
                />
              </motion.div>
            ))}
          </AnimatePresence>
          <button className="btn btn-secondary full-width" onClick={onAddItem}>
            <Plus size={18} /> Ajouter une prestation
          </button>
        </div>
      </motion.div>

      {/* Bank Info Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="card">
        <h3 className="section-title"><CreditCard size={20} /> Coordonnées Bancaires</h3>
        <div className="form-grid">
          <div className="form-group full-width">
            <label>Nom du Bénéficiaire</label>
            <input name="beneficiary" value={data.bank.beneficiary} onChange={onBankChange} placeholder="Ex: Jean Dupont" />
          </div>
          <div className="form-group">
            <label>IBAN</label>
            <input name="iban" value={data.bank.iban} onChange={onBankChange} placeholder="FR76 ..." />
          </div>
          <div className="form-group">
            <label>BIC</label>
            <input name="bic" value={data.bank.bic} onChange={onBankChange} placeholder="BCDEFR2X" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InvoiceEditor;
