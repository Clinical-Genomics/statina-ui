export interface Notification {
  type: 'error' | 'success' | 'info' | 'warning'
  message: string
  description?: string
}

export interface Batch {
  batch_id: string
  result_file: string
  multiqc_report: string
  segmental_calls: string
  Flowcell: string
  SequencingDate: string
  Median_13: number
  Median_18: number
  Median_21: number
  Median_X: number
  Median_Y: number
  Stdev_13: number
  Stdev_18: number
  Stdev_21: number
  Stdev_X: number
  Stdev_Y: number
  comment: string
}

export interface TracePlot {
  y: any[]
  name: string
  nmarker: any
  type: string
  boxpoints: string
}

export interface Login {
  password: string
  username: string
}

export interface RegisterUser {
  password: string
  username: string
  email: string
}

export interface GrahCromosomeData {
  13?: any
  18?: any
  21?: any
}

export interface ThresholdData {
  Zscore: number
  color: string
  text: string
}

export interface Threshold {
  hard_max: ThresholdData
  hard_min: ThresholdData
  soft_max: ThresholdData
  soft_min: ThresholdData
}

export interface ZScoreGraph {
  abnormal_data: GrahCromosomeData
  chromosomes: string[]
  ncv_chrom_data: GrahCromosomeData
  normal_data: GrahCromosomeData
  tris_thresholds
}

export interface FetalFractionXYGraph {
  abnormal: any
  cases: any
  control: any
  max_x: number
  min_x: number
  sex_thresholds: any
}
