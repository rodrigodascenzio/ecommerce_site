import React, { useContext } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import {
  Browse,
  SignIn,
  ProductDetail,
  ConfirmCode,
  Register,
  Cart,
  Orders,
  OrderDetail,
  NotFound,
  Profile,
} from "./pages";
import * as ROUTES from "./constants/routes";
import { IsUserRedirect, ProtectedRoute } from "./helpers/routes";
import { Context } from "./store/Store";

export function App() {
  const { state } = useContext(Context);
  const { user, companyDoesntExist, host } = state;

  if (companyDoesntExist) {
    return <NotFound />;
  }

  return (
    <Router>
      <Switch>
        <IsUserRedirect user={user} loggedInPath={ROUTES.HOME} path={ROUTES.SIGN_IN}>
          <SignIn />
        </IsUserRedirect>

        <ProtectedRoute user={true} path={ROUTES.EMAIL}>
          <SignIn />
        </ProtectedRoute>

        <ProtectedRoute user={true} path={ROUTES.SMS}>
          <SignIn />
        </ProtectedRoute>

        <ProtectedRoute user={true} path={ROUTES.CONFIRM_CODE}>
          <ConfirmCode />
        </ProtectedRoute>

        <IsUserRedirect user={user} loggedInPath={ROUTES.HOME} path={ROUTES.REGISTER}>
          <Register />
        </IsUserRedirect>

        <ProtectedRoute user={true} path={ROUTES.PRODUCT_DETAIL}>
          <ProductDetail />
        </ProtectedRoute>

        <ProtectedRoute user={user} path={ROUTES.CART}>
          <Cart />
        </ProtectedRoute>

        <ProtectedRoute user={user} path={ROUTES.PROFILE}>
          <Profile />
        </ProtectedRoute>

        <ProtectedRoute user={user} path={ROUTES.ORDERS}>
          <Orders />
        </ProtectedRoute>

        <ProtectedRoute exact user={true} path={ROUTES.HOME}>
          <Browse />
        </ProtectedRoute>

        <ProtectedRoute user={user} path={ROUTES.ORDER_DETAIL}>
          <OrderDetail />
        </ProtectedRoute>

        <ProtectedRoute user={true} path={ROUTES.NOT_FOUND}>
          <NotFound />
        </ProtectedRoute>

        <IsUserRedirect user={user} loggedInPath={ROUTES.HOME} path={ROUTES.HOME}>
          <Browse />
        </IsUserRedirect>
      </Switch>
    </Router>
  );
}
