import { lazy, Suspense } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import ErrorBoundary from 'components/error/ErrorBoundary';
import LoadingSpinner from 'components/shared/LoadingSpinner';
import Login from '../../pages/login/Login';
import { useEffect, useState } from 'react';
import MenuLayout from './MenuLayout';
import { Menu, Row, Col } from 'antd';
import LeftMenuLayout from './LeftMenuLayout';
import Registration from 'pages/registation/Registration';
import BoardDetail from 'pages/board/BoardDetail';
import moment from 'moment';
import {
    ROOT_API,
    API_WORKSPACE_SEARCH,
    API_WORKSPACE_USER_SEARCH
} from '../constant/api';
import axios from 'axios';
import StartPage from 'pages/begin/StartPage';
import ProfileManage from './ProfileManage';
import Team from 'pages/team/Team';

const Home = lazy(() => import('components/home/Home'));
const CustomHome = lazy(() => import('components/home/CustomHome'));

function AppContainer() {
    const [listWorkspaceOwn, setListWorkspaceOwn] = useState([]);

    const getOwnWorkspace = () => {
        axios.post(ROOT_API + API_WORKSPACE_USER_SEARCH, {
            userId: JSON.parse(window.localStorage.getItem('auth_user'))?.id,
            role: "ROLE_WORKSPACE_MANAGER",
            pageIndex: 0,
            pageSize: 100
        }).then(res => {
            console.log(res);
            let listParentWp = [];
            res.data.content.forEach(element => {
                if (element.workSpace.parent == null) {
                    listParentWp.push(element);
                }
            });
            setListWorkspaceOwn(listParentWp);
        })
    }

    const [listWorkspace, setListWorkspace] = useState([]);

    const getListWorkspace = () => {
        axios.post(ROOT_API + API_WORKSPACE_USER_SEARCH, {
            userId: JSON.parse(window.localStorage.getItem('auth_user'))?.id,
            role: "ROLE_WORKSPACE_USER",
            pageIndex: 0,
            pageSize: 100,
            status: 1
        }).then(res => {
            let listParentWp = [];
            res.data.content.forEach(element => {
                if (element.workSpace.parent == null) {
                    listParentWp.push(element);
                }
            });
            setListWorkspace(listParentWp);
        })
    }

    useEffect(() => {
        getOwnWorkspace();
        getListWorkspace();
    }, [])

    useEffect(() => {
        let userJSON = window.localStorage.getItem('auth_user');

        if (userJSON && userJSON != '') {
            //   let userData = JSON.parse(userJSON);
            //   if (moment(userData.Data.ExpiredDate) < moment()) {
            //     window.location.href = '/user/login';
            //   }
            //window.location.href = '/';
            let expireTime = window.localStorage.getItem('token_expire_time');
            if (moment(expireTime) < moment()) {
                window.location.href = '/login';
            }
        } else {
            if (!window.localStorage.getItem('isSignUp')) {
                window.location.href = '/login';
            }
            window.localStorage.removeItem('iSignUp')
            // window.location.href = '/login';
        }
    }, [])

    return (
        <Router>
            <ErrorBoundary>
                <Switch>
                    <Route path="/registration">
                        <Registration />
                    </Route>
                    <Row>
                        <Col span={4}>
                            <LeftMenuLayout
                                listWorkspaceOwn={listWorkspaceOwn}
                            />
                        </Col>
                        <Col span={20}>
                            <MenuLayout
                                getOwnWorkspace={getOwnWorkspace}
                                getListWorkspace={getListWorkspace}
                            />
                            <Suspense fallback={<LoadingSpinner />}>
                                <Route exact path="/">
                                    <StartPage
                                        listWorkspace={listWorkspace}
                                        listOwnWorkspace={listWorkspaceOwn}
                                    />
                                </Route>
                                <Route path="/custom-home">
                                    <CustomHome />
                                </Route>
                                <Route exact path="/workspace">
                                    <Home
                                        getOwnWorkspace={getOwnWorkspace}
                                        getListWorkspace={getListWorkspace}
                                    />
                                </Route>
                                <Route exact path="/board">
                                    <BoardDetail />
                                </Route>
                                <Route exact path="/profile">
                                    <ProfileManage />
                                </Route>
                                <Route exact path="/team">
                                    <Team />
                                </Route>
                            </Suspense>
                        </Col>
                    </Row>
                </Switch>

            </ErrorBoundary>
        </Router>
    );
}

export default AppContainer;
