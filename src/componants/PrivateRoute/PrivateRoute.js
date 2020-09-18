import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { userContext } from '../../App';

const PrivateRoute = ({ children, ...rest }) => {
    const [loggedUser,setLoggedUser] = useContext(userContext);
    return (
        <Route
      {...rest}
      render={({ location }) =>
        loggedUser.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/Login",
              state: { from: location }
            }}
          />
        )
      }
    />
    );
};

export default PrivateRoute;