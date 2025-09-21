import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe, Mic, MicOff } from "lucide-react";

const languages = [
  { code: "en", name: "English", native: "English" },
  { code: "hi", name: "Hindi", native: "हिन्दी" },
  { code: "bn", name: "Bengali", native: "বাংলা" },
  { code: "mr", name: "Marathi", native: "मराठी" },
  { code: "ta", name: "Tamil", native: "தமிழ்" },
  { code: "te", name: "Telugu", native: "తెలుగు" },
  { code: "ml", name: "Malayalam", native: "മലയാളം" },
];

export const Header = () => {
  const [language, setLanguage] = useState("en");
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  return (
    <header className="bg-gradient-field text-primary-foreground shadow-card">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-2xl font-bold">🌾</div>
            <div>
              <h1 className="text-2xl font-bold">KrishiMitra</h1>
              <p className="text-sm opacity-90">Smart Farming Assistant</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className="text-primary-foreground hover:bg-white/20"
            >
              {voiceEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
              Voice {voiceEnabled ? "On" : "Off"}
            </Button>
            
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-40 bg-white/20 border-white/30 text-primary-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.native} ({lang.name})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};