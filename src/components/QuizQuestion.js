import React from "react";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import QuizOption from "./QuizOption";
import QuizHeader from "./QuizHeader";

const QuizQuestion = () => {
  // Accessing  context values
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

  // Redirect if quiz language or current question is not set
  useEffect(() => {
    if (!language) navigate("/");
    else if (!currentQuestion) navigate("/loader");
  }, [language, currentQuestion, navigate]);

  // Boolean flags for different question types and conditions

  const isMulti = currentQuestion?.type === "multi";
  const isBubble = currentQuestion?.isBubble;
  const isGenderQuestion =
    currentQuestion?.title === "What gender do you identify with?";
  const isFavTopics =
    currentQuestion?.title === "What are your favorite topics?";
  const isHateBook =
    currentQuestion?.title === "What do you hate the most in a book?";
  const isDisabled = isMulti && multiAnswer.length === 0;

  // Shuffle options for favorite topics to add randomness
  const shuffledOptions = useMemo(() => {
    if (!currentQuestion) return [];
    return isFavTopics
      ? [...currentQuestion.options].sort(() => Math.random() - 0.5)
      : currentQuestion.options;
  }, [currentQuestion, isFavTopics]);

  // Handle option click (single or multi select)

  const handleOptionClick = (option) => {
    isMulti ? toggleMultiSelect(option) : handleAnswer(option);
  };

  // Get selected option for single-answer questions
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

        {/* Special layout for gender question */}
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
          // Render all other question types using QuizOption component
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

        {/* Submit button for multi-select questions */}
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
