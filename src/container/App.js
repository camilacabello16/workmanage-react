import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import AppContainer from 'components/layout/AppContainer';
import { Row } from 'antd';
import Login from 'pages/login/Login';
import Registration from 'pages/registation/Registration';

const App = () => {


    return (
        <Router>
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/">
                    <AppContainer />
                </Route>
                {/* <Route path="/registration">
                    <Registration />
                </Route> */}
            </Switch>
        </Router>
    );
}

export default App;
