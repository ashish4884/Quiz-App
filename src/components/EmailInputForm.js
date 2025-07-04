import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import { validateEmail } from "../utils/validation";

const translations = {
  en: {
    heading: "Email",
    subheading: "Enter your email to get full access",
    placeholder: "Your email",
    error: "Please enter a valid email address.",
    agreement: "By continuing I agree with",
    privacy: "Privacy policy",
    terms: "Terms of use.",
    next: "Next",
  },
  fr: {
    heading: "E-mail",
    subheading: "Entrez votre e-mail pour un accès complet",
    placeholder: "Votre e-mail",
    error: "Veuillez entrer une adresse e-mail valide.",
    agreement: "En continuant, j'accepte la",
    privacy: "Politique de confidentialité",
    terms: "Conditions d'utilisation.",
    next: "Suivant",
  },
  de: {
    heading: "E-Mail",
    subheading: "Geben Sie Ihre E-Mail ein, um vollen Zugriff zu erhalten",
    placeholder: "Ihre E-Mail",
    error: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
    agreement: "Durch die Fortsetzung stimme ich der",
    privacy: "Datenschutzrichtlinie",
    terms: "Nutzungsbedingungen zu.",
    next: "Weiter",
  },
  es: {
    heading: "Correo electrónico",
    subheading: "Ingresa tu correo electrónico para obtener acceso completo",
    placeholder: "Tu correo electrónico",
    error: "Por favor, introduce una dirección de correo válida.",
    agreement: "Al continuar, acepto la",
    privacy: "Política de privacidad",
    terms: "Términos de uso.",
    next: "Siguiente",
  },
};

const EmailInputForm = () => {
  const [emailInput, setEmailInput] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setEmail, language } = useQuiz();

  const t = translations[language] || translations["en"];

  const handleSubmit = () => {
    if (!validateEmail(emailInput)) {
      setError(t.error);
      return;
    }

    setEmail(emailInput);
    navigate("/thank-you");
  };

  const handleChange = (e) => {
    setEmailInput(e.target.value);
    if (error) setError("");
  };

  const isEmailValid = validateEmail(emailInput);
  const isTouched = emailInput.length > 0;
  const showError = !isEmailValid && isTouched;

  return (
    <div className="min-h-screen bg-[#1e002e] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-2">{t.heading}</h1>
        <p className="text-gray-300 mb-8 text-sm">{t.subheading}</p>

        <input
          type="email"
          placeholder={t.placeholder}
          value={emailInput}
          onChange={handleChange}
          className={`w-full bg-[#2a003d] text-white placeholder-gray-400 p-4 rounded-xl focus:outline-none border transition ${
            showError ? "border-red-500" : "border-transparent"
          }`}
        />

        {showError && (
          <p className="text-red-500 mt-2 text-sm">{t.error}</p>
        )}

        <p className="text-xs text-gray-400 mt-6 mb-10">
          {t.agreement}
          <span className="text-pink-500 underline cursor-pointer">{t.privacy}</span>{" "}
          {language === "fr" || language === "de" ? "" : "and"}{" "}
          <span className="text-pink-500 underline cursor-pointer">{t.terms}</span>
        </p>

                  
                  
              
        <button
          onClick={handleSubmit}
          disabled={!isEmailValid}
          className={`w-full py-4 rounded-full font-semibold text-lg transition ${
            !isEmailValid
              ? "bg-[#5c1a5d] opacity-50 cursor-not-allowed"
              : "bg-[#a62fc2] hover:bg-[#c035d8]"
          }`}
        >
          {t.next}
        </button>
      </div>
    </div>
  );
};

export default EmailInputForm;
