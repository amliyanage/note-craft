import googleIcon from '../../assets/icons/Google-icon.png'
import {Link} from "react-router-dom";
import registerImg from '../../assets/register-form-img.png'

const RegisterForm = () => {



    return (
        <div className="flex justify-center items-center w-full h-screen">
            <div className="flex justify-center items-center gap-48">
                <div>
                    <img src={registerImg} alt="register form img" className="mb-14"/>
                </div>
                <form action="" className="w-[450px] flex flex-col items-center">
                    <h6 className="font-semibold text-[28px] text-[000000] mb-[25px]">Sign in to Note Craft</h6>
                    <button
                        className="google w-full flex justify-center gap-[16px] border-[1px] items-center border-[#E7E7E9] py-[17px] rounded-[25px] mb-[16px]">
                        <img src={googleIcon} alt="google icon"/>
                        <span className="text-[14px] font-[600] text-[#000]">Sign Up with Google</span>
                    </button>
                    <div className="or flex gap-[15px] items-center mb-[42px]">
                        <hr className="w-[145px] border-[#E7E7E9]"/>
                        <span className="text-[#6E6D7A] text-[12px] font-[400]">or sign Up with email</span>
                        <hr className="w-[145px] border-[#E7E7E9]"/>
                    </div>
                    <div className="w-full mb-[25px] flex gap-[20px]">
                        <div>
                            <label className="text-[#000] text-[12px] font-[600] mb-[4px]">Username</label>
                            <input
                                className="w-full border-[2px] border-[#E7E7E9] h-[50px] p-[10px] font-[18px] font-[600] rounded-[9px]"
                                type="text"/>
                        </div>
                        <div>
                            <label className="text-[#000] text-[12px] font-[600] mb-[4px]">Password</label>
                            <input
                                className="w-full border-[2px] border-[#E7E7E9] h-[50px] p-[10px] font-[18px] font-[600] rounded-[9px]"
                                type="password"/>
                        </div>
                    </div>
                    <div className="w-full mb-[20px]">
                        <div className="flex w-full justify-between mb-[4px]">
                            <label className="text-[#000] text-[12px] font-[600]">Name</label>
                            <span
                                className="text-[12px] font-[400] text-[#000] underline decoration-1">Forgot ?
                                </span>
                        </div>
                        <input type="text"
                               className="w-full border-[2px] border-[#E7E7E9] h-[50px] p-[10px] font-[18px] font-[600] rounded-[9px]"/>
                    </div>
                    <div className="w-full mb-[25px]">
                        <div>
                            <label className="text-[#000] text-[12px] font-[600] mb-[4px]">Email</label>
                            <input
                                className="w-full border-[2px] border-[#E7E7E9] h-[50px] p-[10px] font-[18px] font-[600] rounded-[9px]"
                                type="text"/>
                        </div>
                    </div>
                    <div className="w-full mb-[25px]">
                        <div>
                            <label className="text-[#000] text-[12px] font-[600] mb-[4px]">Profile Picture</label>
                            <input
                                className="w-full border-[2px] border-[#E7E7E9] h-[50px] text-[#A8A8A8] p-[10px] font-[18px] rounded-[9px]"
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
    )
}

export default RegisterForm