export const sexTags = {
  XY: 'green',
  XX: 'magenta',
}

export const includeTags = {
  false: 'gray',
  true: 'green',
}

export const sampleStatusTags = {
  normal: { label: 'Normal', color: 'green' },
  suspected: { label: 'Suspected', color: 'gold' },
  probable: { label: 'Probable', color: 'orange' },
  verified: { label: 'Verified', color: 'red' },
  false: { label: 'False Positive', color: 'orange' },
  falseNegative: { label: 'False Negative', color: 'purple' },
  other: { label: 'Other', color: 'geekblue' },
  failed: { label: 'Failed', color: 'magenta' },
}

export const tagColors = {
  sampleStatus: sampleStatusTags,
  sex: sexTags,
  warning: 'volcano',
  cnvSegment: 'blue',
  include: includeTags,
}

export const userCookie = 'statinaUser'

export const statinaBackendRepo = 'https://github.com/Clinical-Genomics/statina/issues'

export const batchDownloadFileTypes = [
  { name: 'Fluffy Result file', type: 'result_file' },
  { name: 'MultiQC', type: 'multiqc_report' },
  { name: 'Full Batch Archive', type: 'segmental_calls' },
]
