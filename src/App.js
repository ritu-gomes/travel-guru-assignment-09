import React, { createContext, useState } from 'react';
import './App.css';
import NavBar from './componants/NavBar/NavBar';
import Home from './componants/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Booking from './componants/Booking/Booking';
import NotFound from './componants/NotFound/NotFound';
import Hotel from './componants/Hotel/Hotel';
import Login from './componants/Login/Login';
import PrivateRoute from './componants/PrivateRoute/PrivateRoute';

export const placeContext = createContext();
export const userContext = createContext();
export const destinationContext = createContext();

function App() {
  const [detail,setDetail] = useState([]);
  const [loggedUser,setLoggedUser] = useState({});
  const[typedPlace,setTypedPlace] = useState('');
  return (
    <placeContext.Provider value={[detail,setDetail]}>
      <userContext.Provider value={[loggedUser,setLoggedUser]}>
        <destinationContext.Provider value={[typedPlace,setTypedPlace]}>
          <Router>
            <NavBar></NavBar>
            <Switch>
              <Route path="/Home">
                <Home></Home>
              </Route>
              <Route path="/Booking/:id">
                <Booking></Booking>
              </Route>
              <PrivateRoute path="/Hotel">
                <Hotel></Hotel>
              </PrivateRoute>
              <Route path="/Login">
                <Login></Login>
              </Route>
              <Route exact path="/">
                <Home></Home>
              </Route>
              <Route path="*">
                <NotFound></NotFound>
              </Route>
            </Switch>
          </Router>
        </destinationContext.Provider>
      </userContext.Provider>
    </placeContext.Provider>
  );
}

export default App;
