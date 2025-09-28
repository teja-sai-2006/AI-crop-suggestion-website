import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Globe, ChevronUp } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

// Comprehensive list of Indian languages only
const languages: Language[] = [
  // Primary supported languages
  { code: 'en', name: 'English', nativeName: 'English', flag: '��' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { code: 'sat', name: 'Santali', nativeName: 'ᱥᱟᱱᱛᱟᱲᱤ', flag: '🇮🇳' },
  
  // Other Indian languages
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', flag: '🇮🇳' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇮🇳' },
  
  // Jharkhand and tribal languages
  { code: 'ho', name: 'Ho', nativeName: 'Ho', flag: '🇮🇳' },
  { code: 'mni', name: 'Mundari', nativeName: 'Mundari', flag: '🇮🇳' },
  { code: 'kur', name: 'Kurukh', nativeName: 'Kurukh', flag: '🇮🇳' },
  { code: 'sck', name: 'Sadri', nativeName: 'Sadri', flag: '🇮🇳' },
  
  // Additional Indian languages
  { code: 'sd', name: 'Sindhi', nativeName: 'سنڌي', flag: '🇮�' },
  { code: 'ne', name: 'Nepali', nativeName: 'नेपाली', flag: '��' },
  { code: 'kok', name: 'Konkani', nativeName: 'कोंकणी', flag: '�' },
  { code: 'doi', name: 'Dogri', nativeName: 'डोगरी', flag: '��' },
  { code: 'mai', name: 'Maithili', nativeName: 'मैथिली', flag: '��' },
  { code: 'sat', name: 'Sanskrit', nativeName: 'संस्कृत', flag: '🇮🇳' },
];

const LanguageSelector: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(languages[0]);
  const [isOpen, setIsOpen] = useState(false);

  // Load saved language from localStorage on component mount
  useEffect(() => {
    const savedLanguageCode = localStorage.getItem('km.selectedLanguage');
    if (savedLanguageCode) {
      const savedLanguage = languages.find(lang => lang.code === savedLanguageCode);
      if (savedLanguage) {
        setSelectedLanguage(savedLanguage);
      }
    }
  }, []);

  const handleLanguageChange = (language: Language) => {
    setSelectedLanguage(language);
    localStorage.setItem('km.selectedLanguage', language.code);
    setIsOpen(false);
    
    // Dispatch custom event to notify other components about language change
    window.dispatchEvent(new CustomEvent('languageChange', { 
      detail: { language: language.code, languageData: language } 
    }));
    
    console.log(`🌍 Language changed to: ${language.name} (${language.code})`);
  };

  // Group Indian languages by type
  const primaryLanguages = languages.slice(0, 4); // English, Hindi, Telugu, Santali
  const majorIndianLanguages = languages.slice(4, 14); // Major Indian languages
  const tribalLanguages = languages.slice(14, 18); // Jharkhand tribal languages
  const otherIndianLanguages = languages.slice(18); // Additional Indian languages

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="bg-white/90 backdrop-blur-sm border-gray-200 hover:bg-white/95 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Globe className="w-4 h-4 mr-2" />
            <span className="mr-1">{selectedLanguage.flag}</span>
            <span className="hidden sm:inline">{selectedLanguage.name}</span>
            <span className="sm:hidden">{selectedLanguage.code.toUpperCase()}</span>
            <ChevronUp className={`w-4 h-4 ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent 
          align="end" 
          className="w-64 max-h-80 overflow-y-auto bg-white/95 backdrop-blur-sm border-gray-200"
          sideOffset={8}
        >
          {/* Primary Languages */}
          <DropdownMenuLabel className="text-sm font-semibold text-green-700">
            🌾 Primary Languages
          </DropdownMenuLabel>
          {primaryLanguages.map((language) => (
            <DropdownMenuItem
              key={language.code}
              onClick={() => handleLanguageChange(language)}
              className={`cursor-pointer hover:bg-green-50 ${
                selectedLanguage.code === language.code ? 'bg-green-100 font-medium' : ''
              }`}
            >
              <span className="mr-3">{language.flag}</span>
              <div className="flex flex-col">
                <span className="text-sm">{language.name}</span>
                <span className="text-xs text-gray-500">{language.nativeName}</span>
              </div>
            </DropdownMenuItem>
          ))}
          
          <DropdownMenuSeparator />
          
          {/* Major Indian Languages */}
          <DropdownMenuLabel className="text-sm font-semibold text-orange-700">
            🇮🇳 Major Indian Languages
          </DropdownMenuLabel>
          {majorIndianLanguages.map((language) => (
            <DropdownMenuItem
              key={language.code}
              onClick={() => handleLanguageChange(language)}
              className={`cursor-pointer hover:bg-orange-50 ${
                selectedLanguage.code === language.code ? 'bg-orange-100 font-medium' : ''
              }`}
            >
              <span className="mr-3">{language.flag}</span>
              <div className="flex flex-col">
                <span className="text-sm">{language.name}</span>
                <span className="text-xs text-gray-500">{language.nativeName}</span>
              </div>
            </DropdownMenuItem>
          ))}
          
          <DropdownMenuSeparator />
          
          {/* Tribal Languages */}
          <DropdownMenuLabel className="text-sm font-semibold text-blue-700">
            🏔️ Tribal Languages
          </DropdownMenuLabel>
          {tribalLanguages.map((language) => (
            <DropdownMenuItem
              key={language.code}
              onClick={() => handleLanguageChange(language)}
              className={`cursor-pointer hover:bg-blue-50 ${
                selectedLanguage.code === language.code ? 'bg-blue-100 font-medium' : ''
              }`}
            >
              <span className="mr-3">{language.flag}</span>
              <div className="flex flex-col">
                <span className="text-sm">{language.name}</span>
                <span className="text-xs text-gray-500">{language.nativeName}</span>
              </div>
            </DropdownMenuItem>
          ))}
          
          <DropdownMenuSeparator />
          
          {/* Other Indian Languages */}
          <DropdownMenuLabel className="text-sm font-semibold text-purple-700">
            📜 Other Indian Languages
          </DropdownMenuLabel>
          {otherIndianLanguages.map((language) => (
            <DropdownMenuItem
              key={language.code}
              onClick={() => handleLanguageChange(language)}
              className={`cursor-pointer hover:bg-purple-50 ${
                selectedLanguage.code === language.code ? 'bg-purple-100 font-medium' : ''
              }`}
            >
              <span className="mr-3">{language.flag}</span>
              <div className="flex flex-col">
                <span className="text-sm">{language.name}</span>
                <span className="text-xs text-gray-500">{language.nativeName}</span>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LanguageSelector;