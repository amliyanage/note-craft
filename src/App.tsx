import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginForm from "./components/register/LoginForm.tsx";

function App() {

  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <LoginForm /> } />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
