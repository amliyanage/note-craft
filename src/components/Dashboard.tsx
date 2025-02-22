import NavBar from "./NavBar.tsx";
import {Outlet} from "react-router-dom";
import {FormProvider} from "./wall/FormContext.tsx";

const Dashboard = () => {
    return (
        <div className="w-full h-screen px-[56px] py-[43px]" id="home">
            <FormProvider>
                <NavBar />
                <Outlet />
            </FormProvider>
        </div>
    )
}

            export default Dashboard;