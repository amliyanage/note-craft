import googleIcon from '../../assets/icons/Google-icon.png'
import fringerPrintIcon from '../../assets/icons/fringer-print-icon.png'
import loginImg from '../../assets/login-form-img.png'
import {Link} from "react-router-dom";

const LoginForm = () => {
    return(
        <div className="w-full h-screen flex justify-center items-center">
            <div className="w-auto h-auto flex justify-center items-center gap-44">
                <form action="" className="w-[450px] flex flex-col items-center">
                    <h6 className="font-[600] text-[28px] text-[000000] mb-[25px]">Sign in to Note Craft</h6>
                    <button
                        className="google w-full flex justify-center gap-[16px] border-[1px] items-center border-[#E7E7E9] py-[17px] rounded-[25px] mb-[16px]">
                        <img src={googleIcon} alt="google icon"/>
                        <span className="text-[12px] font-[600] text-[#000]">Sign in with Google</span>
                    </button>
                    <div className="or flex gap-[15px] items-center mb-[42px]">
                        <hr className="w-[145px] border-[#E7E7E9]"/>
                        <span className="text-[#6E6D7A] text-[11px] font-[400]">or sign in with email</span>
                        <hr className="w-[145px] border-[#E7E7E9]"/>
                    </div>
                    <div className="w-full mb-[25px]">
                        <label className="text-[#000] text-[11px] font-[600] mb-[4px]">Username or Email</label>
                        <input
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
                        <input type="password"
                               className="w-full border-[2px] border-[#E7E7E9] h-[50px] p-[10px] font-[18px] font-[600] rounded-[9x]"/>
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
                    <div className="or flex gap-[15px] items-center mb-[33px]">
                        <hr className="w-[145px] border-[#E7E7E9]"/>
                        <span className="text-[#6E6D7A] text-[11px] font-[400]">or</span>
                        <hr className="w-[145px] border-[#E7E7E9]"/>
                    </div>
                    <div className="fringerprint">
                        <img className="h-[36px] w-[36px]" src={fringerPrintIcon} alt="fringer print icon"/>
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