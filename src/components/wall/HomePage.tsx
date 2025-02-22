import { Search, ListFilter, Globe, Star, Plus } from "lucide-react";
import NoteCard from "../card/NoteCard.tsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store.ts";
import { getAllUserNotes } from "../../reducer/note-slice.ts";
import { Note } from "../../model/Note.ts";

const HomePage = () => {
    const navigate = useNavigate();
    const [tempLoading, setTempLoading] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>(""); // State for search input
    const isLoading = useSelector((state: RootState) => state.noteReducer.loading);
    const dispatch = useDispatch<AppDispatch>();
    const jwt_token = useSelector((state: RootState) => state.userReducer.jwt_token);
    const username = useSelector((state: RootState) => state.userReducer.username);
    const notes = useSelector((state: RootState) => state.noteReducer.notes);

    useEffect(() => {
        dispatch(
            getAllUserNotes({
                username: username ?? "",
                jwt_token: jwt_token ?? "",
            })
        );
        setTempLoading(true);
    }, []);

    useEffect(() => {
        if (!isLoading && tempLoading) {
            setTempLoading(false);
        }
    }, [isLoading]);

    const openCreateNote = () => {
        navigate("/dashboard/save");
    };

    // Filter notes based on the search term
    const filteredNotes = notes.filter((note: Note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="flex justify-between mt-[43px]">
                <div className="flex gap-5">
                    {/* Search Bar */}
                    <div className="search border-[1.5px] border-[#828282] rounded-[12px] flex gap-5 items-center p-[14px]">
                        <Search color="#828282" size="18px" />
                        <input
                            type="text"
                            className="focus:outline-0 text-[12px] w-[15vw]"
                            placeholder="Search Here"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="w-[50px] h-[50px] flex justify-center items-center border-[#828282] rounded-full border-[1.5px]">
                        <ListFilter color="#828282" size="18px" />
                    </div>
                </div>
                <div className="flex gap-8">
                    <button className="w-[50px] h-[50px] flex justify-center items-center border-[#000] rounded-full border-[1.5px]">
                        <Globe color="#000" size="18px" />
                    </button>
                    <button className="h-[50px] flex justify-center items-center border-[#000] rounded-[12px] px-5 gap-3 border-[1.5px]">
                        <Star color="#000" size="18px" />
                        <span className="text-[15px] font-[500]">Favorites</span>
                    </button>
                    <button
                        className="h-[50px] flex justify-center items-center border-[#000] rounded-[12px] px-5 gap-3 border-[1.5px]"
                        onClick={openCreateNote}
                    >
                        <Plus color="#000" size="18px" />
                        <span className="text-[15px] font-[500]">New Note</span>
                    </button>
                </div>
            </div>
            <div className="flex w-full justify-center mt-20">
                {tempLoading ? (
                    <div>
                        <h1 className={"text-2xl font-[500]"}>Loading...</h1>
                    </div>
                ) : (
                    <div className="grid grid-cols-4 gap-16">
                        {filteredNotes.map((note: Note) => (
                            <NoteCard key={note.noteId} note={note} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;
