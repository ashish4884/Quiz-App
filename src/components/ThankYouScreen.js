import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import { downloadCSV } from "../utils/csvExporter";
import { Check } from "lucide-react";
import "tailwindcss/tailwind.css";

const translations = {
  en: {
    title: "Thank you",
    subtitle: "for supporting us and passing the quiz",
    download: "Download my answers",
    retake: "Retake quiz",
  },
  fr: {
    title: "Merci",
    subtitle: "pour votre soutien et pour avoir terminé le quiz",
    download: "Télécharger mes réponses",
    retake: "Recommencer le quiz",
  },
  de: {
    title: "Danke",
    subtitle: "für Ihre Unterstützung und das Bestehen des Quiz",
    download: "Meine Antworten herunterladen",
    retake: "Quiz neu starten",
  },
  es: {
    title: "Gracias",
    subtitle: "por apoyarnos y completar el cuestionario",
    download: "Descargar mis respuestas",
    retake: "Rehacer el cuestionario",
  },
};

const ThankYouScreen = () => {
  const { answers, resetQuiz, email, language } = useQuiz();
  const navigate = useNavigate();

  const t = translations[language] || translations["en"];

  const handleRetake = () => {
    resetQuiz();
    navigate("/");
  };

  const handleDownload = () => {
    downloadCSV(answers, email, language);
  };

  return (
    <div className="min-h-screen bg-[#1e002e] text-white flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-[cursive] mb-2">{t.title}</h1>
      <p className="text-sm text-gray-300 mb-10">{t.subtitle}</p>

      <div className="bg-green-300 rounded-full p-6 mb-10">
        <Check className="w-10 h-10 text-green-800" />
      </div>

      <button
        onClick={handleDownload}
        className="flex items-center gap-2 text-white text-sm mb-10"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
          />
        </svg>
        <span>{t.download}</span>
      </button>

      <button
        onClick={handleRetake}
        className="w-full max-w-xs bg-pink-700 py-4 rounded-full text-white text-lg font-semibold hover:bg-pink-600 transition"
      >
        {t.retake}
      </button>
    </div>
  );
};

export default ThankYouScreen;
