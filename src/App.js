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
                    exact
                    path="/register"
                    element={
                        <GuestRoute>
                            <Register />
                        </GuestRoute>
                    }
                />
                <Route
                    exact
                    path="/login"
                    element={
                        <GuestRoute>
                            <Login />
                        </GuestRoute>
                    }
                />
                <Route
                    exact
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

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
                pathname: "/login",
                state: { from: location },
            }}
        />
    ) : (
        children
    );
};

export default App;
