import {Search, ListFilter, Globe, Star, Plus, X} from "lucide-react";
import NoteCard from "../card/NoteCard.tsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store.ts";
import {getAllUserNotes, getPublicNotes} from "../../reducer/note-slice.ts";
import { Note } from "../../model/Note.ts";
import { useForm } from "./FormContext.tsx";
import {setLoading} from "../../reducer/loading-slice.ts";

const HomePage = () => {
    const navigate = useNavigate();
    const { formData, updateFormData } = useForm();
    const [tempLoading, setTempLoading] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [showFavorites, setShowFavorites] = useState<boolean>(false); // Track "Favorites" filter
    const isLoading = useSelector((state: RootState) => state.noteReducer.loading);
    const dispatch = useDispatch<AppDispatch>();
    const jwt_token = useSelector((state: RootState) => state.userReducer.jwt_token);
    const username = useSelector((state: RootState) => state.userReducer.username);
    const notes = useSelector((state: RootState) => state.noteReducer.notes);
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [visibilityFilter, setVisibilityFilter] = useState<string>("");
    const [showFilterPopup, setShowFilterPopup] = useState<boolean>(false);
    const [isClickOnPublic, setIsClickOnPublic] = useState<boolean>(false);

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

    const toggleFavorites = () => {
        setShowFavorites(!showFavorites);
    };

    const openCreateNote = () => {
        updateFormData("title", "");
        updateFormData("noteBody", "");
        updateFormData("noteId", "");
        updateFormData("date", "");
        updateFormData("summery", "");
        updateFormData("thumbnail", "");
        updateFormData("isFavourite", "");
        updateFormData("visibility", "");
        updateFormData("status", "");
        updateFormData("userName", "");

        navigate("/dashboard/save");
    };



    function onClick(note: Note) {
        updateFormData("title", note.title);
        updateFormData("noteBody", note.noteBody);
        updateFormData("noteId", note.noteId);
        updateFormData("date", note.date);
        updateFormData("summery", note.summery);
        updateFormData("thumbnail", note.thumbnail);
        updateFormData("isFavourite", note.isFavourite);
        updateFormData("visibility", note.visibility);
        updateFormData("status", note.status);
        updateFormData("userName", note.userName);

        navigate("/dashboard/view");
    }

    const toggleFilterPopup = () => setShowFilterPopup(!showFilterPopup);

    const filteredNotes = notes.filter((note: Note) => {
        console.log(selectedDate); // 2025-02-14
        console.log(note.date); // 2025-02-14T00:00:00.000Z

        // Extract the date part from note.date (ignoring time and timezone)
        const noteDate = note.date.split('T')[0]; // This will give you '2025-02-14'

        return (
            note.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedDate ? noteDate === selectedDate : true) &&
            (visibilityFilter ? note.visibility === visibilityFilter : true) &&
            (!showFavorites || note.isFavourite === "true") // Show only favorites if enabled
        );
    });

    function loadGlobalNotes() {
        setTempLoading(true);
        setIsClickOnPublic(!isClickOnPublic);
        if (isClickOnPublic) {
            dispatch(getPublicNotes(
                { jwt_token: jwt_token ?? "" }
            ));
        } else {
            dispatch(
                getAllUserNotes({
                    username: username ?? "",
                    jwt_token: jwt_token ?? "",
                })
            );
        }
    }


    return (
        <div>

            {/* Filter Popup */}
            {showFilterPopup && (
                <div className="absolute top-34 left-[21.7vw] w-80 bg-white shadow-lg p-5 rounded-md z-50">
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-lg font-semibold">Filter Notes</h2>
                        <X className="cursor-pointer" onClick={toggleFilterPopup} />
                    </div>

                    {/* Date Filter */}
                    <div className="mb-3">
                        <label className="block text-sm font-medium">Select Date:</label>
                        <input
                            type="date"
                            className="w-full border p-2 rounded-md"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                        />
                    </div>

                    {/* Visibility Filter */}
                    <div className="mb-3">
                        <label className="block text-sm font-medium">Visibility:</label>
                        <select
                            className="w-full border p-2 rounded-md"
                            value={visibilityFilter}
                            onChange={(e) => setVisibilityFilter(e.target.value)}
                        >
                            <option value="">All</option>
                            <option value="private">Private</option>
                            <option value="public">Public</option>
                        </select>
                    </div>

                    {/* Apply Button */}
                    <button
                        className="w-full bg-black text-white p-2 rounded-md"
                        onClick={toggleFilterPopup}
                    >
                        Apply Filters
                    </button>
                </div>
            )}


            <div className="flex justify-between mt-[43px]">
                <div className="flex gap-5">
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
                    <div
                        onClick={toggleFilterPopup}
                        className="w-[50px] h-[50px] flex justify-center items-center border-[#828282] rounded-full border-[1.5px]">
                        <ListFilter color="#828282" size="18px" />
                    </div>
                </div>
                <div className="flex gap-8"
                    onClick={loadGlobalNotes}
                >
                    <button className="w-[50px] h-[50px] flex justify-center items-center border-[#000] rounded-full border-[1.5px]">
                        {
                            isClickOnPublic ? <Globe color="#000" size="18px" /> : <Globe color="#828282" size="18px" />
                        }
                    </button>
                    <button
                        className={`h-[50px] flex justify-center items-center rounded-[12px] px-5 gap-3 border-[1.5px] ${
                            showFavorites ? "border-[#FFD700] text-[#FFD700]" : "border-[#000] text-[#000]"
                        }`}
                        onClick={toggleFavorites}
                    >
                        <Star color={showFavorites ? "#FFD700" : "#000"} size="18px" />
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
                        <h1 className="text-2xl font-[500]">Loading...</h1>
                    </div>
                ) : (
                    <div className="grid grid-cols-4 gap-16">
                        {filteredNotes.map((note: Note) => (
                            <NoteCard key={note.noteId} note={note} onClick={onClick} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;
