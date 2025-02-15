import { useState } from "react";
import {Pencil, Loader, ChevronLeft, ChevronRight} from "lucide-react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const DEFAULT_TEXT =
    "Artificial Intelligence (AI) is a branch of computer science " +
    "that aims to create machines that can perform tasks that typically " +
    "require human intelligence. These tasks include learning, reasoning, " +
    "problem-solving, perception, and language understanding. AI has applications " +
    "in various fields, including healthcare, finance, and autonomous systems.";

const SummeryPage = () => {
    const [text, setText] = useState(DEFAULT_TEXT);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleNext = () => {
        navigate('/dashboard');
    }

    const handleBack = () => {
        navigate('/dashboard/edit');
    }

    const generateSummary = async () => {
        setLoading(true);
        try {
            const response = await axios.post(
                "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
                { inputs: text },
                {
                    headers: {
                        Authorization: "Bearer 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",
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
        setLoading(false);
    };

    return (
        <div className="flex flex-col w-full h-[98%] justify-center items-center space-y-6">
            <h1 className="text-3xl font-[500]">Summarize Text</h1>
            <div className="relative w-[50vw]">
                <button
                    onClick={generateSummary}
                    className="absolute top-4 right-4 text-gray-500 hover:text-blue-500 transition"
                    disabled={loading}
                >
                    {loading ? <Loader className="animate-spin w-5 h-5"/> : <Pencil/>}
                </button>
                <textarea
                    className="w-full min-h-[60vh] border-2 p-4 rounded-xl border-gray-300"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <div className="flex justify-between mt-[43px] w-full">
                    <button className="flex items-center gap-3 bg-black text-[#fff] p-3 px-7 rounded-[12px]"
                            onClick={handleBack}>
                        <ChevronLeft size="20px"/>
                        <span>Back</span>
                    </button>
                    <button className="flex items-center gap-3 bg-black text-[#fff] p-3 px-7 rounded-[12px]"
                            onClick={handleNext}>
                        <span>Next</span>
                        <ChevronRight size="20px"/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SummeryPage;
