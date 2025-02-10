import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginForm from "./components/register/LoginForm.tsx";
import RegisterForm from "./components/register/RegisterForm.tsx";
import ForgetPasswordForm from "./components/register/forgetPassword/ForgetPasswordForm.tsx";
import HomePage from "./components/HomePage.tsx";
import Dashboard from "./components/Dashboard.tsx";
import SaveNotePage01 from "./components/wall/SaveNotePage01.tsx";

function App() {

  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <LoginForm /> } />
                <Route path="/register" element={ <RegisterForm /> } />
                <Route path="/forgot" element={ <ForgetPasswordForm /> } />
                <Route path="/dashboard" element={ <Dashboard /> } >
                    <Route path="" element={ <HomePage /> } />
                    <Route path="save" element={ <SaveNotePage01 /> } />
                </Route>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
