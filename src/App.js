import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QuizProvider } from "./context/QuizContext";
import QuizQuestion from "./components/QuizQuestion";
import LoaderScreen from "./components/LoaderScreen";
import EmailInputForm from "./components/EmailInputForm";
import ThankYouScreen from "./components/ThankYouScreen";

import "./i18n";

const App = () => {
  return (
    <Router>
      <QuizProvider>
        <Routes>
          {/* <Route path="/" element={<LanguageSelector />} /> */}
          {/* <Route path="/quiz" element={<QuizQuestion />} /> */}
          <Route path="/" element={<QuizQuestion />} />
          <Route path="/loader" element={<LoaderScreen />} />
          <Route path="/email" element={<EmailInputForm />} />
          <Route path="/thank-you" element={<ThankYouScreen />} />
        </Routes>
      </QuizProvider>
    </Router>
  );
};

export default App;
