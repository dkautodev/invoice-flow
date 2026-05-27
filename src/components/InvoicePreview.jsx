import { formatCurrency } from '../utils/calculations';

const InvoicePreview = ({ data, totals, dueDate, scale }) => {
  const isTvaZero = parseFloat(data.invoice.tvaRate) === 0;

  return (
    <div className="preview-container">
      <div id="invoice-capture" className="invoice-preview" style={{ transform: `scale(${scale})` }}>
        <div className="preview-header">
          <div className="issuer-details">
            <div className="issuer-name">{data.issuer.company || data.issuer.name || 'VOTRE ENTREPRISE'}</div>
            <div className="issuer-address">
              <div>{data.issuer.name}</div>
              <div>{data.issuer.address}</div>
              <div>{data.issuer.zip} {data.issuer.city}</div>
              <div>{data.issuer.country}</div>
              {data.issuer.siret && <div className="issuer-siret">SIRET : {data.issuer.siret}</div>}
            </div>
          </div>

          <div className="invoice-meta">
            <div className="meta-box">
              <div className="meta-label">{data.invoice.type === 'quote' ? 'Devis' : 'Facture'}</div>
              <div className="meta-value">{data.invoice.number || '---'}</div>
            </div>
            <div className="meta-dates">
              <div className="date-row">
                <span className="label">Date :</span>
                <span className="value">{new Date(data.invoice.date).toLocaleDateString('fr-FR')}</span>
              </div>
              <div className="date-row">
                <span className="label">{data.invoice.type === 'quote' ? 'Validité :' : 'Échéance :'}</span>
                <span className="value">{new Date(dueDate).toLocaleDateString('fr-FR')}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="preview-body">
          <div className="billing-to">
            <div className="meta-label">{data.invoice.type === 'quote' ? 'Devis pour :' : 'Facturé à :'}</div>
            <div className="client-name">{data.client.name || '---'}</div>
            <div className="client-address">{data.client.address || '---'}</div>
          </div>

          <table className="preview-table">
            <thead>
              <tr>
                <th>Description</th>
                <th className="text-center">Qté</th>
                <th className="text-right">P.U HT</th>
                <th className="text-right">Total HT</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map(item => (
                <tr key={item.id}>
                  <td className="item-description">
                    <div className="item-label">{item.label || 'Sans titre'}</div>
                    <div className="item-details">{item.details}</div>
                  </td>
                  <td className="text-center">{item.quantity}</td>
                  <td className="text-right">{formatCurrency(item.price)}</td>
                  <td className="text-right">{formatCurrency(item.quantity * item.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="preview-totals">
            <div className="total-row">
              <span>Sous-total HT</span>
              <span className="font-semibold">{formatCurrency(totals.totalHT)}</span>
            </div>
            <div className="total-row">
              <span>TVA ({data.invoice.tvaRate}%)</span>
              <span className="font-semibold">{formatCurrency(totals.tvaAmount)}</span>
            </div>
            <div className="total-row grand-total">
              <span>TOTAL TTC</span>
              <span>{formatCurrency(totals.totalTTC)}</span>
            </div>
          </div>
        </div>

        <div className="bank-details">
          <h4>Règlement par virement bancaire</h4>
          <div className="bank-info-grid">
            <span className="bank-label">Bénéficiaire :</span>
            <span>{data.bank.beneficiary || '---'}</span>
            <span className="bank-label">IBAN :</span>
            <span className="font-mono">{data.bank.iban || '---'}</span>
            <span className="bank-label">BIC :</span>
            <span className="font-mono">{data.bank.bic || '---'}</span>
          </div>
        </div>

        <div className="legal-mentions">
          {isTvaZero && (
            <div className="tva-exemption">
              TVA non applicable selon l'article 293 B du Code Général des Impôts
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvoicePreview;
