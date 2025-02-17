import forgetPasswordFormImg from '../../../assets/forget-password-form-img.png';
import {useState} from "react";
import EmailForm from "./EmailForm.tsx";
import OTPForm from "./OTPForm.tsx";

const ForgetPasswordForm = () => {

    const [form, setForm] = useState("emailForm")
    const [email, setEmail] = useState<string>("")

    const handleForm = (form: string , email : string) => {
        console.log("form", form)
        console.log("email", email)
        setEmail(email)
        setForm(form)
    }

    return (
        <div className="flex w-full h-screen justify-center items-center">
            <div className="flex justify-center items-center gap-52">
                <div>
                    { form === "emailForm" ? <EmailForm handleForm={handleForm}/> : <OTPForm email={email} /> }
                </div>
                <div className="flex justify-center items-center">
                    <img src={forgetPasswordFormImg} alt="forget password form image" className="mb-14"/>
                </div>
            </div>
        </div>
    );
}

export default ForgetPasswordForm;