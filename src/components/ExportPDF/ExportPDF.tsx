import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Button, Tooltip } from 'antd';
import { FilePdfOutlined } from '@ant-design/icons';
import {
  ErrorNotification,
  SuccessNotification,
} from '../../services/helpers/helpers';

export function ExportPDF(pdfData) {
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
      const orientation = 'portrait';

      const marginLeft = 40;
      const doc = new jsPDF(orientation, unit, size) as any;

      doc.setFontSize(15);

      const title = 'Statina';
      const headers = [['Batch_ID', 'Sequencing_Date', 'Flowcell_ID']];

      const data = pdfData.pdfData.map((item) => [
        item.SampleProject,
        item.SequencingDate,
        item.Flowcell,
      ]);

      const content = {
        startY: 50,
        head: headers,
        body: data,
        theme: 'grid',
      };

      doc.text(title, marginLeft, 40);
      doc.autoTable(content);
      doc.save('Statina.pdf');
      SuccessNotification({
        type: 'success',
        message: 'Download successfully!',
      });
    }
  };
  return (
    <Tooltip title="Export to PDF">
      <Button
        type="default"
        icon={<FilePdfOutlined />}
        onClick={(e) => exportPDF()}
      >
        PDF
      </Button>
    </Tooltip>
  );
}
