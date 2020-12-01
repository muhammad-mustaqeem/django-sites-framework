import {BrowserRouter as Router, Route} from "react-router-dom";
import React from "react";
import LoginPage from "./containers/LoginPage";
import HomePage from "./containers/HomePage";
import { Provider } from 'react-redux';
import {store} from "./store";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Route path='/' exact component={LoginPage}/>
                <Route path='/home' exact component={HomePage}/>
            </Router>
        </Provider>
    );
}

export default App;
