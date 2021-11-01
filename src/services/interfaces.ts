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
