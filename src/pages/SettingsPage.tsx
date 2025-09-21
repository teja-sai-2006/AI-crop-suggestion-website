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
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <header className="bg-gradient-earth shadow-card mt-16">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center space-x-3">
            <Settings className="text-3xl" />
            <div>
              <h1 className="text-3xl font-bold">Settings</h1>
              <p className="text-muted-foreground">Customize your KrishiMitra experience</p>
            </div>
          </div>
        </div>
      </header>

     <main className="container mx-auto px-6 py-8 pt-20">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Language & Localization */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Language & Localization
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Preferred Language</Label>
                <Select 
                  value={settings.language} 
                  onValueChange={(value) => handleSettingChange('language', value)}
                >
                  <SelectTrigger className="w-64">
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
                <p className="text-sm text-muted-foreground">
                  All app content and voice responses will be in this language
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Voice Input & Output</Label>
                  <p className="text-sm text-muted-foreground">
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
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="farmer-name">Farmer Name</Label>
                  <Input id="farmer-name" placeholder="Enter your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="farm-name">Farm Name</Label>
                  <Input id="farm-name" placeholder="Enter farm name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Village, District, State" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="farm-size">Farm Size (acres)</Label>
                  <Input id="farm-size" type="number" placeholder="e.g., 5.5" />
                </div>
              </div>
              <Button>Update Profile</Button>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">
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
                  <Label>Weather Alerts</Label>
                  <p className="text-sm text-muted-foreground">
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
                  <Label>Crop Care Reminders</Label>
                  <p className="text-sm text-muted-foreground">
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
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Data & Synchronization
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Offline Mode</Label>
                  <p className="text-sm text-muted-foreground">
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
                  <Label>Auto Sync</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically sync data when online
                  </p>
                </div>
                <Switch
                  checked={settings.autoSync}
                  onCheckedChange={(checked) => handleSettingChange('autoSync', checked)}
                />
              </div>

              <div className="flex gap-4">
                <Button variant="outline">Export Data</Button>
                <Button variant="outline">Clear Cache</Button>
                <Button variant="outline">Sync Now</Button>
              </div>
            </CardContent>
          </Card>

          {/* Appearance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {settings.darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">
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
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Privacy & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Button variant="outline">View Privacy Policy</Button>
                <Button variant="outline">Data Usage Information</Button>
                <Button variant="outline">Manage Permissions</Button>
              </div>
              
              <div className="pt-4 border-t">
                <Button variant="destructive" className="w-full">
                  Delete Account & Data
                </Button>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  This action cannot be undone. All your data will be permanently deleted.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* App Information */}
          <Card>
            <CardHeader>
              <CardTitle>App Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Version:</span>
                  <span>2.0.1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Updated:</span>
                  <span>March 12, 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Build:</span>
                  <span>2024.03.12</span>
                </div>
              </div>
              
              <div className="flex gap-4 mt-6">
                <Button variant="outline">Check for Updates</Button>
                <Button variant="outline">Help & Support</Button>
                <Button variant="outline">About KrishiMitra</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;