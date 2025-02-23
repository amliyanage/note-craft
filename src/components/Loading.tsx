import {DotLottieReact} from "@lottiefiles/dotlottie-react";


const Loading = () => {
    return (
        <div className="fixed w-full h-full flex justify-center items-center bg-black/50 backdrop-blur-sm z-10">
            <DotLottieReact
                src="https://lottie.host/75a56d1c-40bd-4d6a-8c2c-1b041c3b200c/ng1TTsQtlZ.lottie"
                loop
                autoplay
                className="w-[20vw] h-auto"
            />
        </div>
    )
}

export default Loading