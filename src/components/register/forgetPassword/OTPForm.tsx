import {Link, useNavigate} from "react-router-dom";
import googleIcon from "../../../assets/icons/Google-icon.png";
import fringerprint from "../../../assets/icons/fringer-print-icon.png";
import {AppDispatch, RootState} from "../../../store/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {CheckOTP} from "../../../reducer/user-slice.ts";
import {setLoading} from "../../../reducer/loading-slice.ts";

const OTPForm = ({email} : {email : string}) => {

    const dispatch = useDispatch<AppDispatch>();
    const [otp, setOtp] = useState<string>("");
    const isAuth = useSelector((state : RootState ) => state.userReducer.isAuthenticated);
    const navigate = useNavigate()
    const [tempLoading, setTempLoading] = useState<boolean>(false);
    const isLoading = useSelector((state : RootState ) => state.userReducer.loading);

    const handleNextBtn = (event: React.FormEvent) => {
        event.preventDefault()
        setTempLoading(true)
        const sendData = {
            email: email,
            otp: otp
        }

        dispatch(CheckOTP(sendData))
    }

    useEffect(() => {
        setTempLoading(true)
    }, [!isLoading]);

    useEffect(() => {
        if(isLoading){
            dispatch(setLoading(true))
        } else if (!isLoading && tempLoading){
            dispatch(setLoading(false))
        }
    }, [isLoading]);

    useEffect(() => {
        if(isAuth){
            console.log("OTP Auth")
            navigate("/dashboard")
        }
    }, [isAuth]);


    return (
        <form className="w-[450px] flex flex-col items-center" onSubmit={handleNextBtn}>
            <h6 className="font-semibold text-[28px] text-[000000] mb-[25px]">Sign in to Note Craft</h6>
            <button
                className="google w-full flex justify-center gap-[16px] border-[1px] items-center border-[#E7E7E9] py-[17px] rounded-[25px] mb-[16px]">
                <img src={googleIcon} alt="google icon"/>
                <span className="text-[14px] font-[600] text-[#000]">Sign in with Google</span>
            </button>
            <div className="or flex gap-[15px] items-center mb-[42px]">
                <hr className="w-[145px] border-[#E7E7E9]"/>
                <span className="text-[#6E6D7A] text-[12px] font-[400]">or sign in with email</span>
                <hr className="w-[145px] border-[#E7E7E9]"/>
            </div>
            <div className="w-full mb-[25px]">
                <label className="text-[#000] text-[12px] font-[600] mb-[4px]">Enter OTP</label>
                <input
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full border-[2px] border-[#E7E7E9] h-[50px] p-[10px] font-[18px] font-[600] rounded-[9x]"
                    type="text"/>
            </div>
            <button type="submit"
                    className="w-full flex justify-center border-[1px] py-[17px] rounded-[25px] bg-[#000] font-[600] text-[#FFF] mb-[14px] cursor-pointer">Next
            </button>
            <div className="signUp flex items-center gap-1 mb-[33px] mt-[10px]">
                <span className="text-[13px] font-[400] text-[#000]">if you have an account ?</span>
                <Link to="/" className="text-[13px] font-[400] text-[#000] underline decoration-1">Sign
                    In</Link>
            </div>
            <div className="or flex gap-[15px] items-center mb-[33px]">
                <hr className="w-[145px] border-[#E7E7E9]"/>
                <span className="text-[#6E6D7A] text-[12px] font-[400]">or</span>
                <hr className="w-[145px] border-[#E7E7E9]"/>
            </div>
            <div className="fringerprint">
                <img className="h-[36px] w-[36px]" src={fringerprint} alt="fringer print icon"/>
            </div>
        </form>
    )
}

export default OTPForm;