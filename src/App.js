import './App.css';
import Login from './pages/Login';

import { BrowserRouter as Router, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useLoadingWithRefresh } from './hooks/useLoadingWithRefresh';

import Home from './pages/Home';
import OfficerLogin from './pages/Officer/OfficerLogin';
import FileFIR from './pages/Officer/FileFIR';

import { ToastContainer } from 'react-toastify';
// import FileComplaint from './pages/FileComplaint';
import CustomerDashboard from './pages/Customer/CustomerDashboard';
import FileComplaint from './pages/FileComplaint';
import ComplaintStatus from './pages/Customer/Complaints/ComplaintStatus';
import CustomerComplaintsList from './pages/Customer/Complaints/CustomerComplaintsList';
import OfficerDashboard from './pages/Officer/OfficerDashboard';

function App() {
  const { loading } = useLoadingWithRefresh();
  const { user, isAuth } = useSelector((state) => state.auth) || {};
  console.log({ user, isAuth });
  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route
          path="/officer/login"
          element={
            <GuestRoute>
              {/* Same as */}

              <OfficerLogin />
            </GuestRoute>
          }
        />

        <Route
          exact
          path="/customer/login"
          element={
            <GuestRoute>
              {/* Same as */}

              <Login />
            </GuestRoute>
          }
        />

        <Route
          path="/complaint/new"
          element={
            <ProtectedRoute>
              <FileComplaint />
            </ProtectedRoute>
          }
        />
        {isAuth && user.role == 1 && (
          <Route
            exact
            path="/"
            element={
              <OfficerRoute>
                <OfficerDashboard />
              </OfficerRoute>
            }
          />
        )}

        {isAuth && !user?.role && (
          <Route
            exact
            path="/"
            element={
              <ProtectedRoute>
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />
        )}

        <Route
          exact
          path="/"
          element={<HomeComp />}
        />
        <Route
          path="/complaint/status/:aadhar/:id"
          element={
            <ProtectedRoute>
              <ComplaintStatus />
            </ProtectedRoute>
          }
        />
        <Route
          path="/fir/status/:aadhar/:id"
          element={
            <OfficerRoute>
              <FileFIR />
            </OfficerRoute>
          }
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

const OfficerRoute = ({ children }) => {
  const location = useLocation();
  const { isAuth, user } = useSelector((state) => state.auth);
  return !isAuth || user?.role !== 1 ? (
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
