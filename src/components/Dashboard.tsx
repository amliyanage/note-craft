import NavBar from "./NavBar.tsx";
import {Outlet} from "react-router-dom";

const Dashboard = () => {
    return (
        <div className="w-full h-screen px-[56px] py-[43px]" id="home">
            <NavBar />
            <Outlet />
        </div>
    )
}

            export default Dashboard;