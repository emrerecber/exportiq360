import html2pdf from 'html2pdf.js';

export interface PDFExportOptions {
  filename?: string;
  companyName?: string;
  reportDate?: string;
}

export const exportToPDF = async (elementId: string, options: PDFExportOptions = {}) => {
  const {
    filename = `ExportIQ_360_Report_${new Date().toISOString().split('T')[0]}.pdf`,
    companyName = 'Company',
    reportDate = new Date().toLocaleDateString('tr-TR')
  } = options;

  const element = document.getElementById(elementId);
  if (!element) {
    console.error('Element not found:', elementId);
    return;
  }

  // Clone element to avoid affecting the original
  const clone = element.cloneNode(true) as HTMLElement;
  
  // Apply print-friendly styles
  clone.style.width = '210mm'; // A4 width
  clone.style.padding = '10mm';
  clone.style.backgroundColor = 'white';
  
  // Create cover page
  const coverPage = createCoverPage(companyName, reportDate);
  
  // Create wrapper with cover and content
  const wrapper = document.createElement('div');
  wrapper.appendChild(coverPage);
  wrapper.appendChild(clone);
  
  // Add to DOM temporarily (hidden)
  wrapper.style.position = 'absolute';
  wrapper.style.left = '-9999px';
  wrapper.style.top = '0';
  document.body.appendChild(wrapper);

  const opt = {
    margin: [10, 10, 10, 10],
    filename: filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    },
    jsPDF: { 
      unit: 'mm', 
      format: 'a4', 
      orientation: 'portrait',
      compress: true
    },
    pagebreak: { 
      mode: ['avoid-all', 'css', 'legacy'],
      before: '.pdf-page-break-before',
      after: '.pdf-page-break-after',
      avoid: ['.pdf-no-break', 'img', 'table', 'svg']
    }
  };

  try {
    await html2pdf().set(opt).from(wrapper).save();
    console.log('PDF generated successfully');
  } catch (error) {
    console.error('PDF generation failed:', error);
    throw error;
  } finally {
    // Cleanup
    document.body.removeChild(wrapper);
  }
};

function createCoverPage(companyName: string, reportDate: string): HTMLElement {
  const cover = document.createElement('div');
  cover.style.cssText = `
    width: 210mm;
    height: 297mm;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    text-align: center;
    padding: 40px;
    page-break-after: always;
  `;
  
  cover.innerHTML = `
    <div style="max-width: 600px;">
      <h1 style="font-size: 48px; font-weight: bold; margin-bottom: 20px; color: white;">
        ExportIQ 360
      </h1>
      <div style="width: 100px; height: 4px; background: white; margin: 0 auto 40px;"></div>
      <h2 style="font-size: 32px; font-weight: 600; margin-bottom: 60px; color: white;">
        E-Ticaret Yetkinlik<br/>Değerlendirme Raporu
      </h2>
      <div style="background: rgba(255,255,255,0.2); border-radius: 16px; padding: 40px; margin-top: 60px;">
        <p style="font-size: 24px; margin-bottom: 20px; color: white;">
          ${companyName}
        </p>
        <p style="font-size: 18px; color: rgba(255,255,255,0.9);">
          Rapor Tarihi: ${reportDate}
        </p>
      </div>
      <div style="margin-top: 80px; font-size: 14px; color: rgba(255,255,255,0.8);">
        <p>Bu rapor ExportIQ 360 tarafından hazırlanmıştır.</p>
        <p>© ${new Date().getFullYear()} ExportIQ. Tüm hakları saklıdır.</p>
      </div>
    </div>
  `;
  
  return cover;
}

export const exportAllSections = async (
  sectionIds: string[],
  options: PDFExportOptions = {}
) => {
  const {
    filename = `ExportIQ_360_Complete_Report_${new Date().toISOString().split('T')[0]}.pdf`,
    companyName = 'Company',
    reportDate = new Date().toLocaleDateString('tr-TR')
  } = options;

  // Create container for all sections
  const container = document.createElement('div');
  container.style.cssText = 'background: white; width: 210mm;';
  
  // Add cover page
  const coverPage = createCoverPage(companyName, reportDate);
  container.appendChild(coverPage);
  
  // Add all sections
  sectionIds.forEach((id, index) => {
    const element = document.getElementById(id);
    if (element) {
      const clone = element.cloneNode(true) as HTMLElement;
      
      // Add page break before each section
      if (index > 0) {
        const pageBreak = document.createElement('div');
        pageBreak.style.pageBreakBefore = 'always';
        pageBreak.className = 'pdf-page-break-before';
        container.appendChild(pageBreak);
      }
      
      clone.style.cssText = 'padding: 20px; page-break-inside: avoid;';
      clone.className = 'pdf-no-break';
      container.appendChild(clone);
    }
  });
  
  // Add to DOM temporarily
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  document.body.appendChild(container);

  const opt = {
    margin: [10, 10, 10, 10],
    filename: filename,
    image: { type: 'jpeg', quality: 0.95 },
    html2canvas: { 
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 1200
    },
    jsPDF: { 
      unit: 'mm', 
      format: 'a4', 
      orientation: 'portrait',
      compress: true
    },
    pagebreak: { 
      mode: ['avoid-all', 'css', 'legacy'],
      before: '.pdf-page-break-before',
      after: '.pdf-page-break-after',
      avoid: '.pdf-no-break'
    }
  };

  try {
    await html2pdf().set(opt).from(container).save();
    console.log('Complete PDF generated successfully');
  } catch (error) {
    console.error('Complete PDF generation failed:', error);
    throw error;
  } finally {
    document.body.removeChild(container);
  }
};
