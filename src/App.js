import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/register";
import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
    useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";

import { useLoadingWithRefresh } from "./hooks/useLoadingWithRefresh";

import Home from "./pages/Home";
import OfficerLogin from "./pages/Officer/OfficerLogin";
import FileFIR from "./pages/Officer/FileFIR";

import { ToastContainer } from "react-toastify";
// import FileComplaint from './pages/FileComplaint';
import CustomerDashboard from "./pages/Customer/CustomerDashboard";
import FileComplaint from "./pages/FileComplaint";
import ComplaintStatus from "./pages/Customer/Complaints/ComplaintStatus";
import CustomerComplaintsList from "./pages/Customer/Complaints/CustomerComplaintsList";

function App() {
    const { loading } = useLoadingWithRefresh();
    const { user } = useSelector((state) => state.auth) || {};

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
                    path="officer/login"
                    element={
                        <GuestRoute>
                            <OfficerLogin />
                        </GuestRoute>
                    }
                />
                <Route
                    path="/FIR/:aadhar"
                    element={
                        <>
                            <ToastContainer />
                            <FileFIR />
                        </>
                    }
                />

                <Route exact path="/" element={<HomeComp />} />
                <Route
                    path="/complaint/new"
                    element={
                        <>
                            <ToastContainer />
                            <FileComplaint />
                        </>
                    }
                />
                <Route
                    path="/complaint/status/:aadhar"
                    element={
                        <>
                            <ToastContainer />
                            <ComplaintStatus />
                        </>
                    }
                />
                <Route
                    path="/home"
                    element={
                        <>
                            <ToastContainer />
                            <CustomerComplaintsList />
                        </>
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
                pathname: "/",
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
                pathname: "/",
                state: { from: location },
            }}
        />
    ) : (
        children
    );
};

export default App;
