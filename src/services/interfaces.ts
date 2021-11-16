export interface Notification {
  type: 'error' | 'success' | 'info' | 'warning'
  message: string
  description?: string
}

export interface Chromosomes {
  13: number
  18: number
  21: number
  x: number
  y: number
}

export interface Batch {
  batch_id: string
  result_file: string
  multiqc_report: string
  segmental_calls: string
  flowcell: string
  sequencing_date: string
  median: Chromosomes
  stdev: Chromosomes
  comment: string
}

export interface Sample {
  sample_type: string
  qc_flag: string
  cnv_segment: string
  comment: string
  sample_id: string
  batch_id: string
  warnings: {
    fetal_fraction_preface: string
    fetal_fraction_y: string
    z_score_13: string
    z_score_18: string
    z_score_21: string
    x0: string
    xxx: string
    other: string
    xxy: string
    xyy: string
  }
  text_warning: string
  sex: string
  sequencing_date: string
  status: SampleStatus
  included: {
    include: true
    edited: string
  }
  z_score: {
    '13': string
    '18': string
    '21': string
    x: string
  }
  fetal_fraction: {
    x: string
    y: string
    preface: string
  }
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

export interface FetalFractionPrefaceGraph {
  cases: any
  control: any
}

export interface SampleStatus {
  '13': {
    status: string
    edited: string
  }
  '18': {
    status: string
    edited: string
  }
  '21': {
    status: string
    edited: string
  }
  x0: {
    status: string
    edited: string
  }
  xxx: {
    status: string
    edited: string
  }
  xxy: {
    status: string
    edited: string
  }
  xyy: {
    status: string
    edited: string
  }
}
