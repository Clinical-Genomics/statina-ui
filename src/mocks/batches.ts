import { Batch } from 'services/interfaces'

export const mockBatches: Batch[] = [
  {
    batch_id: '2117030_NIPT',
    dataset: 'default',
    result_file:
      '/home/proj/production/housekeeper-bundles/usefulkrill/2021-10-16/2117030_NIPT.csv',
    multiqc_report:
      '/home/proj/production/housekeeper-bundles/usefulkrill/2021-10-16/multiqc_report.html',
    segmental_calls: '/home/proj/production/housekeeper-bundles/usefulkrill/2021-10-16',
    flowcell: 'HL5FLDRXY',
    sequencing_date: '2021-10-16',
    comment:
      'Higher dup.rate and B2BV as well as fewer mapped reads than usual, due to problems with the flow cell. According to Vincent at Clinical Genomics, there is low intensity in one part of the flow cell, but the data looks good otherwise.',
    median: {
      '13': 1,
      '18': 1,
      '21': 1,
      x: 1,
      y: 0,
    },
    stdev: {
      '13': 0,
      '18': 0,
      '21': 0,
      x: 0.03,
      y: 0,
    },
  },
  {
    batch_id: '2116928_NIPT',
    dataset: 'default',
    result_file: '/home/proj/production/housekeeper-bundles/tidyguinea/2021-10-14/2116928_NIPT.csv',
    multiqc_report:
      '/home/proj/production/housekeeper-bundles/tidyguinea/2021-10-14/multiqc_report.html',
    segmental_calls: '/home/proj/production/housekeeper-bundles/tidyguinea/2021-10-14',
    flowcell: 'HLFYKDRXY',
    sequencing_date: '2021-10-14',
    comment:
      'No T21 positive control was used in this batch (forgotten in set up). Good QC etc suggests that the run is ok. \r\n35 µL PCR-mix was added instead of 27 µL to sample 2021-28401 to 2021-28448 (8 samples in total).',
    median: {
      '13': 1,
      '18': 1,
      '21': 1,
      x: 0.99,
      y: 0,
    },
    stdev: {
      '13': 0,
      '18': 0,
      '21': 0,
      x: 0.03,
      y: 0,
    },
  },
  {
    batch_id: '2116723_NIPT',
    dataset: 'default',
    result_file:
      '/home/proj/production/housekeeper-bundles/simplesalmon/2021-10-11/2116723_NIPT.csv',
    multiqc_report:
      '/home/proj/production/housekeeper-bundles/simplesalmon/2021-10-11/multiqc_report.html',
    segmental_calls: '/home/proj/production/housekeeper-bundles/simplesalmon/2021-10-11',
    flowcell: 'HL2MYDRXY',
    sequencing_date: '2021-10-11',
    comment:
      'SD21 about 0.37 but no indication of suspected missed T21 samples when looking at ratio21',
    median: {
      '13': 1,
      '18': 1,
      '21': 1,
      x: 1,
      y: 0,
    },
    stdev: {
      '13': 0,
      '18': 0,
      '21': 0,
      x: 0.02,
      y: 0,
    },
  },
  {
    batch_id: '2116562_NIPT',
    dataset: 'default',
    result_file:
      '/home/proj/production/housekeeper-bundles/daringfeline/2021-10-08/2116562_NIPT.csv',
    multiqc_report:
      '/home/proj/production/housekeeper-bundles/daringfeline/2021-10-08/multiqc_report.html',
    segmental_calls: '/home/proj/production/housekeeper-bundles/daringfeline/2021-10-08',
    flowcell: 'HL2CVDRXY',
    sequencing_date: '2021-10-08',
    comment: 'Three T21 but low SD21 indicating no additional T21 samples in the batch.',
    median: {
      '13': 1,
      '18': 1,
      '21': 1,
      x: 0.99,
      y: 0,
    },
    stdev: {
      '13': 0,
      '18': 0,
      '21': 0,
      x: 0.03,
      y: 0,
    },
  },
  {
    batch_id: '2116464_2_NIPT',
    dataset: 'default',
    result_file:
      '/home/proj/production/housekeeper-bundles/worthybobcat/2021-10-07/2116464_2_NIPT.csv',
    multiqc_report:
      '/home/proj/production/housekeeper-bundles/worthybobcat/2021-10-07/multiqc_report.html',
    segmental_calls: '/home/proj/production/housekeeper-bundles/worthybobcat/2021-10-07',
    flowcell: 'HL5G3DRXY',
    sequencing_date: '2021-10-07',
    comment:
      'Batch rerun after removal of T21 positive sample 2021-27894. Not included in database.',
    median: {
      '13': 1,
      '18': 1,
      '21': 1,
      x: 1,
      y: 0,
    },
    stdev: {
      '13': 0,
      '18': 0,
      '21': 0,
      x: 0.02,
      y: 0,
    },
  },
]

export const mockBatch: any = {
  batch_id: '2116562_NIPT',
  dataset: 'default',
  result_file: '/home/proj/production/housekeeper-bundles/daringfeline/2021-10-08/2116562_NIPT.csv',
  multiqc_report:
    '/home/proj/production/housekeeper-bundles/daringfeline/2021-10-08/multiqc_report.html',
  segmental_calls: '/home/proj/production/housekeeper-bundles/daringfeline/2021-10-08',
  flowcell: 'HL2CVDRXY',
  sequencing_date: '2021-10-08',
  comment: 'Three T21 but low SD21 indicating no additional T21 samples in the batch.',
  median: {
    '13': 1,
    '18': 1,
    '21': 1,
    x: 0.99,
    y: 0,
  },
  stdev: {
    '13': 0,
    '18': 0,
    '21': 0,
    x: 0.03,
    y: 0,
  },
}
