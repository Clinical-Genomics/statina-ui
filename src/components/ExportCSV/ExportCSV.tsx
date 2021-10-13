import React from 'react';
import { Tooltip } from 'antd';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import {
  ErrorNotification,
  SuccessNotification,
} from 'services/helpers/helpers';

export const ExportCSV = ({
  csvData,
  fileName,
}: {
  csvData: any[];
  fileName: string;
}) => {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const exportToCSV = (csvData: any[], fileName: string) => {
    if (csvData === undefined || csvData.length == 0) {
      ErrorNotification({
        type: 'error',
        message: 'Download failed!',
        description: 'There is no data to download!',
      });
    } else {
      const exportData = csvData.map((item) => ({
        Batch_ID: item.SampleProject,
        Sequencing_Date: item.SequencingDate,
        Flowcell_ID: item.Flowcell,
      }));
      const ws = XLSX.utils.json_to_sheet(exportData);
      const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(data, fileName + fileExtension);
      SuccessNotification({
        type: 'success',
        message: 'Download successfully!',
      });
    }
  };
  return (
    <Tooltip title="Export to Excel">
      <span onClick={(e) => exportToCSV(csvData, fileName)}>Excel</span>
    </Tooltip>
  );
};
