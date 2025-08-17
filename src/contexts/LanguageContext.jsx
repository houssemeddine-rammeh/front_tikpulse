import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const languages = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' }
];

export const LanguageProvider = ({ children }) => {
  console.log('LanguageProvider rendering...');
  const { i18n } = useTranslation();
  
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    const detectedLang = i18n.isInitialized 
      ? languages.find(lang => lang.code === i18n.language) || languages[0]
      : languages[0];
    console.log('LanguageProvider init:', { 
      isInitialized: i18n.isInitialized, 
      language: i18n.language, 
      detectedLang 
    });
    return detectedLang;
  });
  
  const [direction, setDirection] = useState('ltr');

  // Update direction based on language
  useEffect(() => {
    const isRTL = currentLanguage.code === 'ar';
    setDirection(isRTL ? 'rtl' : 'ltr');
    document.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLanguage.code;
  }, [currentLanguage]);

  // Listen to i18n language changes and initialization
  useEffect(() => {
    const handleLanguageChange = (lng) => {
      const newLanguage = languages.find(lang => lang.code === lng) || languages[0];
      setCurrentLanguage(newLanguage);
    };

    const handleInitialized = () => {
      const newLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];
      setCurrentLanguage(newLanguage);
    };

    if (i18n.isInitialized) {
      handleInitialized();
    }

    i18n.on('languageChanged', handleLanguageChange);
    i18n.on('initialized', handleInitialized);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
      i18n.off('initialized', handleInitialized);
    };
  }, [i18n]);

  const changeLanguage = async (languageCode) => {
    try {
      console.log('Changing language to:', languageCode);
      await i18n.changeLanguage(languageCode);
      const newLanguage = languages.find(lang => lang.code === languageCode);
      if (newLanguage) {
        setCurrentLanguage(newLanguage);
        localStorage.setItem('i18nextLng', languageCode);
        console.log('Language changed successfully to:', newLanguage);
      }
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  // Set RTL CSS classes for Arabic
  useEffect(() => {
    if (direction === 'rtl') {
      document.body.classList.add('rtl');
      document.body.classList.remove('ltr');
    } else {
      document.body.classList.add('ltr');
      document.body.classList.remove('rtl');
    }
  }, [direction]);

  const value = {
    currentLanguage,
    languages,
    changeLanguage,
    direction,
    isRTL: direction === 'rtl',
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

