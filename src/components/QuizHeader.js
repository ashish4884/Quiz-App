import React from "react";
import { useQuiz } from "../context/QuizContext";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import questionsData from "../data/questions";

const QuizHeader = () => {
  const { currentQuestionIndex, language, setCurrentQuestionIndex } = useQuiz();
  const navigate = useNavigate();

  const totalQuestions = language ? questionsData[language]?.length : 0;

  console.log("currentQuestionIndex",currentQuestionIndex);

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      navigate("/");
    }
  };

  const progressPercent = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="px-6 pt-6 bg-background text-white">
      <div className="flex items-center justify-between">
        <button onClick={handleBack} className="text-white text-sm">
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        <span className="text-lg font-semibold">
          <span className="text-pink-500">{currentQuestionIndex + 1}</span>
          <span className="text-white">/{totalQuestions}</span>
        </span>

        <div className="w-6" />
      </div>

      <div className="mt-3 h-2 bg-gray-300 rounded-full overflow-hidden">
        <div
          className="h-full bg-pink-500 rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
    </div>
  );
};

export default QuizHeader;
