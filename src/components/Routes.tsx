import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
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

export const Routes = (props: RoutesProps) => {
  const { isLoggedIn } = props
  return (
    <Switch>
      <Route path="/unauthorized" exact>
        <UnauthorizedPage isLoggedIn={isLoggedIn} />
      </Route>
      <Route
        path="/login"
        exact
        render={() =>
          isLoggedIn === true ? <Redirect to={{ pathname: '/batches' }} /> : <LoginPage />
        }
      />
      <Route
        path="/"
        exact
        render={() =>
          isLoggedIn === true ? (
            <Redirect to={{ pathname: '/batches' }} />
          ) : (
            <Redirect to={{ pathname: '/login' }} />
          )
        }
      />
      <Route
        path="/admin"
        exact
        render={() =>
          isLoggedIn === true ? <AdminPage /> : <Redirect to={{ pathname: '/login' }} />
        }
      />
      <Route
        path={`/${datasetsPath}`}
        exact
        render={() =>
          isLoggedIn === true ? <Datasets /> : <Redirect to={{ pathname: `${datasetsPath}` }} />
        }
      />
      <Route
        path={`/${datasetsPath}/:datasetId`}
        exact
        render={() =>
          isLoggedIn === true ? <DatasetPage /> : <Redirect to={{ pathname: `${datasetsPath}` }} />
        }
      />
      <Route
        path="/batches"
        exact
        render={() =>
          isLoggedIn === true ? <BatchesPage /> : <Redirect to={{ pathname: '/login' }} />
        }
      />
      <Route
        path="/batches/:batchId"
        exact
        render={() =>
          isLoggedIn === true ? <BatchPage /> : <Redirect to={{ pathname: '/login' }} />
        }
      />
      <Route
        path="/samples"
        exact
        render={() =>
          isLoggedIn === true ? <SamplesPage /> : <Redirect to={{ pathname: '/login' }} />
        }
      />
      <Route
        path="/samples/:sampleId"
        exact
        render={() =>
          isLoggedIn === true ? <SamplePage /> : <Redirect to={{ pathname: '/login' }} />
        }
      />
      <Route
        path="/statistics"
        exact
        render={() =>
          isLoggedIn === true ? <StatisticsPage /> : <Redirect to={{ pathname: '/login' }} />
        }
      />
      <Route path="/:username/:verificationhex" exact render={() => <ConfirmedResult />} />
      <Route
        path="*"
        exact
        render={() =>
          isLoggedIn === true ? <PageNotFound /> : <Redirect to={{ pathname: '/login' }} />
        }
      />
    </Switch>
  )
}
