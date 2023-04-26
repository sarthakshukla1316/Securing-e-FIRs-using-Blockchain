import './App.css';
import Login from './pages/Login';
import Register from './pages/register';
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLoadingWithRefresh } from './hooks/useLoadingWithRefresh';

import Home from './pages/Home';
import OfficerLogin from './pages/Officer/OfficerLogin';

import FileComplaint from './pages/FileComplaint';
import CustomerDashboard from './pages/Customer/CustomerDashboard';

function App() {
  const { loading } = useLoadingWithRefresh();
  const { user } = useSelector((state) => state.auth) || {};
  console.log(user);

  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <Router>
      <Routes>
        <Route
          path="/customer/register"
          element={
            <GuestRoute>
              <Register />
            </GuestRoute>
          }
        />
        <Route
          exact
          path="/customer/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route
          path="complaint/new"
          exact
          element={<FileComplaint />}
        />
        <Route
          path="officer/login"
          element={
            <GuestRoute>
              <OfficerLogin />
            </GuestRoute>
          }
        />

        <Route
          exact
          path="/"
          element={<HomeComp />}
        />
      </Routes>
    </Router>
  );
}

const HomeComp = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const user = useSelector((state) => state.auth.user);

  if (!isAuth) {
    return <Home />;
  }

  switch (user?.role) {
    case 0:
      return <CustomerDashboard />;
      break;
      return;
    default:
      break;
  }
};

const GuestRoute = ({ children }) => {
  const location = useLocation();
  const { isAuth } = useSelector((state) => state.auth);

  return isAuth ? (
    <Navigate
      replace
      to={{
        pathname: '/',
        state: { from: location },
      }}
    />
  ) : (
    children
  );
};

const PublicRoute = ({ children }) => {
  const location = useLocation();
  const { isAuth } = useSelector((state) => state.auth);

  return children;
};

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { isAuth } = useSelector((state) => state.auth);
  return !isAuth ? (
    <Navigate
      replace
      to={{
        pathname: '/',
        state: { from: location },
      }}
    />
  ) : (
    children
  );
};

export default App;
