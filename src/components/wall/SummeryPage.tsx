import { useEffect, useState } from "react";
import { Pencil, Loader, ChevronLeft } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "./FormContext.tsx";
import { AppDispatch, RootState } from "../../store/store.ts";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../reducer/loading-slice.ts";
import { saveNote } from "../../reducer/note-slice.ts";

// Function to strip HTML tags from a string
const stripHtmlTags = (str: string) => {
    const doc = new DOMParser().parseFromString(str, 'text/html');
    return doc.body.textContent || "";
};

const SummeryPage = () => {
    const { formData, updateFormData } = useForm();
    const [text, setText] = useState(stripHtmlTags(formData.noteBody as string) || ""); // Cleaned text from formData
    const [editLoading, setEditLoading] = useState(false);
    const navigate = useNavigate();
    const [tempLoading, setTempLoading] = useState<boolean>(false);
    const isLoading = useSelector((state: RootState) => state.noteReducer.loading);
    const dispatch = useDispatch<AppDispatch>();
    const username = useSelector((state: RootState) => state.userReducer.username);
    const jwt_token = useSelector((state: RootState) => state.userReducer.jwt_token);

    useEffect(() => {
        setTempLoading(true)
    }, [!isLoading]);

    useEffect(() => {
        if (isLoading) {
            dispatch(setLoading(true))
        } else if (!isLoading && tempLoading) {
            setTempLoading(false)
            dispatch(setLoading(false))
            navigate('/dashboard');
        }
    }, [isLoading]);

    const handleBack = () => {
        navigate('/dashboard/edit');
    };

    const generateSummary = async () => {
        setEditLoading(true);
        try {
            const response = await axios.post(
                "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
                { inputs: text },
                {
                    headers: {
                        Authorization: `Bearer ${process.env.REACT_APP_HUGGINGFACE_API_KEY}`, // Secure API Key
                        "Content-Type": "application/json",
                    },
                }
            );
            const newSummary = response.data[0].summary_text;
            setText((prevText) => prevText + "\n\n" + newSummary);
        } catch (error) {
            console.error("Error generating summary:", error);
            setText((prevText) => prevText + "\n\nFailed to generate summary.");
        }
        setEditLoading(false);
    };

    useEffect(() => {
        updateFormData("summery", text);
    }, [text]);

    const handleSave = () => {
        setEditLoading(true);
        const sendFormData = new FormData();
        sendFormData.append("thumbnail", formData.thumbnail as File);
        sendFormData.append("title", formData.title as string);
        sendFormData.append("noteBody", formData.noteBody as string);
        sendFormData.append("summery", text);
        sendFormData.append("status", "public");
        sendFormData.append("visibility", formData.visibility as string);
        sendFormData.append("userName", username ?? "Guest");
        sendFormData.append("isFavourite", "false");

        dispatch(saveNote({
            note: sendFormData,
            jwt_token: jwt_token ?? ""
        }));

    };

    return (
        <div className="flex flex-col w-full h-[98%] justify-center items-center space-y-6">
            <h1 className="text-3xl font-[500]">Summarize Text</h1>
            <div className="relative w-[50vw]">
                <button
                    onClick={generateSummary}
                    className="absolute top-4 right-4 text-gray-500 hover:text-blue-500 transition"
                    disabled={editLoading}
                >
                    {editLoading ? <Loader className="animate-spin w-5 h-5" /> : <Pencil />}
                </button>
                <textarea
                    className="w-full min-h-[60vh] border-2 p-4 rounded-xl border-gray-300"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <div className="flex justify-between mt-[43px] w-full">
                    <button className="flex items-center gap-3 bg-black text-[#fff] p-3 px-7 rounded-[12px]"
                            onClick={handleBack}>
                        <ChevronLeft size="20px" />
                        <span>Back</span>
                    </button>
                    <button
                        className="flex items-center gap-3 bg-black text-[#fff] p-3 px-12 rounded-[12px]"
                        onClick={handleSave}>
                        <span>Save</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SummeryPage;
