import { Batch } from 'services/interfaces'

export const mockBatches: Batch[] = [
  {
    document_count: 5,
    documents: [
      {
        batch_id: '2116014_NIPT',
        result_file:
          '/home/proj/production/housekeeper-bundles/alertmayfly/2021-10-01/2116014_NIPT.csv',
        multiqc_report:
          '/home/proj/production/housekeeper-bundles/alertmayfly/2021-10-01/multiqc_report.html',
        segmental_calls: '/home/proj/production/housekeeper-bundles/alertmayfly/2021-10-01',
        flowcell: 'HL3KMDRXY',
        sequencing_date: '2021-10-01',
        comment: 'test',
        median: {
          '13': 1,
          '18': 1,
          '21': 1,
          x: 0.97,
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
        batch_id: '2115696_NIPT',
        result_file:
          '/home/proj/production/housekeeper-bundles/fulllizard/2021-09-30/2115696_NIPT.csv',
        multiqc_report:
          '/home/proj/production/housekeeper-bundles/fulllizard/2021-09-30/multiqc_report.html',
        segmental_calls: '/home/proj/production/housekeeper-bundles/fulllizard/2021-09-30',
        flowcell: 'H7WG3DRXY',
        sequencing_date: '2021-09-30',
        comment:
          'Re-sequenced batch after previous results showed fewer mapped reads, high bin2bin variance and high stdev21. ',
        median: {
          '13': 1,
          '18': 1,
          '21': 1,
          x: 0.97,
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
        batch_id: '2115851_NIPT',
        result_file:
          '/home/proj/production/housekeeper-bundles/freerabbit/2021-09-29/2115851_NIPT.csv',
        multiqc_report:
          '/home/proj/production/housekeeper-bundles/freerabbit/2021-09-29/multiqc_report.html',
        segmental_calls: '/home/proj/production/housekeeper-bundles/freerabbit/2021-09-29',
        flowcell: 'HL3HWDRXY',
        sequencing_date: '2021-09-29',
        comment:
          'This is the batch results after a sequencing rerun after poor QC-data (mainly low mapped reads, high B2BV) in the first run.',
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
        batch_id: '2115619_NIPT',
        result_file:
          '/home/proj/production/housekeeper-bundles/closeparrot/2021-09-23/2115619_NIPT.csv',
        multiqc_report:
          '/home/proj/production/housekeeper-bundles/closeparrot/2021-09-23/multiqc_report.html',
        segmental_calls: '/home/proj/production/housekeeper-bundles/closeparrot/2021-09-23',
        flowcell: 'HJJKWDRXY',
        sequencing_date: '2021-09-23',
        comment: '',
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
          x: 0.04,
          y: 0,
        },
      },
      {
        batch_id: '2115472_NIPT',
        result_file:
          '/home/proj/production/housekeeper-bundles/poeticsloth/2021-09-21/2115472_NIPT.csv',
        multiqc_report:
          '/home/proj/production/housekeeper-bundles/poeticsloth/2021-09-21/multiqc_report.html',
        segmental_calls: '/home/proj/production/housekeeper-bundles/poeticsloth/2021-09-21',
        flowcell: 'HJMKFDRXY',
        sequencing_date: '2021-09-21',
        comment: '',
        median: {
          '13': 1,
          '18': 1,
          '21': 1,
          x: 0.98,
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
    ],
  },
]

export const mockBatch: any = {
  batch_id: '2116562_NIPT',
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
