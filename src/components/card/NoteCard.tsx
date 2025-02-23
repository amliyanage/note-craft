import { ArrowDownToLine, Star } from 'lucide-react';
import { Note } from "../../model/Note.ts";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../store/store.ts";
import { useDispatch, useSelector } from "react-redux";
import { chaneFavourite } from "../../reducer/note-slice.ts";
import jsPDF from 'jspdf';

interface NoteProps {
    note: Note;
    onClick: (note: Note) => void;
}

const NoteCard = ({ note, onClick }: NoteProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const isAuth = useSelector((state: RootState) => state.userReducer.jwt_token);
    const [isFavourite, setIsFavourite] = useState<string>(note.isFavourite as string);

    function getNoteDate(date?: string) {
        const noteDate = new Date(date);
        return `${noteDate.getDate()} / ${noteDate.getMonth() + 1} / ${noteDate.getFullYear()}`;
    }

    function noteNameReducer(name: string) {
        if (name.length > 20) {
            return name.slice(0, 20) + "...";
        }
        return name;
    }

    const handleChangeFavorite = () => {
        console.log(isFavourite);
        const newFavouriteStatus = isFavourite === "true" ? "false" : "true";
        dispatch(
            chaneFavourite({
                noteId: note.noteId as string,
                isFavourite: newFavouriteStatus,
                jwt_token: isAuth ?? ""
            })
        );
        setIsFavourite(newFavouriteStatus);
    };

    const generatePdf = async () => {
        const doc = new jsPDF();
        let yPosition = 20;

        // Title centered at the top
        doc.setFontSize(18);
        const titleWidth = doc.getTextWidth(note.title);
        const pageWidth = doc.internal.pageSize.width;
        doc.text(note.title, (pageWidth - titleWidth) / 2, yPosition);
        yPosition += 30;

        try {
            // Convert image URL to base64
            const response = await fetch(note.thumbnail);
            const blob = await response.blob();
            const base64String = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(blob);
            });

            // Add the image
            const imageWidth = 100;
            const imageHeight = 100;
            const imageX = (pageWidth - imageWidth) / 2;
            doc.addImage(base64String, 'JPEG', imageX, yPosition, imageWidth, imageHeight);
            yPosition += imageHeight + 20;
        } catch (error) {
            console.warn('Failed to add image:', error);
            yPosition += 20; // Add some space even if image fails
        }

        // Summary
        doc.setFontSize(16);
        doc.text('Summery ', 20, yPosition);
        yPosition += 10;
        doc.setFontSize(12);
        doc.text(note.summery, 20, yPosition, {
            maxWidth: pageWidth - 40
        });
        yPosition += 20;

        // Note body
        doc.setFontSize(14);
        doc.text('Note', 20, yPosition);
        doc.setFontSize(12);
        doc.html(note.noteBody, {
            callback: function (doc) {
                doc.save('note.pdf');
            },
            margin: [20, 20, 20, 20],
            x: 20,
            y: yPosition,
            width: pageWidth - 40
        });
    };




    return (
        <div className="w-[20vw] flex flex-col card">
            <div onClick={() => onClick(note)} className="w-full h-[25vh] flex overflow-hidden thumbnail rounded-[18px]">
                <img src={note.thumbnail as string} className="object-cover w-full h-full" alt="Note Project Image" />
            </div>
            <div className="flex items-center justify-between mt-[15px] px-2">
                <div className="flex gap-3">
                    <div className="dote w-[10px] h-[10px] bg-[#6E6E6E] rounded-full" />
                    <span className="text-[12px] font-[400] text-[#9E9E9E]">{getNoteDate(note.date)}</span>
                </div>
                <div className="text-[#000] text-[12px] font-[400] w-[103px] bg-[#8EFF6B] flex justify-center h-[22px] items-center rounded-[8px]">
                    {note.visibility}
                </div>
            </div>
            <h3 className="text-[#000] font-[400] text-[16px] px-2">{noteNameReducer(note.title)}</h3>
            <div className="flex justify-end gap-5 mt-3 px-2">
                <ArrowDownToLine size="20px" onClick={generatePdf} />
                <Star size="20px"
                      color={isFavourite === "true" ? "#FFD700" : "#000"}
                      fill={isFavourite === "true" ? "#FFD700" : "#fff"}
                      onClick={handleChangeFavorite}
                />
            </div>
        </div>
    );
};

export default NoteCard;
