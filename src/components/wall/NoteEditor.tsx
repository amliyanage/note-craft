import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ChevronLeft, ChevronRight, Mic, MicOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "./FormContext.tsx";

// Toolbar options with color and highlight options
export const toolbarOptions = [
    [{ font: [] }, { size: [] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }], // Color and highlight options
    [{ script: "sub" }, { script: "super" }],
    [{ header: "1" }, { header: "2" }, "blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ align: [] }],
    ["link", "image", "video"],
    ["clean"],
];

const NoteEditor: React.FC = () => {
    const { formData, updateFormData } = useForm();
    const [content, setContent] = useState<string>(formData.noteBody || ""); // Content state
    const [isListening, setIsListening] = useState<boolean>(false); // Track voice typing state
    const [recognition, setRecognition] = useState<SpeechRecognition | null>(null); // SpeechRecognition instance
    const navigate = useNavigate();

    // Update form data whenever content changes
    useEffect(() => {
        updateFormData("noteBody", content);
    }, [content]);

    // Navigation handler for "Next" button
    const handleNext = () => {
        navigate("/dashboard/summery");
    };

    // Navigation handler for "Back" button
    const handleBack = () => {
        navigate("/dashboard/save");
    };

    // Initialize SpeechRecognition if supported
    useEffect(() => {
        if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
            const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
            const recognitionInstance = new SpeechRecognition();
            recognitionInstance.lang = "en-US"; // Set language
            recognitionInstance.interimResults = true; // Enable interim results

            // Handle speech result event
            recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
                const transcript = event.results[event.results.length - 1][0].transcript;

                // Only append the final result (not interim results)
                if (event.results[event.results.length - 1].isFinal) {
                    setContent((prevContent) => prevContent + transcript); // Add final transcript to content
                }
            };

            setRecognition(recognitionInstance); // Save recognition instance
        } else {
            alert("Speech Recognition is not supported in your browser.");
        }

        // Cleanup when the component unmounts
        return () => {
            if (recognition) {
                recognition.stop(); // Stop the recognition if component unmounts
            }
        };
    }, []);

    // Function to toggle listening state
    const toggleListening = () => {
        if (recognition) {
            if (isListening) {
                recognition.stop(); // Stop recognition without clearing content
            } else {
                recognition.start(); // Start recognition without resetting content
            }
            setIsListening(!isListening); // Toggle state
        }
    };

    return (
        <div className="px-[10vw]">
            {/* Navigation buttons */}
            <div className="flex justify-between mt-[58px] mb-[58px]">
                <button
                    className="flex items-center gap-3 bg-black text-[#fff] p-3 px-7 rounded-[12px]"
                    onClick={handleBack}
                >
                    <ChevronLeft size="20px" />
                    <span>Back</span>
                </button>
                <button
                    className="flex items-center gap-3 bg-black text-[#fff] p-3 px-7 rounded-[12px]"
                    onClick={handleNext}
                >
                    <span>Next</span>
                    <ChevronRight size="20px" />
                </button>
            </div>

            {/* Button to toggle voice typing */}
            <button onClick={toggleListening} className="float-end mt-[9px] me-[9px]">
                {isListening ? <MicOff size="22px" /> : <Mic size="22px" />}
            </button>

            {/* React Quill editor */}
            <ReactQuill
                value={content}
                onChange={setContent}
                modules={{ toolbar: toolbarOptions }} // Pass toolbar options
            />
        </div>
    );
};

export default NoteEditor;
