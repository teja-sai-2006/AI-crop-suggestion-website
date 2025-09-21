import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Settings, Globe, Bell, User, Shield, Database, Moon, Sun } from "lucide-react";
import { useState } from "react";

const languages = [
  { code: "en", name: "English", native: "English" },
  { code: "hi", name: "Hindi", native: "हिन्दी" },
  { code: "bn", name: "Bengali", native: "বাংলা" },
  { code: "mr", name: "Marathi", native: "मराठी" },
  { code: "ta", name: "Tamil", native: "தமிழ்" },
  { code: "te", name: "Telugu", native: "తেলుগు" },
  { code: "ml", name: "Malayalam", native: "മലയാളം" },
];

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    language: "en",
    notifications: true,
    voiceEnabled: false,
    darkMode: false,
    offlineMode: true,
    autoSync: true,
    weatherAlerts: true,
    cropReminders: true,
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Header */}
      <header className="glass-medium shadow-card mt-16">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center space-x-3">
            <Settings className="text-3xl text-green-400" />
            <div>
              <h1 className="text-3xl font-bold text-strong">Settings</h1>
              <p className="text-enhanced text-overlay">Customize your KrishiMitra experience</p>
            </div>
          </div>
        </div>
      </header>

     <main className="container mx-auto px-6 py-8 pt-20">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Language & Localization */}
          <Card className="glass-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-strong">
                <Globe className="h-5 w-5 text-blue-400" />
                Language & Localization
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label className="text-enhanced text-overlay">Preferred Language</Label>
                <Select 
                  value={settings.language} 
                  onValueChange={(value) => handleSettingChange('language', value)}
                >
                  <SelectTrigger className="w-64 glass text-enhanced">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass">
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code} className="text-enhanced">
                        {lang.native} ({lang.name})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-enhanced">
                  All app content and voice responses will be in this language
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-enhanced text-overlay">Voice Input & Output</Label>
                  <p className="text-sm text-enhanced">
                    Enable voice commands and audio responses
                  </p>
                </div>
                <Switch
                  checked={settings.voiceEnabled}
                  onCheckedChange={(checked) => handleSettingChange('voiceEnabled', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Profile Settings */}
          <Card className="glass-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-strong">
                <User className="h-5 w-5 text-purple-400" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="farmer-name" className="text-enhanced text-overlay">Farmer Name</Label>
                  <Input id="farmer-name" placeholder="Enter your name" className="glass text-enhanced" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="farm-name" className="text-enhanced text-overlay">Farm Name</Label>
                  <Input id="farm-name" placeholder="Enter farm name" className="glass text-enhanced" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-enhanced text-overlay">Location</Label>
                  <Input id="location" placeholder="Village, District, State" className="glass text-enhanced" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="farm-size" className="text-enhanced text-overlay">Farm Size (acres)</Label>
                  <Input id="farm-size" type="number" placeholder="e.g., 5.5" className="glass text-enhanced" />
                </div>
              </div>
              <Button className="glass hover:glass-medium text-enhanced border border-white/20">Update Profile</Button>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="glass-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-strong">
                <Bell className="h-5 w-5 text-yellow-400" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-enhanced text-overlay">Push Notifications</Label>
                  <p className="text-sm text-enhanced">
                    Receive alerts and updates
                  </p>
                </div>
                <Switch
                  checked={settings.notifications}
                  onCheckedChange={(checked) => handleSettingChange('notifications', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-enhanced text-overlay">Weather Alerts</Label>
                  <p className="text-sm text-enhanced">
                    Get notified about weather changes
                  </p>
                </div>
                <Switch
                  checked={settings.weatherAlerts}
                  onCheckedChange={(checked) => handleSettingChange('weatherAlerts', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-enhanced text-overlay">Crop Care Reminders</Label>
                  <p className="text-sm text-enhanced">
                    Reminders for irrigation, fertilization, etc.
                  </p>
                </div>
                <Switch
                  checked={settings.cropReminders}
                  onCheckedChange={(checked) => handleSettingChange('cropReminders', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Data & Sync */}
          <Card className="glass-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-strong">
                <Database className="h-5 w-5 text-cyan-400" />
                Data & Synchronization
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-enhanced text-overlay">Offline Mode</Label>
                  <p className="text-sm text-enhanced">
                    Keep app functional without internet
                  </p>
                </div>
                <Switch
                  checked={settings.offlineMode}
                  onCheckedChange={(checked) => handleSettingChange('offlineMode', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-enhanced text-overlay">Auto Sync</Label>
                  <p className="text-sm text-enhanced">
                    Automatically sync data when online
                  </p>
                </div>
                <Switch
                  checked={settings.autoSync}
                  onCheckedChange={(checked) => handleSettingChange('autoSync', checked)}
                />
              </div>

              <div className="flex gap-4">
                <Button variant="outline" className="glass hover:glass-medium text-enhanced border-white/20">Export Data</Button>
                <Button variant="outline" className="glass hover:glass-medium text-enhanced border-white/20">Clear Cache</Button>
                <Button variant="outline" className="glass hover:glass-medium text-enhanced border-white/20">Sync Now</Button>
              </div>
            </CardContent>
          </Card>

          {/* Appearance */}
          <Card className="glass-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-strong">
                {settings.darkMode ? <Moon className="h-5 w-5 text-indigo-400" /> : <Sun className="h-5 w-5 text-yellow-400" />}
                Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-enhanced text-overlay">Dark Mode</Label>
                  <p className="text-sm text-enhanced">
                    Switch to dark theme for better visibility
                  </p>
                </div>
                <Switch
                  checked={settings.darkMode}
                  onCheckedChange={(checked) => handleSettingChange('darkMode', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card className="glass-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-strong">
                <Shield className="h-5 w-5 text-red-400" />
                Privacy & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Button variant="outline" className="glass hover:glass-medium text-enhanced border-white/20">View Privacy Policy</Button>
                <Button variant="outline" className="glass hover:glass-medium text-enhanced border-white/20">Data Usage Information</Button>
                <Button variant="outline" className="glass hover:glass-medium text-enhanced border-white/20">Manage Permissions</Button>
              </div>
              
              <div className="pt-4 border-t border-white/20">
                <Button variant="destructive" className="w-full glass-medium hover:glass border border-red-400/50 text-red-400 hover:text-red-300">
                  Delete Account & Data
                </Button>
                <p className="text-xs text-enhanced mt-2 text-center">
                  This action cannot be undone. All your data will be permanently deleted.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* App Information */}
          <Card className="glass-medium">
            <CardHeader>
              <CardTitle className="text-strong">App Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-enhanced">Version:</span>
                  <span className="text-strong">2.0.1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-enhanced">Last Updated:</span>
                  <span className="text-strong">March 12, 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-enhanced">Build:</span>
                  <span className="text-strong">2024.03.12</span>
                </div>
              </div>
              
              <div className="flex gap-4 mt-6">
                <Button variant="outline" className="glass hover:glass-medium text-enhanced border-white/20">Check for Updates</Button>
                <Button variant="outline" className="glass hover:glass-medium text-enhanced border-white/20">Help & Support</Button>
                <Button variant="outline" className="glass hover:glass-medium text-enhanced border-white/20">About KrishiMitra</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;