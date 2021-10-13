import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Tooltip } from 'antd';
import {
  ErrorNotification,
  SuccessNotification,
} from '../../services/helpers/helpers';

export function BatchTablePDF(pdfData) {
  const exportPDF = () => {
    if (pdfData === undefined || pdfData.length == 0) {
      ErrorNotification({
        type: 'error',
        message: 'Download failed!',
        description: 'There is no data to download!',
      });
    } else {
      const unit = 'pt';
      const size = 'A4';
      const orientation = 'landscape';

      const marginLeft = 40;
      const doc = new jsPDF(orientation, unit, size) as any;

      doc.setFontSize(15);

      const title = 'NIPT Results';
      const batchNum = `Batch: ${pdfData.pdfData[0].SampleProject}`;
      const headers = [
        [
          'Sample',
          'Zscore13',
          'Zscore18',
          'Zscore21',
          'FFPF(%)',
          'FFX(%)',
          'FFY(%)',
          'Sex',
          'Warning',
          'Comment',
        ],
      ];

      const data = pdfData.pdfData.map((item) => [
        item.SampleID,
        item.Zscore_13,
        item.Zscore_18,
        item.Zscore_21,
        item.FetalFractionPreface,
        item.FFX,
        item.FFY,
        item.sex,
        item.text_warning,
        item.comment,
      ]);

      const content = {
        startY: 50,
        head: headers,
        body: data,
        theme: 'grid',
        /* didParseCell: function (data) {
          if (data.row.raw[1] === -0.55) {
            data.cell.styles.fillColor = [239, 154, 154];
          }
        }, */
      };

      const imgData = 'here the jpeg image string on base64';
      doc.setFontSize(20);
      doc.text(title, marginLeft, 20);
      doc.setTextColor(105, 105, 105);
      doc.setFontSize(12);
      doc.text(batchNum, marginLeft, 40);
      doc.setTextColor(0, 0, 0);
      doc.autoTable(content);
      doc.addImage(imgData, 'JPEG', 15, 40, 180, 160);
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        // Go to page i
        doc.setPage(i);
        //Print Page 1 of 4 for example
        doc.setFontSize(8);
        doc.text(
          'Page ' + String(i) + ' of ' + String(pageCount),
          820 - 20,
          605 - 30,
          null,
          null,
          'right'
        );
      }
      doc.save('Statina.pdf');
      SuccessNotification({
        type: 'success',
        message: 'Download successfully!',
      });
    }
  };
  return (
    <Tooltip title="Export to PDF">
      <span onClick={(e) => exportPDF()}>PDF</span>
    </Tooltip>
  );
}
