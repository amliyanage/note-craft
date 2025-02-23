// speechRecognition.d.ts
interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
    interpretationResults: any; // You can refine this based on your use case
}

interface SpeechRecognitionResult {
    transcript: string;
    confidence: number;
}

interface SpeechRecognition extends EventTarget {
    lang: string;
    interimResults: boolean;
    onresult: (event: SpeechRecognitionEvent) => void;
    start(): void;
    stop(): void;
}

interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
}
