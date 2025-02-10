import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginForm from "./components/register/LoginForm.tsx";
import RegisterForm from "./components/register/RegisterForm.tsx";
import ForgetPasswordForm from "./components/register/forgetPassword/ForgetPasswordForm.tsx";
import HomePage from "./components/HomePage.tsx";

function App() {

  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <LoginForm /> } />
                <Route path="/register" element={ <RegisterForm /> } />
                <Route path="/forgot" element={ <ForgetPasswordForm /> } />
                <Route path="/home" element={ <HomePage /> } >

                </Route>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
