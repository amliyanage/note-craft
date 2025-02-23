import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./components/register/LoginForm.tsx";
import RegisterForm from "./components/register/RegisterForm.tsx";
import ForgetPasswordForm from "./components/register/forgetPassword/ForgetPasswordForm.tsx";
import HomePage from "./components/wall/HomePage.tsx";
import Dashboard from "./components/Dashboard.tsx";
import SaveNotePage01 from "./components/wall/SaveNotePage01.tsx";
import NoteEditor from "./components/wall/NoteEditor.tsx";
import SummeryPage from "./components/wall/SummeryPage.tsx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store.ts";
import { JSX, useEffect } from "react";
import Loading from "./components/Loading.tsx";
import { ToastContainer } from "react-toastify";
import ViewNote from "./components/wall/ViewNote.tsx";
import { refreshToken } from "./reducer/user-slice.ts";

function App() {
    const isAuth = useSelector((state: RootState) => state.userReducer.isAuthenticated);
    const isLoading = useSelector((state: RootState) => state.loadingReducer.loading);
    const dispatch = useDispatch<AppDispatch>();
    const refreshTokenFromStore = useSelector((state: RootState) => state.userReducer.refresh_token);

    const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
        return isAuth ? children : <LoginForm />;
    };

    useEffect(() => {
        if (!refreshTokenFromStore) return;

        const refreshAccessToken = () => {
            console.log("Refreshing token");
            dispatch(refreshToken(refreshTokenFromStore));
        };

        const intervalId = setInterval(refreshAccessToken, 300000); // Refresh every 5 minutes (300000ms)

        return () => {
            clearInterval(intervalId); // Clear interval on component unmount
        };
    }, [dispatch, refreshTokenFromStore]);

    return (
        <>
            {isLoading && <Loading />}
            <ToastContainer />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/forgot" element={<ForgetPasswordForm />} />
                    <Route path="/dashboard" element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }>
                        <Route path="" element={<HomePage />} />
                        <Route path="save" element={<SaveNotePage01 />} />
                        <Route path="edit" element={<NoteEditor />} />
                        <Route path="summery" element={<SummeryPage />} />
                        <Route path="view" element={<ViewNote />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
