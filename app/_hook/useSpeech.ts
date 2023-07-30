import "client-only";

import { useCallback, useEffect, useState } from "react";

export const useSpeech = () => {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition>();

  useEffect(() => {
    if (window) {
      const r = new window.webkitSpeechRecognition();
      r.continuous = true;
      r.interimResults = true;
      r.lang = "ja";

      r.onresult = (event) => {
        const currentTranscript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result?.transcript)
          .join("");

        setTranscript(currentTranscript);
      };

      r.onerror = (event) => {
        console.error(event.error);
      };

      r.onend = () => {
        setIsListening(false);
      };
      setRecognition(r);
    }
  }, []);

  const startListening = useCallback(() => {
    recognition?.start();
    setIsListening(true);
  }, [recognition]);

  const stopListening = useCallback(() => {
    recognition?.stop();
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
