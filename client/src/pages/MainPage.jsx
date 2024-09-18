import React from "react";
import Navbar from "./components/Navbar";
import ActionPanel from "./components/ActionPanel";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function MainPage() {
    return (
        <Router>
            <div className="main-page">
                <Header>DND Style Game</Header>
                <Switch>
                    <Route path="/action" component={ActionPanel} />
                    <Route path="/nav" component={Navbar} />
                </Switch>
                <Footer></Footer>
            </div>
        </Router>
    );
}
export default MainPage;