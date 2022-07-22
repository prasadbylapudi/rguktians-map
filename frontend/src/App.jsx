import React from 'react';
import { Router, Switch, Route } from "react-router-dom";

import StudentForm from "./components/StudentForm";
import Home from "./components/Home";
import History from './components/History';

function App() {
  return (
    <div className="App">
    <Router history={History}>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/student-form" component={StudentForm} />
        </Switch>
    </Router>
    </div>
  );
}

export default App;
