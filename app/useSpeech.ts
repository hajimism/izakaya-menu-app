import "client-only";

import { useCallback, useState } from "react";

export const useSpeech = () => {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [recognition] = useState(new window.webkitSpeechRecognition());

  const startListening = useCallback(() => {
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "ja";

    recognition.onresult = (event) => {
      const currentTranscript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result?.transcript)
        .join("");

      setTranscript(currentTranscript);
    };

    recognition.onerror = (event) => {
      console.error(event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
    setIsListening(true);
  }, [recognition]);

  const stopListening = useCallback(() => {
    recognition.stop();
    setIsListening(false);
  }, [recognition]);

  const reset = useCallback(() => {
    setTranscript("");
  }, []);

  return {
    transcript,
    isListening,
    startListening,
    stopListening,
    reset,
  };
};
