import profilePic from "../assets/default-profile-pic.png";

const NavBar = () => {
    return (
        <div className="nav-bar flex justify-between items-center ">
            <h1 className="text-[#000] text-[30px] font-[400] tracking-[0.96px]">NoteCraft</h1>
            <div className="profileImg w-[55px] h-[55px] overflow-hidden rounded-full ">
                <img src={profilePic} className="object-fill" alt="profile picture"/>
            </div>
        </div>
    )
}

export default NavBar;