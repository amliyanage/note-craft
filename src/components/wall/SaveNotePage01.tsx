import {ChevronLeft, ChevronRight, CloudUpload} from "lucide-react";
import SaveNoteImg from '../../assets/save-note-img.png';
const SaveNotePage01 = () => {
    return (
        <div className="flex w-full h-[90%] justify-center items-center">
            <div>
                <div className="flex justify-center items-center gap-32">
                    <div>
                        <h1 className="text-[32px] font-[600]">Write A New Note</h1>
                        <div className="mt-[43px] flex flex-col gap-[40px]">
                            <div className="flex flex-col">
                                <label className="text-[16px] font-[500]">Title</label>
                                <input type="text" className="rounded-[12px] border-[1.5px] border-[#E7E7E90] text-[18px] font-[500] p-3 w-[30vw] mt-[5px]"/>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-[16px] font-[500]">Thumbnail</label>
                                <input type="file"
                                       className="rounded-[12px] border-[1.5px] border-[#E7E7E90] text-[18px] font-[500] p-3 w-[30vw] mt-[5px]"/>
                            </div>
                        </div>
                        <div className="mt-[48px] w-full border-[1.5px] border-dashed rounded-[15px] border-[#1DB954] flex justify-center items-center flex-col h-[176px] bg-[#D2F1DD]">
                            <CloudUpload size="83px" color="#1DB954"/>
                            <span className="text-[#1DB954]">No File Selected</span>
                        </div>
                        <div className="flex justify-between mt-[43px]">
                            <button className="flex items-center gap-3 bg-black text-[#fff] p-3 px-7 rounded-[12px]">
                                <ChevronLeft size="20px"/>
                                <span>Back</span>
                            </button>
                            <button className="flex items-center gap-3 bg-black text-[#fff] p-3 px-7 rounded-[12px]">
                                <span>Next</span>
                                <ChevronRight size="20px"/>
                            </button>
                        </div>
                    </div>
                    <div>
                        <img src={SaveNoteImg} alt="save note img"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SaveNotePage01;