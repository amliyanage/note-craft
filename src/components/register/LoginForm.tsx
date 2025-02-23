import fringerPrintIcon from '../../assets/icons/fringer-print-icon.png'
import loginImg from '../../assets/login-form-img.png'
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {AppDispatch, RootState} from "../../store/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {googleLogin, loginUser} from "../../reducer/user-slice.ts";
import {setLoading} from "../../reducer/loading-slice.ts";
import { Eye, EyeOff } from "lucide-react";
import {CredentialResponse, GoogleLogin, GoogleOAuthProvider} from "@react-oauth/google";
import {toast} from "react-toastify";

const LoginForm = () => {

    const isAuth = useSelector((state : RootState ) => state.userReducer.isAuthenticated);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const dispatch = useDispatch<AppDispatch>();
    const [tempLoading, setTempLoading] = useState<boolean>(false);
    const isLoading = useSelector((state : RootState ) => state.userReducer.loading);
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState<boolean>(false);

    useEffect(() => {
        console.log("isAuth", isAuth)
        if(isAuth){
            dispatch(setLoading(false))
            //navigate("/dashboard")
        }
    }, [isAuth]);

    const handleLogin = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setTempLoading(true)
        const loginData = {
            userName: username,
            password: password
        }
        dispatch(loginUser(loginData))
        setTempLoading(false)
    }

    useEffect(() => {
        setTempLoading(true)
    }, [!isLoading]);

    useEffect(() => {
        if(isLoading){
            dispatch(setLoading(true))
        } else if (!isLoading && !tempLoading){
            dispatch(setLoading(false))
            console.log("Navigating to dashboard")
            navigate("/dashboard")
        }
    }, [isLoading]);

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
        dispatch(googleLogin(sendToken));
        setTempLoading(false)
    };

    const responseGoogleError = (response: CredentialResponse) => {
        console.log("Google sign-in failed ", response);
        toast.error('Google sign-in failed.');
    }


    return(
        <div className="w-full h-screen flex justify-center items-center">
            <div className="w-auto h-auto flex justify-center items-center gap-44">
                <form onSubmit={handleLogin} className="w-[450px] flex flex-col items-center">
                    <h6 className="font-[600] text-[28px] text-[000000] mb-[25px]">Sign in to Note Craft</h6>
                    {/*<button*/}
                    {/*    className="google w-full flex justify-center gap-[16px] border-[1px] items-center border-[#E7E7E9] py-[17px] rounded-[25px] mb-[16px]">*/}
                    {/*    <img src={googleIcon} alt="google icon"/>*/}
                    {/*    <span className="text-[12px] font-[600] text-[#000]">Sign in with Google</span>*/}
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
                            text="signin_with"
                            logoAlignment="left"
                            width={400}
                        />
                    </GoogleOAuthProvider>

                    <div className="or flex gap-[15px] items-center mb-[42px] mt-[16px]">
                        <hr className="w-[145px] border-[#E7E7E9]"/>
                        <span className="text-[#6E6D7A] text-[11px] font-[400]">or sign in with email</span>
                        <hr className="w-[145px] border-[#E7E7E9]"/>
                    </div>
                    <div className="w-full mb-[25px]">
                        <label className="text-[#000] text-[11px] font-[600] mb-[4px]">Username</label>
                        <input
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full border-[2px] border-[#E7E7E9] h-[50px] p-[10px] font-[18px] font-[600] rounded-[9x]"
                            type="text"/>
                    </div>
                    <div className="w-full mb-[20px]">
                        <div className="flex w-full justify-between mb-[4px]">
                            <label className="text-[#000] text-[11px] font-[600]">Password</label>
                            <span
                                className="text-[11px] font-[400] text-[#000] underline decoration-1">
                                    <Link to="/forgot">Forgot ?</Link>
                                </span>
                        </div>
                        {/* Password Input Field */}
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border-[2px] border-[#E7E7E9] h-[50px] p-[10px] font-[18px] font-[600] rounded-[9px] pr-10"
                            />
                            {/* Eye Icon Button */}
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-3 flex items-center text-gray-600">
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>
                    <button type="submit"
                            className="w-full flex justify-center border-[1px] py-[17px] rounded-[25px] bg-[#000] font-[600] text-[12px] text-[#FFF] mb-[14px]">Sign
                        in
                    </button>
                    <div className="signUp flex items-center gap-1 mb-[33px] mt-[10px]">
                        <span className="text-[12px] font-[400] text-[#000]">Don't have an account ?</span>
                        <Link to="/register" className="text-[12px] font-[400] text-[#000] underline decoration-1">Sign
                            Up</Link>
                    </div>
                    {/*<div className="or flex gap-[15px] items-center mb-[33px]">*/}
                    {/*    <hr className="w-[145px] border-[#E7E7E9]"/>*/}
                    {/*    <span className="text-[#6E6D7A] text-[11px] font-[400]">or</span>*/}
                    {/*    <hr className="w-[145px] border-[#E7E7E9]"/>*/}
                    {/*</div>*/}
                    <div className="fringerprint">
                        {/*<img className="h-[36px] w-[36px]" src={fringerPrintIcon} alt="fringer print icon"/>*/}
                    </div>
                </form>
                <div className="flex justify-center items-center">
                    <img src={loginImg} alt="login form img" className="mb-14"/>
                </div>
            </div>
        </div>
    )
}

export default LoginForm;