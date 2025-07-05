import React from "react";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import QuizOption from "./QuizOption";
import QuizHeader from "./QuizHeader";

const QuizQuestion = () => {
  const {
    currentQuestion,
    currentQuestionIndex,
    handleAnswer,
    toggleMultiSelect,
    submitMultiAnswer,
    multiAnswer,
    language,
    answers,
  } = useQuiz();

  const navigate = useNavigate();

  useEffect(() => {
    if (!language) navigate("/");
    else if (!currentQuestion) navigate("/loader");
  }, [language, currentQuestion, navigate]);

  const isMulti = currentQuestion?.type === "multi";
  const isBubble = currentQuestion?.isBubble;
  const isGenderQuestion =
    currentQuestion?.title === "What gender do you identify with?";
  const isFavTopics =
    currentQuestion?.title === "What are your favorite topics?";
  const isHateBook =
    currentQuestion?.title === "What do you hate the most in a book?";
  const isDisabled = isMulti && multiAnswer.length === 0;


  const shuffledOptions = useMemo(() => {
    if (!currentQuestion) return [];
    return isFavTopics
      ? [...currentQuestion.options].sort(() => Math.random() - 0.5)
      : currentQuestion.options;
  }, [currentQuestion, isFavTopics]);

  const handleOptionClick = (option) => {
    isMulti ? toggleMultiSelect(option) : handleAnswer(option);
  };

  const selectedOption = !isMulti
    ? answers[currentQuestionIndex]?.answer
    : null;

  return (
    <div className="min-h-screen bg-background text-white">
      <QuizHeader />

      <div className="p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center">
          {currentQuestion?.title}
        </h2>

        {isGenderQuestion && (
          <p className="text-center text-gray-400">
            Please share how do you identify yourself
          </p>
        )}
        {isFavTopics && (
          <p className="text-center text-sm text-gray-400">
            Choose up to 3 topics you like
          </p>
        )}

        {isGenderQuestion ? (
          <div className="flex gap-4 flex-wrap justify-center pt-2">
            {currentQuestion.options.map((option, index) => {
              const [emoji, ...labelParts] = option.split(" ");
              const label = labelParts.join(" ");
              const isSelected = selectedOption === option;

              return (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className={`w-24 h-28 rounded-xl bg-[#2a003b] flex flex-col items-center justify-center transition ${
                    isSelected ? "border-2 border-pink-500" : ""
                  }`}
                >
                  <span className="text-4xl mb-2">{emoji}</span>
                  <span className="text-sm">{label}</span>
                </button>
              );
            })}
          </div>
        ) : (
          <div
            className={`gap-3 ${
              isBubble
                ? "flex flex-wrap justify-center"
                : "space-y-3 flex flex-col"
            }`}
          >
            {shuffledOptions.map((option, index) => {
              const selected = isMulti
                ? multiAnswer.includes(option)
                : selectedOption === option;

              return (
                <QuizOption
                  key={index}
                  text={option}
                  selected={selected}
                  onSelect={() => handleOptionClick(option)}
                  isBubble={isBubble}
                  isHateBook={isHateBook}
                />
              );
            })}
          </div>
        )}

        {isMulti && (
          <div className="pt-4 text-center">
            <button
              onClick={submitMultiAnswer}
              disabled={isDisabled}
              className={`px-6 py-2 rounded-full transition-colors text-white ${
                isDisabled ? "bg-gray-600 cursor-not-allowed" : "bg-accent"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizQuestion;
