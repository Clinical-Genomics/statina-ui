import React from 'react'
import ReactMarkdown from 'react-markdown'
import raw from 'raw.macro'
const changelogMarkdown = raw('../../../CHANGELOG.md')

export const LatestPage = () => {
  return <ReactMarkdown>{changelogMarkdown}</ReactMarkdown>
}
