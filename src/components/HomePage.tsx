import profilePic from '../assets/default-profile-pic.png'
import { Search , ListFilter , Globe , Star , Plus } from 'lucide-react';
import NoteCard from "./card/NoteCard.tsx";

const HomePage = () => {
    return (
        <div className="w-full h-screen px-[56px] py-[43px]" id="home">
            <div className="nav-bar flex justify-between items-center ">
                <h1 className="text-[#000] text-[30px] font-[400] tracking-[0.96px]">NoteCraft</h1>
                <div className="profileImg w-[55px] h-[55px] overflow-hidden rounded-full ">
                    <img src={profilePic} className="object-fill" alt="profile picture"/>
                </div>
            </div>
            <div className="flex justify-between mt-[43px]">
                <div className="flex gap-5">
                    <div className="search border-[1.5px] border-[#828282] rounded-[12px] flex gap-5 items-center p-[14px]">
                        <Search color="#828282" size="18px"/>
                        <input type="text" className="focus:outline-0 text-[12px] w-[15vw]" placeholder="Search Here"/>
                    </div>
                    <div className="w-[50px] h-[50px] flex justify-center items-center border-[#828282] rounded-full border-[1.5px]">
                        <ListFilter color="#828282" size="18px"/>
                    </div>
                </div>
                <div className="flex gap-8">
                    <button
                        className="w-[50px] h-[50px] flex justify-center items-center border-[#000] rounded-full border-[1.5px]">
                        <Globe color="#000" size="18px"/>
                    </button>
                    <button
                        className=" h-[50px] flex justify-center items-center border-[#000] rounded-[12px] px-5 gap-3 border-[1.5px]">
                        <Star color="#000" size="18px"/>
                        <span className="text-[15px] font-[500]">Favorites</span>
                    </button>
                    <button
                        className=" h-[50px] flex justify-center items-center border-[#000] rounded-[12px] px-5 gap-3 border-[1.5px]">
                        <Plus color="#000" size="18px"/>
                        <span className="text-[15px] font-[500]">New Note</span>
                    </button>
                </div>
            </div>
            <div className="flex w-full justify-center mt-20">
                <div className="grid grid-cols-4 gap-16">
                    <NoteCard/>
                    <NoteCard/>
                    <NoteCard/>
                    <NoteCard/>
                    <NoteCard/>
                </div>
            </div>
        </div>
    );
}

export default HomePage;