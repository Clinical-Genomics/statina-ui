export const getStatusTagColor = (tag: string) => {
  switch (tag) {
    case 'failed':
      return 'volcano'
    case 'pending':
      return 'gold'
    case 'completed':
      return 'green'
    default:
      return 'geekblue'
  }
}

export const getTypeTagColor = (tag: string) => {
  switch (tag) {
    case 'wgs':
      return 'magenta'
    case 'wes':
      return 'purple'
    case 'tgs':
      return 'green'
    default:
      return 'cyan'
  }
}

export const getPipelineTagColor = (tag: string) => {
  switch (tag.toLowerCase()) {
    case 'balsamic':
      return '#16a596'
    case 'mip-dna':
      return '#bc6ff1'
    case 'mip-rna':
      return '#800000'
    case 'fluffy':
      return '#e6739f'
    case 'microsalt':
      return '#eb7047'
    case 'sars-cov-2':
      return '#44aeeb'
    case 'demultiplex':
      return '#096194'
    case 'spring':
      return '#5d198a'
    case 'rsync':
      return '#56c46c'
    default:
      return '#737373'
  }
}

export const getPriorityTagColor = (tag: string) => {
  switch (tag) {
    case 'high':
      return 'gold'
    case 'normal':
      return 'cyan'
    default:
      return 'blue'
  }
}

export const antdPresets: string[] = [
  'magenta',
  'red',
  'volcano',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'bluegeek',
  'bluepurple',
]

// Returns an Antd preset color given any string
export const colorFromString = (str: string, colorList = antdPresets) => {
  const numberFromString = parseInt(String(str.length).charAt(0))
  return colorList[numberFromString]
}
