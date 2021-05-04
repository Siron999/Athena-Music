import React from 'react';
import {BrowserRouter as Router, Switch,Route} from "react-router-dom";
import {Titlebar} from "./components/titlebar/Titlebar";
import {NavbarComponent} from "./components/navbar/Navbar";
import {HomePage} from "./pages/HomePage";
import {AddForm} from "./pages/Addform";

export const App = () => {
    return (
        <Router>
            <Titlebar />
            <div className={"d-flex flex-row"} style={{marginTop:"35px"}}>
                <NavbarComponent />
                <Switch>
                    <Route path="/add" exact component={AddForm}/>
                    <Route path="" exact component={HomePage}/>
                </Switch>
            </div>

        </Router>
    )
}