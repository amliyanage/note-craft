import { Note } from "../../model/Note.ts";
import { createContext, ReactNode, useContext, useState } from "react";

interface FormContextProps {
    formData: Note;
    updateFormData: <K extends keyof Note>(field: K, value: Note[K]) => void;
}

const FormContext = createContext<FormContextProps | undefined>(undefined);

export const FormProvider = ({ children }: { children: ReactNode }) => {
    const [formData, setFormData] = useState<Note>({
        noteId: "",
        thumbnail: "",
        noteBody: "",
        summery: "",
        isFavourite: "",
        date: new Date(),
        status: "",
        userName: "",
        title: "",
        visibility: "",
    });

    const updateFormData = <K extends keyof Note>(field: K, value: Note[K]) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <FormContext.Provider value={{ formData, updateFormData }}>
            {children}
        </FormContext.Provider>
    );
};

export const useForm = () => {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error("useForm must be used within a FormProvider");
    }
    return context;
};
