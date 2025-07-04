import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import questionsData from "../data/questions";

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const navigate = useNavigate();

  const [language, setLanguage] = useState("en");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [email, setEmail] = useState("");
  const [multiAnswer, setMultiAnswer] = useState([]);

  const currentQuestion = questionsData[language]?.[currentQuestionIndex];

  const langCodeMap = {
    English: "en", French: "fr", German: "de", Spanish: "es",
    Anglais: "en", Français: "fr", Allemand: "de", Espagnol: "es",
    Englisch: "en", Französisch: "fr", Deutsch: "de", Spanisch: "es",
    Inglés: "en", Francés: "fr", Alemán: "de", Español: "es",
  };

  const updateAnswers = (newAnswer) => {
    setAnswers((prev) => {
      const filtered = prev.filter((ans) => ans.title !== newAnswer.title);
      return [...filtered, newAnswer];
    });
  };

  const goToNext = () => {
    const hasNext = currentQuestionIndex + 1 < questionsData[language].length;
    if (hasNext) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      navigate("/loader");
    }
  };

  const handleSingleAnswer = (selectedOption) => {
    const question = currentQuestion;

    if (question?.isLanguageQuestion) {
      const selectedLang = langCodeMap[selectedOption];
      if (selectedLang) {
        setLanguage(selectedLang);
        setCurrentQuestionIndex(1); 
        return;
      }
    }

    updateAnswers({
      order: question.order || currentQuestionIndex + 1,
      title: question.title,
      type: question.type,
      answer: selectedOption,
    });

    goToNext();
  };

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

  const submitMultiAnswer = () => {
    if (!multiAnswer.length) return;

    const question = currentQuestion;

    updateAnswers({
      order: question.order || currentQuestionIndex + 1,
      title: question.title,
      type: question.type,
      answer: multiAnswer,
    });

    setMultiAnswer([]);
    goToNext();
  };

  const resetQuiz = () => {
    setLanguage("en");
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setEmail("");
    setMultiAnswer([]);
    navigate("/");
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
