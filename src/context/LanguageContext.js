import React, { createContext, useState, useEffect } from "react";

const LanguageContext = createContext(null);

const LanguageContextProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState("bn");

  useEffect(() => {
    // Load language from localStorage if available
    const savedLanguage = localStorage.getItem("currentLanguage");
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
    localStorage.setItem("currentLanguage", language); // Save language to localStorage
  };

  return (
    <LanguageContext.Provider
      value={{ currentLanguage, setCurrentLanguage: handleLanguageChange }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageContext, LanguageContextProvider };
