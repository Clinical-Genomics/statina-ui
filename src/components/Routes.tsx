import React from 'react'
import { Routes, Navigate, Route } from 'react-router-dom'
import { UnauthorizedPage } from 'pages/UnauthorizedPage'
import { BatchesPage } from 'pages/Batches/BatchesPage'
import { BatchPage } from 'pages/Batch/BatchPage'
import { SamplesPage } from 'pages/Samples/SamplesPage'
import { StatisticsPage } from 'pages/Statistics/StatisticsPage'
import { SamplePage } from 'pages/Sample/SamplePage'
import { LoginPage } from '../pages/Login/LoginPage'
import { PageNotFound } from 'pages/PageNotFound/PageNotFound'
import { AdminPage } from '../pages/Admin/AdminPage'
import { ConfirmedResult } from './NoPermissonResults/ConfirmedResult'
import { Datasets } from './Datasets/Datasets'
import { DatasetPage } from './DatasetPage/DatasetPage'

type RoutesProps = {
  isLoggedIn: boolean
}

export const datasetsPath = 'datasets'

export const AppRoutes = (props: RoutesProps) => {
  const { isLoggedIn } = props
  return (
    <Routes>
      <Route path="/unauthorized" element={<UnauthorizedPage isLoggedIn={isLoggedIn} />} />

      <Route
        path="/login"
        element={isLoggedIn === true ? <Navigate to="/batches" replace /> : <LoginPage />}
      />
      <Route
        path="/"
        element={
          isLoggedIn === true ? (
            <Navigate to="/batches" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/admin"
        element={isLoggedIn === true ? <AdminPage /> : <Navigate to="/login" replace />}
      />
      <Route
        path={`/${datasetsPath}`}
        element={isLoggedIn === true ? <Datasets /> : <Navigate to="/login" replace />}
      />
      <Route
        path={`/${datasetsPath}/:datasetId`}
        element={isLoggedIn === true ? <DatasetPage /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/batches"
        element={isLoggedIn === true ? <BatchesPage /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/batches/:batchId"
        element={isLoggedIn === true ? <BatchPage /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/samples"
        element={isLoggedIn === true ? <SamplesPage /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/samples/:sampleId"
        element={isLoggedIn === true ? <SamplePage /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/statistics"
        element={isLoggedIn === true ? <StatisticsPage /> : <Navigate to="/login" replace />}
      />
      <Route path="/:username/:verificationhex" element={<ConfirmedResult />} />
      <Route
        path="*"
        element={isLoggedIn === true ? <PageNotFound /> : <Navigate to="/login" replace />}
      />
    </Routes>
  )
}
