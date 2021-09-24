import React from 'react';
import { Switch, Redirect, Route, RouteComponentProps } from 'react-router-dom';
import { HomePage } from '../pages/Home/HomePage';
import { UnauthorizedPage } from '../pages/UnauthorizedPage';
import { BatchesPage } from '../pages/Batches/BatchesPage';
import { LatestPage } from '../pages/Latest/LatestPage';
import { BatchPage } from '../pages/Batch/BatchPage';
import { StatisticsPage } from '../pages/Statistics/StatisticsPage';

interface RoutesProps {
  isLoggedIn: boolean;
}

export const Routes = (props: RoutesProps) => {
  const { isLoggedIn } = props;
  return (
    <Switch>
      <Route path="/" exact>
        <HomePage />
      </Route>
      <Route path="/unauthorized" exact>
        <UnauthorizedPage isLoggedIn={isLoggedIn} />
      </Route>
      <Route path="/latest" exact>
        <LatestPage />
      </Route>

      {/* Protected Routes */}
      <Route
        path="/batches"
        exact
        render={() =>
          isLoggedIn === true ? (
            <BatchesPage />
          ) : (
            <Redirect to={{ pathname: '/unauthorized' }} />
          )
        }
      />
      <Route path="/batches/:batchId" component={BatchPage} />
      <Route
        path="/statistics"
        exact
        render={() =>
          isLoggedIn === true ? (
            <StatisticsPage />
          ) : (
            <Redirect to={{ pathname: '/unauthorized' }} />
          )
        }
      />
    </Switch>
  );
};
