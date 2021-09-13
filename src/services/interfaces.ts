export interface ErrorNotification {
  type: 'error';
  message: string;
  description: string;
}

export interface Batch {
  SampleProject: string;
  result_file: string;
  multiqc_report: string;
  segmental_calls: string;
  Flowcell: string;
  SequencingDate: string;
  Median_13: number;
  Median_18: number;
  Median_21: number;
  Median_X: number;
  Median_Y: number;
  Stdev_13: number;
  Stdev_18: number;
  Stdev_21: number;
  Stdev_X: number;
  Stdev_Y: number;
  comment: string;
}
