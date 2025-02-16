import {Link, useNavigate} from "react-router-dom";
import registerImg from '../../assets/register-form-img.png'
import {useEffect, useState} from "react";
import {User} from "../../model/User.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store.ts";
import {googleSignUp, registerUser} from "../../reducer/user-slice.ts";
import {setLoading} from "../../reducer/loading-slice.ts";
import {toast} from "react-toastify";
import {CredentialResponse, GoogleLogin, GoogleOAuthProvider} from "@react-oauth/google";

const RegisterForm = () => {

    const [user, setUser] = useState<User>({});
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [file, setFile] = useState<File>();
    const [tempLoading, setTempLoading] = useState(false);
    const [termsChecked, setTermsChecked] = useState(false);

    const isAuth = useSelector((state: RootState) => state.userReducer.isAuthenticated);
    const pending = useSelector((state: RootState) => state.userReducer.loading);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            setTempLoading(true);
            const formData = new FormData();
            formData.append("userName", user.userName as string);
            formData.append("password", user.password as string);
            formData.append("name", user.name as string);
            formData.append("email", user.email as string);
            formData.append("profilePic", file as File);
            formData.append("fp", "false");
            dispatch(registerUser(formData));
        }
    };

    useEffect(() => {
        setTempLoading(true);
    }, [!pending]);

    useEffect(() => {
        if (pending) {
            dispatch(setLoading(true));
        } else if (!pending && tempLoading) {
            toast.success('User registered successfully.');
            dispatch(setLoading(false));
            navigate("/");
        }
    }, [pending]);

    useEffect(() => {
        if (isAuth) {
            navigate("/dashboard");
        }
    }, [isAuth]);

    const validateForm = () => {
        let isValid = true;

        // Name validation (only letters, first letter capital)
        const namePattern = /^[A-Z][a-z]+( [A-Z][a-z]+)*$/;
        if (!namePattern.test(user.name || '')) {
            toast.error('Name must contain only letters and start with a capital letter.');
            isValid = false;
        }

        // Username validation (only lowercase letters)
        const usernamePattern = /^[a-z]+$/;
        if (!usernamePattern.test(user.userName || '')) {
            toast.error('Username must contain only lowercase letters.');
            isValid = false;
        }

        // Password validation (8-16 characters)
        const passwordPattern = /^[0-9]{8,16}$/;
        if (!passwordPattern.test(user.password || '')) {
            toast.error('Password must be between 8 to 16 digits.');
            isValid = false;
        }

        // Check if all fields are filled
        if (!user.userName || !user.password || !user.name || !user.email || !file) {
            toast.error('All fields must be filled.');
            isValid = false;
        }

        // Check if terms and conditions are accepted
        if (!termsChecked) {
            toast.error('You must accept the terms and conditions.');
            isValid = false;
        }

        return isValid;
    };

    const responseGoogle = async (response: CredentialResponse) => {
        if (!response.credential) {
            console.log("Google sign-in failed");
            return;
        }
        setTempLoading(true)
        const token = response.credential;
        console.log("Google sign-in successful ",token);
        const sendToken = {
            token: token
        } as { token: string };
        dispatch(googleSignUp(sendToken));
    };

    const responseGoogleError = (response: CredentialResponse) => {
        console.log("Google sign-in failed ", response);
        toast.error('Google sign-in failed.');
    }


    return (
        <>

            <div className="flex justify-center items-center w-full h-screen">
                <div className="flex justify-center items-center gap-48">
                    <div>
                        <img src={registerImg} alt="register form img" className="mb-14"/>
                    </div>
                    <form onSubmit={handleSubmit} className="w-[450px] flex flex-col items-center">
                        <h6 className="font-semibold text-[28px] text-[000000] mb-[25px]">Sign in to Note Craft</h6>
                        {/*<button*/}
                        {/*    className="google w-full flex justify-center gap-[16px] border-[1px] items-center border-[#E7E7E9] py-[17px] rounded-[25px] mb-[16px]">*/}
                        {/*    <img src={googleIcon} alt="google icon"/>*/}
                        {/*    <span className="text-[14px] font-[600] text-[#000]">Sign Up with Google</span>*/}
                        {/*</button>*/}

                        <GoogleOAuthProvider clientId="132334420071-ueo25rncec0jl51hpve4fvl8s73u5t61.apps.googleusercontent.com">
                            <GoogleLogin
                                onSuccess={responseGoogle}
                                onError={() => responseGoogleError}
                                cookiePolicy='single_host_origin'
                                theme="outline"
                                logo_alignment="center"
                                size="large"
                                shape="circle"
                                text="signup_with"
                                logoAlignment="left"
                                width={400}
                            />
                        </GoogleOAuthProvider>



                        <div className="or flex gap-[15px] items-center mb-[42px] mt-[16px]">
                            <hr className="w-[145px] border-[#E7E7E9]"/>
                            <span className="text-[#6E6D7A] text-[12px] font-[400]">or sign Up with email</span>
                            <hr className="w-[145px] border-[#E7E7E9]"/>
                        </div>
                        <div className="w-full mb-[25px] flex gap-[20px]">
                            <div>
                                <label className="text-[#000] text-[12px] font-[600] mb-[4px]">Username</label>
                                <input
                                    className="w-full border-[2px] border-[#E7E7E9] h-[50px] p-[10px] font-[18px] font-[600] rounded-[9px]"
                                    onChange={handleChange} name="userName"
                                    type="text"/>
                            </div>
                            <div>
                                <label className="text-[#000] text-[12px] font-[600] mb-[4px]">Password</label>
                                <input
                                    className="w-full border-[2px] border-[#E7E7E9] h-[50px] p-[10px] font-[18px] font-[600] rounded-[9px]"
                                    onChange={handleChange} name="password"
                                    type="password"/>
                            </div>
                        </div>
                        <div className="w-full mb-[20px]">
                            <div className="flex w-full justify-between mb-[4px]">
                                <label className="text-[#000] text-[12px] font-[600]">Name</label>
                            </div>
                            <input type="text"
                                   className="w-full border-[2px] border-[#E7E7E9] h-[50px] p-[10px] font-[18px] font-[600] rounded-[9px]"
                                   onChange={handleChange} name="name"
                            />
                        </div>
                        <div className="w-full mb-[25px]">
                            <div>
                                <label className="text-[#000] text-[12px] font-[600] mb-[4px]">Email</label>
                                <input
                                    className="w-full border-[2px] border-[#E7E7E9] h-[50px] p-[10px] font-[18px] font-[600] rounded-[9px]"
                                    onChange={handleChange} name="email"
                                    type="text"/>
                            </div>
                        </div>
                        <div className="w-full mb-[25px]">
                            <div>
                                <label className="text-[#000] text-[12px] font-[600] mb-[4px]">Profile Picture</label>
                                <input
                                    className="w-full border-[2px] border-[#E7E7E9] h-[50px] text-[#A8A8A8] p-[10px] font-[18px] rounded-[9px]"
                                    onChange={(e) => setFile(e.target.files?.[0])} name="profilePic"
                                    type="file"/>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 justify-start w-full mb-[25px]">
                            <div className="flex justify-center items-center">
                                <label className="container">
                                    <input
                                        value="wedding-gift"
                                        className="peer cursor-pointer hidden after:opacity-100"
                                        type="checkbox"
                                        onChange={() => setTermsChecked(!termsChecked)}
                                    />
                                    <span
                                        className="inline-block w-[15px] h-[15px] border-2 relative cursor-pointer after:content-[''] after:absolute after:top-2/4 after:left-2/4 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[10px] after:h-[10px] after:bg-[#333] after:rounded-[2px] after:opacity-0 peer-checked:after:opacity-100"
                                    ></span>
                                </label>
                            </div>
                            <span
                                className="text-[#000] text-[14px] font-[400]">Accept all terms and conditions
                            </span>
                        </div>
                        <button type="submit"
                                className="w-full flex justify-center border-[1px] py-[17px] rounded-[25px] bg-[#000] font-[600] text-[#FFF] mb-[14px]">Sign
                            in
                        </button>
                        <div className="signUp flex items-center gap-1 mb-[33px] mt-[10px]">
                            <span className="text-[13px] font-[400] text-[#000]">if you have an account ?</span>
                            <Link to="/" className="text-[13px] font-[400] text-[#000] underline decoration-1">Sign
                                In</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default RegisterForm