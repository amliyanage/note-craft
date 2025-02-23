import { Delete, Lock, Plus, RefreshCcw, Unlock } from "lucide-react";
import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import { toolbarOptions } from "./NoteEditor.tsx";
import { useForm } from "./FormContext.tsx";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store.ts";
import {updateNote} from "../../reducer/note-slice.ts";

const ViewNote = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { formData, updateFormData } = useForm();
    const [content, setContent] = useState<string>(formData.noteBody || "");
    const [isLocked, setIsLocked] = useState<boolean>(true);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [isChangeImage, setIsChangeImage] = useState<boolean>(false);
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const jwt_token = useSelector((state: RootState) => state.userReducer.jwt_token);

    const loading = useSelector((state: RootState) => state.noteReducer.loading);

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        updateFormData("title", e.target.value);
        adjustHeight();
    };

    const adjustHeight = () => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = "auto";
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setThumbnail(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setIsChangeImage(true);
                updateFormData("thumbnail", reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpdate = () => {
        const formDataToSend = new FormData();
        formDataToSend.append("noteId", formData.noteId);
        formDataToSend.append("title", formData.title);
        formDataToSend.append("noteBody", content);
        formDataToSend.append("summery", formData.summery);
        formDataToSend.append("visibility", formData.visibility);
        formDataToSend.append("isFavourite", formData.isFavourite);
        formDataToSend.append("status", formData.status);
        formDataToSend.append("userName", formData.userName);
        console.log(isChangeImage);
        if (isChangeImage) {
            formDataToSend.append("thumbnail", formData.thumbnail);
        } else {
            formDataToSend.append("thumbnail", "N/A");
        }

        dispatch(updateNote({ note: formDataToSend, jwt_token: jwt_token ?? "" }));
    };

    return (
        <div id="viewNote">
            <div className="flex justify-end">
                <div
                    onClick={() => setIsLocked(!isLocked)}
                    className="border-2 flex justify-center items-center w-[3vh] h-[3vh] rounded-full mt-10 me-10">
                    {isLocked ? <Lock size={18} /> : <Unlock size={18} />}
                </div>
            </div>
            <div className="flex justify-center">
                <textarea
                    ref={textAreaRef}
                    className="w-[45%] text-center text-[2vw] font-bold focus:outline-0 h-auto resize-none overflow-hidden"
                    value={formData.title}
                    onChange={handleInput}
                    readOnly={isLocked}
                    rows={1}
                />
            </div>
            <div className="flex justify-center mt-5">
                <div className="w-[80%] h-[1px] bg-black/30"></div>
            </div>
            <div className="flex flex-col items-center mt-10">
                {!isLocked && <input type="file" accept="image/*" onChange={handleImageChange} />}
                <div className="w-[40vw] h-auto">
                    {formData.thumbnail && <img src={formData.thumbnail as string} className="w-full h-auto" alt="Note Thumbnail" />}
                </div>
                <div className="mt-10">
                    {isLocked ? (
                        <div dangerouslySetInnerHTML={{ __html: formData.noteBody }} />
                    ) : (
                        <ReactQuill
                            value={content}
                            onChange={(value) => {
                                setContent(value);
                                updateFormData("noteBody", value);
                            }}
                            modules={{ toolbar: toolbarOptions }}
                        />
                    )}
                </div>
                <div className="mt-10">
                    {isLocked ? (
                        <p>{formData.summery}</p>
                    ) : (
                        <textarea
                            className="w-[40vw] h-[20vh] border-2 p-4 rounded-xl border-gray-300"
                            value={formData.summery}
                            onChange={(e) => updateFormData("summery", e.target.value)}
                        />
                    )}
                </div>
                <div className="flex gap-10 mt-10 mb-14">
                    <button className="w-[6vw] h-[3vh] border-2 rounded-lg">
                        {formData.visibility === "public" ? "Make Private" : "Make Public"}
                    </button>
                    <button
                        onClick={handleUpdate}
                        className="flex gap-2 justify-center items-center w-[6vw] h-[3vh] border-2 rounded-lg"
                        disabled={loading}
                    >
                        <RefreshCcw size={18} />
                        {loading ? "Updating..." : "Update"}
                    </button>
                    <button className="flex gap-2 justify-center items-center w-[6vw] h-[3vh] border-2 rounded-lg">
                        <Delete size={18} />
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewNote;
