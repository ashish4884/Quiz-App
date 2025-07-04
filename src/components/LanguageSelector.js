
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import { useTranslation } from "react-i18next";


const LanguageSelector = () => {
  const { setLanguage } = useQuiz();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const handleSelect = (lang) => {
    i18n.changeLanguage(lang); 
    setLanguage(lang);        
    navigate("/quiz");        
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-white space-y-6">
      <h1 className="text-2xl font-semibold">{t("selectLanguage")}</h1>

      <div className="flex space-x-4">
        {["en", "fr", "de", "es"].map((lang) => (
          <button
            key={lang}
            className="bg-option px-6 py-3 rounded-lg hover:bg-accent transition"
            onClick={() => handleSelect(lang)}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
