import { Sample } from '../services/interfaces'

export const mockSample: Sample = {
  sample_type: '',
  qc_flag: 'DuplicationRate',
  cnv_segment: 'yes',
  comment: '',
  sample_id: '2021-28790-06',
  batch_id: '2117030_NIPT',
  warnings: {
    fetal_fraction_preface: 'default',
    fetal_fraction_y: 'default',
    z_score_13: 'default',
    z_score_18: 'default',
    z_score_21: 'default',
    x0: 'default',
    xxx: 'default',
    other: 'default',
    xxy: 'default',
    xyy: 'default',
  },
  text_warning: '',
  sex: 'XY',
  sequencing_date: '2021-10-16',
  status: {
    '13': {
      status: 'Normal',
      edited: '',
    },
    '18': {
      status: 'Normal',
      edited: '',
    },
    '21': {
      status: 'Normal',
      edited: '',
    },
    x0: {
      status: 'Normal',
      edited: '',
    },
    xxx: {
      status: 'Normal',
      edited: '',
    },
    xxy: {
      status: 'Normal',
      edited: '',
    },
    xyy: {
      status: 'Normal',
      edited: '',
    },
  },
  included: {
    include: true,
    edited: 'Lab Tech 2021/10/18 11:09:42',
  },
  z_score: {
    '13': '1.92',
    '18': '-0.71',
    '21': '1.19',
    x: '-0.82',
  },
  fetal_fraction: {
    x: '0.96',
    y: '4.17',
    preface: '6.92',
  },
}
