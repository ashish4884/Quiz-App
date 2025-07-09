import React from "react";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import questionsData from "../data/questions";

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const navigate = useNavigate();

  // State to manage selected language
  const [language, setLanguage] = useState("en");

  // Track the index of the current question
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Store all submitted answers
  const [answers, setAnswers] = useState([]);

  const [email, setEmail] = useState("");

  // Store multiple selected options for multi-select questions
  const [multiAnswer, setMultiAnswer] = useState([]);

  // Get the current question object based on language and index
  const currentQuestion = questionsData[language]?.[currentQuestionIndex];

  // Map from display language name to language code used in data
  const langCodeMap = {
    English: "en",
    French: "fr",
    German: "de",
    Spanish: "es",
  };

  // Update or replace answer for a question
  const updateAnswers = (newAnswer) => {
    setAnswers((prev) => {
      const filtered = prev.filter((ans) => ans.title !== newAnswer.title);
      return [...filtered, newAnswer];
    });
  };

  // Move to the next question or redirect to loader if finished
  const goToNext = () => {
    const hasNext = currentQuestionIndex + 1 < questionsData[language].length;

    if (hasNext) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      navigate("/loader"); // Navigate to final loader/summary page
    }
  };

  // Handle single-select question submission
  const handleSingleAnswer = (selectedOption) => {
    const question = currentQuestion;

    // Handle language selection question
    if (question?.isLanguageQuestion) {
      const selectedLang = langCodeMap[selectedOption];
      console.log("Selected Language Code:", selectedLang);
      if (selectedLang) {
        setLanguage(selectedLang);
        setCurrentQuestionIndex(1); // Skip the language question after selection
        return;
      }
    }

    // Store the single answer
    updateAnswers({
      order: question.order || currentQuestionIndex + 1,
      title: question.title,
      type: question.type,
      answer: selectedOption,
    });

    goToNext();
  };

  // Toggle an option for a multi-select question
  const toggleMultiSelect = (option) => {
    if (currentQuestion?.type !== "multi") return;

    const max = currentQuestion.maxSelect || Infinity;
    const alreadySelected = multiAnswer.includes(option);

    const updated = alreadySelected
      ? multiAnswer.filter((item) => item !== option)
      : multiAnswer.length < max
      ? [...multiAnswer, option]
      : multiAnswer;

    setMultiAnswer(updated);
  };

  // Submit selected options for multi-select question
  const submitMultiAnswer = () => {
    if (!multiAnswer.length) return;

    const question = currentQuestion;

    updateAnswers({
      order: question.order || currentQuestionIndex + 1,
      title: question.title,
      type: question.type,
      answer: multiAnswer,
    });

    setMultiAnswer([]); // Reset after submission
    goToNext();
  };

  // Reset the quiz
  const resetQuiz = () => {
    setLanguage("en");
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setEmail("");
    setMultiAnswer([]);
    navigate("/"); // Go back to home
  };

  return (
    <QuizContext.Provider
      value={{
        language,
        setLanguage,
        currentQuestion,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        answers,
        handleAnswer: handleSingleAnswer,
        toggleMultiSelect,
        submitMultiAnswer,
        multiAnswer,
        resetQuiz,
        email,
        setEmail,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);
