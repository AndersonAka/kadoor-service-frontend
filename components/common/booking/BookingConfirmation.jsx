'use client';

import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { formatPrice } from '@/utils/currency';

const BookingConfirmation = ({ reservation, itemType, onClose }) => {
  const t = useTranslations('Booking');
  const invoiceRef = useRef(null);

  const item = reservation[itemType] || reservation.vehicle || reservation.apartment;
  const bookingRef = reservation.id?.slice(0, 8)?.toUpperCase() || 'N/A';

  const qrData = JSON.stringify({
    ref: bookingRef,
    id: reservation.id,
    type: itemType,
    item: item?.title || item?.name,
    start: reservation.startDate,
    end: reservation.endDate,
    total: reservation.totalPrice,
  });

  const logoBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF8WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDI0LTAxLTE1VDEwOjAwOjAwKzAxOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyNC0wMS0xNVQxMDowMDowMCswMTowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyNC0wMS0xNVQxMDowMDowMCswMTowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6YTEyMzQ1NjctODkwYS0xMWVlLWFiY2QtMDI0MmFjMTIwMDAyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOmExMjM0NTY3LTg5MGEtMTFlZS1hYmNkLTAyNDJhYzEyMDAwMiIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmExMjM0NTY3LTg5MGEtMTFlZS1hYmNkLTAyNDJhYzEyMDAwMiI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YTEyMzQ1NjctODkwYS0xMWVlLWFiY2QtMDI0MmFjMTIwMDAyIiBzdEV2dDp3aGVuPSIyMDI0LTAxLTE1VDEwOjAwOjAwKzAxOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAM0lEQVR4nO3BMQEAAADCoPVP7WsIoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAeAN1+AABVhDU1wAAAABJRU5ErkJggg==';

  const generateInvoiceHTML = () => {
    const startStr = new Date(reservation.startDate).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
    const endStr = new Date(reservation.endDate).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
    const now = new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });

    return `
      <html>
      <head><title>Facture KADOOR SERVICE - ${bookingRef}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; color: #333; }
        .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 3px solid #b91c1c; padding-bottom: 20px; margin-bottom: 30px; }
        .logo-section { display: flex; align-items: center; gap: 15px; }
        .logo-img { width: 60px; height: 60px; }
        .logo-text { font-size: 24px; font-weight: bold; color: #b91c1c; }
        .company-info { font-size: 12px; color: #666; margin-top: 5px; }
        .invoice-title { font-size: 24px; color: #333; text-align: right; }
        .ref { font-size: 14px; color: #666; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th { background: #b91c1c; color: #fff; padding: 12px; text-align: left; }
        td { padding: 12px; border-bottom: 1px solid #eee; }
        .total-row td { font-weight: bold; font-size: 18px; border-top: 2px solid #b91c1c; }
        .footer { margin-top: 40px; text-align: center; color: #999; font-size: 12px; border-top: 1px solid #eee; padding-top: 20px; }
        @media print { body { margin: 20px; } }
      </style></head>
      <body>
        <div class="header">
          <div class="logo-section">
            <img src="/images/logo-kadoor.png" alt="KADOOR" class="logo-img" onerror="this.style.display='none'" />
            <div>
              <div class="logo-text">KADOOR SERVICE</div>
              <div class="company-info">Abidjan, Côte d'Ivoire<br/>kadoorserviceci@gmail.com</div>
            </div>
          </div>
          <div><div class="invoice-title">FACTURE</div><div class="ref">Réf: ${bookingRef}</div><div class="ref">Date: ${now}</div></div>
        </div>
        <h3>Détails de la réservation</h3>
        <table>
          <tr><th>Description</th><th>Détails</th></tr>
          <tr><td>Numéro de réservation</td><td>${bookingRef}</td></tr>
          <tr><td>Service</td><td>${itemType === 'vehicle' ? 'Véhicule' : 'Appartement'}: ${item?.title || item?.name || '-'}</td></tr>
          <tr><td>Date de début</td><td>${startStr}</td></tr>
          <tr><td>Date de fin</td><td>${endStr}</td></tr>
          <tr class="total-row"><td>Montant Total</td><td>${formatPrice(reservation.totalPrice)}</td></tr>
        </table>
        <div class="footer">
          <p>KADOOR SERVICE - Location de véhicules et d'appartements</p>
          <p>Merci pour votre confiance !</p>
        </div>
      </body></html>
    `;
  };

  // Helper function to load image as base64
  const loadLogoAsBase64 = () => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      };
      img.onerror = () => resolve(null);
      img.src = '/assets/images/logo_kadoor_service.png';
    });
  };

  const handleDownloadInvoice = async () => {
    // Dynamic import of jspdf
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF();
    
    const startStr = new Date(reservation.startDate).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
    const endStr = new Date(reservation.endDate).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
    const now = new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
    
    // Load logo
    const logoBase64Data = await loadLogoAsBase64();
    
    // Header with white background
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, 210, 45, 'F');
    
    // Add logo if loaded
    if (logoBase64Data) {
      try {
        doc.addImage(logoBase64Data, 'PNG', 15, 5, 30, 30);
      } catch (e) {
        console.warn('Could not add logo to PDF:', e);
      }
    }
    
    // Company name in black
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('KADOOR SERVICE', 50, 18);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text('Abidjan, Côte d\'Ivoire | kadoorserviceci@gmail.com', 50, 28);
    
    // Invoice title in black
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('FACTURE', 165, 15);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text(`Réf: ${bookingRef}`, 165, 22);
    doc.text(`Date: ${now}`, 165, 30);
    
    // Red horizontal line
    doc.setDrawColor(185, 28, 28);
    doc.setLineWidth(1);
    doc.line(0, 45, 210, 45);
    
    // Reset colors for body
    doc.setTextColor(51, 51, 51);
    
    // Details section
    doc.setTextColor(51, 51, 51);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Détails de la réservation', 20, 60);
    
    // Table
    const tableData = [
      ['Numéro de réservation', bookingRef],
      ['Service', `${itemType === 'vehicle' ? 'Véhicule' : 'Appartement'}: ${item?.title || item?.name || '-'}`],
      ['Date de début', startStr],
      ['Date de fin', endStr],
    ];
    
    let yPos = 70;
    doc.setFontSize(11);
    
    // Table header
    doc.setFillColor(185, 28, 28);
    doc.rect(20, yPos, 170, 10, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.text('Description', 25, yPos + 7);
    doc.text('Détails', 100, yPos + 7);
    yPos += 10;
    
    // Table rows
    doc.setTextColor(51, 51, 51);
    doc.setFont('helvetica', 'normal');
    tableData.forEach(([desc, detail]) => {
      doc.setDrawColor(238, 238, 238);
      doc.line(20, yPos + 10, 190, yPos + 10);
      doc.text(desc, 25, yPos + 7);
      doc.text(detail, 100, yPos + 7);
      yPos += 10;
    });
    
    // Total row
    doc.setFillColor(255, 245, 245);
    doc.rect(20, yPos, 170, 12, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('Montant Total', 25, yPos + 8);
    doc.setTextColor(185, 28, 28);
    doc.text(formatPrice(reservation.totalPrice), 100, yPos + 8);
    
    // Footer
    doc.setTextColor(153, 153, 153);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('KADOOR SERVICE - Location de véhicules et d\'appartements', 105, 270, { align: 'center' });
    doc.text('Merci pour votre confiance !', 105, 277, { align: 'center' });
    
    // Download
    doc.save(`facture-${bookingRef}.pdf`);
  };

  const handleDownloadReceipt = async () => {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF();
    
    const now = new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
    const startStr = new Date(reservation.startDate).toLocaleDateString('fr-FR');
    const endStr = new Date(reservation.endDate).toLocaleDateString('fr-FR');
    
    // Load logo
    const logoBase64Data = await loadLogoAsBase64();
    
    // Header with white background
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, 210, 45, 'F');
    
    // Add logo if loaded - centered
    if (logoBase64Data) {
      try {
        doc.addImage(logoBase64Data, 'PNG', 85, 3, 40, 40);
      } catch (e) {
        console.warn('Could not add logo to PDF:', e);
      }
    }
    
    // Red horizontal line
    doc.setDrawColor(185, 28, 28);
    doc.setLineWidth(1);
    doc.line(0, 45, 210, 45);
    
    // Company name below logo in black
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('KADOOR SERVICE', 105, 55, { align: 'center' });
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text('REÇU DE PAIEMENT', 105, 62, { align: 'center' });
    
    // Content
    doc.setTextColor(51, 51, 51);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    
    let yPos = 75;
    const leftCol = 30;
    const rightCol = 110;
    
    const lines = [
      ['Référence:', bookingRef],
      ['Date:', now],
      ['Service:', item?.title || item?.name || '-'],
      ['Période:', `Du ${startStr} au ${endStr}`],
    ];
    
    lines.forEach(([label, value]) => {
      doc.setFont('helvetica', 'bold');
      doc.text(label, leftCol, yPos);
      doc.setFont('helvetica', 'normal');
      doc.text(value, rightCol, yPos);
      yPos += 12;
    });
    
    // Total with highlight
    yPos += 10;
    doc.setFillColor(255, 245, 245);
    doc.rect(20, yPos - 8, 170, 20, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('Montant payé:', leftCol, yPos + 5);
    doc.setTextColor(185, 28, 28);
    doc.setFontSize(16);
    doc.text(formatPrice(reservation.totalPrice), rightCol, yPos + 5);
    
    // Footer
    doc.setTextColor(153, 153, 153);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Merci pour votre confiance !', 105, 250, { align: 'center' });
    doc.text('KADOOR SERVICE - Abidjan, Côte d\'Ivoire', 105, 257, { align: 'center' });
    
    doc.save(`recu-${bookingRef}.pdf`);
  };

  return (
    <div className="booking-confirmation">
      {/* Success Header */}
      <div className="text-center mb-4">
        <div className="mb-3" style={{ color: '#28a745' }}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <h4 style={{ color: '#28a745' }}>{t('booking_confirmed')}</h4>
        <p className="text-muted">{t('payment_success')}</p>
      </div>

      {/* QR Code - Centered */}
      <div className="d-flex flex-column align-items-center justify-content-center mb-4 p-4" style={{ backgroundColor: '#f8f9fa', borderRadius: '12px' }}>
        <QRCodeSVG
          value={qrData}
          size={160}
          bgColor="#f8f9fa"
          fgColor="#1a1a2e"
          level="M"
          includeMargin={false}
        />
        <p className="mt-2 mb-0 small text-muted text-center">Scannez pour vérifier votre réservation</p>
      </div>

      {/* Booking Details */}
      <div className="card mb-4" style={{ borderRadius: '12px', border: '1px solid #eee' }}>
        <div className="card-body p-4">
          <h5 className="card-title fw-bold mb-3">{t('booking_details')}</h5>
          <div className="d-flex justify-content-between py-2" style={{ borderBottom: '1px solid #f0f0f0' }}>
            <span className="text-muted">{t('booking_number')}</span>
            <strong>{bookingRef}</strong>
          </div>
          <div className="d-flex justify-content-between py-2" style={{ borderBottom: '1px solid #f0f0f0' }}>
            <span className="text-muted">{itemType === 'vehicle' ? 'Véhicule' : 'Appartement'}</span>
            <strong>{item?.title || item?.name}</strong>
          </div>
          <div className="d-flex justify-content-between py-2" style={{ borderBottom: '1px solid #f0f0f0' }}>
            <span className="text-muted">{t('start_date')}</span>
            <strong>{new Date(reservation.startDate).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</strong>
          </div>
          <div className="d-flex justify-content-between py-2" style={{ borderBottom: '1px solid #f0f0f0' }}>
            <span className="text-muted">{t('end_date')}</span>
            <strong>{new Date(reservation.endDate).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</strong>
          </div>
          <div className="d-flex justify-content-between py-2">
            <span className="text-muted fw-bold">{t('total_price')}</span>
            <strong style={{ color: '#ff5a5f', fontSize: '1.2rem' }}>{formatPrice(reservation.totalPrice)}</strong>
          </div>
        </div>
      </div>

      {/* Download Buttons */}
      <div className="mb-4">
        <div className="d-flex gap-2 flex-wrap">
          <button
            type="button"
            className="btn btn-sm flex-fill"
            onClick={handleDownloadInvoice}
            style={{ backgroundColor: '#ff5a5f', color: '#fff', borderRadius: '8px', padding: '10px' }}
          >
            <svg className="me-2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            {t('download_invoice')}
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm flex-fill"
            onClick={handleDownloadReceipt}
            style={{ borderRadius: '8px', padding: '10px' }}
          >
            <svg className="me-2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            {t('download_receipt')}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-3 mb-4" style={{ backgroundColor: '#e8f4fd', borderRadius: '8px', borderLeft: '4px solid #2196F3' }}>
        <div className="d-flex align-items-center">
          <svg className="me-2 flex-shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2196F3" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
          <span className="small">Un email de confirmation a été envoyé à votre adresse email.</span>
        </div>
      </div>

      {/* Close Button */}
      <div className="d-flex justify-content-end">
        <button
          type="button"
          className="btn"
          onClick={onClose}
          style={{ backgroundColor: '#ff5a5f', color: '#fff', borderRadius: '8px', padding: '10px 30px', fontWeight: '600' }}
        >
          {t('close')}
        </button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
