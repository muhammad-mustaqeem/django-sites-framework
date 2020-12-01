import {BrowserRouter as Router, Route} from "react-router-dom";
import React from "react";
import LoginPage from "./containers/LoginPage";
import HomePage from "./containers/HomePage";
import { Provider } from 'react-redux';
import {store} from "./store";
import RegistrationPage from "./containers/RegistrationPage";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Route path='/' exact component={LoginPage}/>
                <Route path='/register' exact component={RegistrationPage}/>
                <Route path='/home' exact component={HomePage}/>
            </Router>
        </Provider>
    );
}

export default App;
