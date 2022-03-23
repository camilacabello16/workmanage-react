import { lazy, Suspense } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import ErrorBoundary from 'components/error/ErrorBoundary';
import LoadingSpinner from 'components/shared/LoadingSpinner';
import Login from '../../pages/login/Login';
import { useEffect } from 'react';
import MenuLayout from './MenuLayout';
import { Menu } from 'antd';

const Home = lazy(() => import('components/home/Home'));
const CustomHome = lazy(() => import('components/home/CustomHome'));

function AppContainer() {
    useEffect(() => {
        let userJSON = window.localStorage.getItem('user');

        if (userJSON && userJSON != '') {
            //   let userData = JSON.parse(userJSON);
            //   if (moment(userData.Data.ExpiredDate) < moment()) {
            //     window.location.href = '/user/login';
            //   }
            //window.location.href = '/';
        } else {
            window.location.href = '/login';
        }
    }, [])

    return (
        <Router>
            <ErrorBoundary>
                <MenuLayout />
                <Suspense fallback={<LoadingSpinner />}>
                    <Switch>
                        <Route path="/custom-home">
                            <CustomHome />
                        </Route>
                        <Route exact path="/home">
                            <Home />
                        </Route>

                    </Switch>
                </Suspense>
            </ErrorBoundary>
        </Router>
    );
}

export default AppContainer;
