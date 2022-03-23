import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import AppContainer from 'components/layout/AppContainer';
import { Row  } from 'antd';
import Login from 'pages/login/Login';

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
            </Switch>
        </Router>
    );
}

export default App;
