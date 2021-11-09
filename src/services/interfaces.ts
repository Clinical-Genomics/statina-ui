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
  sample_type: 'string'
  qc_flag: 'string'
  cnv_segment: 'string'
  comment: 'string'
  sample_id: 'string'
  batch_id: 'string'
  warnings: {
    fetal_fraction_preface: 'danger'
    fetal_fraction_y: 'danger'
    z_score_13: 'danger'
    z_score_18: 'danger'
    z_score_21: 'danger'
    x0: 'danger'
    xxx: 'danger'
    other: 'danger'
    xxy: 'danger'
    xyy: 'danger'
  }
  text_warning: 'string'
  sex: 'string'
  sequencing_date: 'string'
  status: {
    '13': {
      status: 'Normal'
      edited: 'string'
    }
    '18': {
      status: 'Normal'
      edited: 'string'
    }
    '21': {
      status: 'Normal'
      edited: 'string'
    }
    x0: {
      status: 'Normal'
      edited: 'string'
    }
    xxx: {
      status: 'Normal'
      edited: 'string'
    }
    xxy: {
      status: 'Normal'
      edited: 'string'
    }
    xyy: {
      status: 'Normal'
      edited: 'string'
    }
  }
  included: {
    include: true
    edited: 'string'
  }
  z_score: {
    '13': 'string'
    '18': 'string'
    '21': 'string'
    x: 'string'
  }
  fetal_fraction: {
    x: 'string'
    y: 'string'
    preface: 'string'
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
