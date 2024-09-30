import React from "react";
import { Route, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function ProtectedRoutes({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      element={() => {
        // get cookie from browser if logged in
        const token = cookies.get("TOKEN");

        // return route if there is a valid token set in the cookie
        return token ? (
          <Component />
        ) : (
          // redirect the user to the landing page if there is no valid token set
          <Navigate
            to={{
              pathname: "/",
              state: {
                // sets the location a user was about to access before being redirected to login
                from: rest.location,
              },
            }}
          />
        );
      }}
    />
  );
}
