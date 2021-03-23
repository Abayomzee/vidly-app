import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../../services/authService";

const ProtectedRoute = ({ path, render, component: Component, ...props }) => {
  const user = auth.getCurrentUser();
  return (
    <Route
      {...props}
      render={(props) => {
        console.log(props);
        if (!user)
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
