import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import { HomePage } from 'pages/Home/HomePage'
import { UnauthorizedPage } from 'pages/UnauthorizedPage'
import { BatchesPage } from 'pages/Batches/BatchesPage'
import { BatchPage } from 'pages/Batch/BatchPage'
import { SamplesPage } from 'pages/Samples/SamplesPage'
import { StatisticsPage } from 'pages/Statistics/StatisticsPage'
import { SamplePage } from 'pages/Sample/SamplePage'
import { LoginPage } from '../pages/Login/LoginPage'

type RoutesProps = {
  isLoggedIn: boolean
}

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
          isLoggedIn === true ? <HomePage /> : <Redirect to={{ pathname: '/login' }} />
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
      <Route path="/samples/:sampleId" component={SamplePage} />
      <Route
        path="/statistics"
        exact
        render={() =>
          isLoggedIn === true ? <StatisticsPage /> : <Redirect to={{ pathname: '/login' }} />
        }
      />
    </Switch>
  )
}
