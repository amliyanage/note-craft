import NoteProjectImg from '../../assets/default-note-pic.png'
import {ArrowDownToLine, Star} from 'lucide-react';

const NoteCard = () => {
    return (
        <div className="w-[20vw] flex flex-col card">
            <div className="w-full h-[25vh] flex overflow-hidden thumbnail">
                <img src={NoteProjectImg} className="object-fill" alt="Note Project Image"/>
            </div>
            <div className="flex items-center justify-between mt-[15px] px-2">
                <div className="flex gap-3">
                    <div className="dote w-[10px] h-[10px] bg-[#6E6E6E] rounded-full"/>
                    <span className="text-[12px] font-[400] text-[#9E9E9E]">2025 / 02 /31</span>
                </div>
                <div
                    className="text-[#000] text-[12px] font-[400] w-[103px] bg-[#8EFF6B] flex justify-center h-[22px] items-center rounded-[8px]">
                    completed
                </div>
            </div>
            <h3 className="text-[#000] font-[400] text-[16px] px-2">Note About React Router Dom</h3>
            <div className="flex justify-end gap-5 mt-3 px-2">
                <ArrowDownToLine size="20px" />
                <Star size="20px" />
            </div>
        </div>
    )
}

export default NoteCard;