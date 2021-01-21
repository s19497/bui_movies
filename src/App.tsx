import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.scss';
import MainPage from "./main_page/MainPage/MainPage";
import MoviePage from "./main_page/MoviePage/MoviePage";
import Switch from "react-bootstrap/Switch";

function App() {
    return (
        <div className="App">
            <Router>
                <Route path="/movie/:id" component={MoviePage}/>
                <Route path="/" exact={true} component={MainPage}/>
            </Router>
        </div>
    );
}

export default App;
