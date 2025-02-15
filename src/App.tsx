import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginForm from "./components/register/LoginForm.tsx";
import RegisterForm from "./components/register/RegisterForm.tsx";
import ForgetPasswordForm from "./components/register/forgetPassword/ForgetPasswordForm.tsx";
import HomePage from "./components/wall/HomePage.tsx";
import Dashboard from "./components/Dashboard.tsx";
import SaveNotePage01 from "./components/wall/SaveNotePage01.tsx";
import NoteEditor from "./components/wall/NoteEditor.tsx";
import SummeryPage from "./components/wall/SummeryPage.tsx";
import {useSelector} from "react-redux";
import {RootState} from "./store/store.ts";
import {JSX} from "react";

function App() {
    const isAuth = useSelector((state : RootState ) => state.userReducer.isAuthenticated);

    const ProtectedRoute = ({ children } : { children : JSX.Element }) => {
        return isAuth ? children : <LoginForm />
    }

  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <LoginForm /> } />
                <Route path="/register" element={ <RegisterForm /> } />
                <Route path="/forgot" element={ <ForgetPasswordForm /> } />

                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                } >
                    <Route path="" element={ <HomePage /> } />
                    <Route path="save" element={ <SaveNotePage01 /> } />
                    <Route path="edit" element={ <NoteEditor /> } />
                    <Route path="summery" element={ <SummeryPage /> } />
                </Route>

            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
