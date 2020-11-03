import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import IconSettings from "@salesforce/design-system-react/components/icon-settings";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index";

import Header from "./blocks/Header";
import ImageArticle from "./blocks/ImageArticle";
import TwoColumns from "./blocks/TwoColumns";

ReactDOM.render(
    <React.StrictMode>
        <IconSettings iconPath="/icons">
            <Provider store={store}>
                <Router>
                    <Route exact path="/" component={App} />
                    <Route exact path="/header" component={Header} />
                    <Route exact path="/imageArticle" component={ImageArticle} />
                    <Route exact path="/twoColumns" component={TwoColumns} />
                </Router>
            </Provider>
        </IconSettings>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
