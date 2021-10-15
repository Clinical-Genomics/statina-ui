import React, { useEffect, useState } from 'react'
import { Table, Tag, Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { red } from '@ant-design/colors'
import { sexTags, tagColors } from 'services/helpers/constants'
import { ZscoreGraph } from 'components/ZscoreGraph/ZscoreGraph'
import ReactPDF, { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer'

type SamplesProps = {
  samples: any[]
}

export const BatchTablePDF = ({ samples }: SamplesProps) => {
  const [report, setReport] = useState<any>()
  const [filteredSamples, setFilteredSamples] = useState<any[]>(samples)

  useEffect(() => {
    setFilteredSamples(samples)
    if (samples?.length > 0) {
      const selectedKey: string[] = []
      samples.forEach((sample) => {
        if (sample.include) selectedKey.push(sample?.SampleID)
      })
    }
    setReport(samples)
  }, [samples])

  const columns: any = [
    {
      title: 'Sample',
      dataIndex: 'SampleID',
      key: 'SampleID',
      fixed: 'left',
    },
    {
      title: 'Zscore 13',
      dataIndex: 'Zscore_13',
      key: 'Zscore_13',
      width: 100,
      render(score, sample) {
        return {
          props: {
            style: {
              background: sample.text_warning.includes('Zscore_13') ? red[1] : null,
            },
          },
          children: <div>{score}</div>,
        }
      },
    },
    {
      title: 'Zscore 18',
      dataIndex: 'Zscore_18',
      key: 'Zscore_18',
      width: 100,
      render(score, sample) {
        return {
          props: {
            style: {
              background: sample.text_warning.includes('Zscore_18') ? red[1] : null,
            },
          },
          children: <div>{score}</div>,
        }
      },
    },
    {
      title: 'Zscore 21',
      dataIndex: 'Zscore_21',
      key: 'Zscore_21',
      width: 100,
      render(score, sample) {
        return {
          props: {
            style: {
              background: sample.text_warning.includes('Zscore_21') ? red[1] : null,
            },
          },
          children: <div>{score}</div>,
        }
      },
    },
    {
      title: 'FFPF (%)',
      dataIndex: 'FetalFractionPreface',
      key: 'FetalFractionPreface',
      width: 100,
    },
    {
      title: 'FFX (%)',
      dataIndex: 'FFX',
      key: 'FFX',
      width: 100,
    },
    {
      title: 'FFY (%)',
      dataIndex: 'FFY',
      key: 'FFY',
      width: 100,
    },
    {
      title: 'Sex',
      dataIndex: 'sex',
      key: 'sex',
      width: 70,
      render: (sex: any) => <Tag color={sexTags[sex]}>{sex}</Tag>,
    },
    {
      title: (
        <Tooltip title="Warning for chomosome abnormality. Automatically generated. Based on pre defined Zscore and Fetal Fraction trsholds">
          Warning {/* ignores needed for antd bug */}
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/*
// @ts-ignore */}
          <QuestionCircleOutlined />
        </Tooltip>
      ),
      dataIndex: 'text_warning',
      key: 'text_warning',
      render: (warnings: any) => {
        return warnings.length > 0
          ? warnings.split(', ').map((warning) => (
              <Tag color={tagColors.warning} key={warning}>
                {warning}
              </Tag>
            ))
          : null
      },
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
      width: 200,
    },
  ]
  const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    title: {
      fontSize: 24,
      textAlign: 'center',
      fontFamily: 'Oswald',
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
  })
  return report ? (
    <Document>
      <Page size="A4" style={styles.body}>
        <View style={styles.section}>
          <Text style={styles.header}>NIPT Results</Text>
        </View>

        {/* <Text>Batch: </Text>
        <Table
          pagination={false}
          columns={columns}
          dataSource={filteredSamples}
          rowKey="SampleID"
        />
        {samples && <ZscoreGraph samples={samples} score={'Zscore_21'} />} */}
      </Page>
    </Document>
  ) : (
    <Document>
      <Page size="A4" style={styles.body}>
        <Text style={styles.subtitle}>NO REPORT FOUND</Text>
      </Page>
    </Document>
  )
}
