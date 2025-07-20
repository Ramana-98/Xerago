import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Check, Trash2, LogOut, Upload, Eye, EyeOff, CreditCard, Bell, Globe, Moon, Sun, User, Lock, FileText, AlertTriangle } from "lucide-react";

function showToast(message: string) {
  alert(message); // Replace with a real toast in your app
}

export default function Settings() {
  const [tab, setTab] = useState("profile");
  const [profile, setProfile] = useState({
    name: "User Name",
    email: "user@example.com",
    bio: "",
    skills: "",
    availability: "Full-time",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    resume: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("en");
  const [timezone, setTimezone] = useState("UTC");
  const [currency, setCurrency] = useState("USD");
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false
  });
  const [plan, setPlan] = useState("Free");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);

  // Placeholder for connected accounts
  const connectedAccounts = ["Google", "GitHub"];

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="mb-6 grid grid-cols-3 sm:grid-cols-6 gap-2">
          <TabsTrigger value="profile"><User className="w-4 h-4 mr-1" />Profile</TabsTrigger>
          <TabsTrigger value="security"><Lock className="w-4 h-4 mr-1" />Security</TabsTrigger>
          <TabsTrigger value="notifications"><Bell className="w-4 h-4 mr-1" />Notifications</TabsTrigger>
          <TabsTrigger value="billing"><CreditCard className="w-4 h-4 mr-1" />Billing</TabsTrigger>
          <TabsTrigger value="preferences"><Globe className="w-4 h-4 mr-1" />Preferences</TabsTrigger>
          <TabsTrigger value="danger"><AlertTriangle className="w-4 h-4 mr-1 text-red-600" />Danger Zone</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <Avatar className="w-16 h-16">
                <AvatarImage src={profile.photo} alt="Profile" />
                <AvatarFallback>{profile.name.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <Label htmlFor="photo-upload" className="block mb-1">Profile Photo</Label>
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  className="block text-xs"
                  onChange={e => {
                    if (e.target.files && e.target.files[0]) {
                      setProfile(p => ({ ...p, photo: URL.createObjectURL(e.target.files[0]) }));
                      showToast("Profile photo updated!");
                    }
                  }}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={profile.name} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={profile.email} onChange={e => setProfile(p => ({ ...p, email: e.target.value }))} className="mt-1" />
              </div>
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Input id="bio" value={profile.bio} onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))} className="mt-1" placeholder="Tell us about yourself..." />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="skills">Skills</Label>
                <Input id="skills" value={profile.skills} onChange={e => setProfile(p => ({ ...p, skills: e.target.value }))} className="mt-1" placeholder="e.g. React, Node.js" />
              </div>
              <div>
                <Label htmlFor="availability">Availability</Label>
                <Input id="availability" value={profile.availability} onChange={e => setProfile(p => ({ ...p, availability: e.target.value }))} className="mt-1" placeholder="Full-time, Part-time..." />
              </div>
            </div>
            <div>
              <Label htmlFor="resume">Resume/Portfolio</Label>
              <input
                id="resume"
                type="file"
                accept="application/pdf,.doc,.docx,.ppt,.pptx,.jpg,.png"
                className="block text-xs"
                onChange={e => {
                  if (e.target.files && e.target.files[0]) {
                    setProfile(p => ({ ...p, resume: e.target.files![0].name }));
                    showToast("Resume/portfolio uploaded!");
                  }
                }}
              />
              {profile.resume && <div className="text-xs mt-1 text-green-600 flex items-center gap-1"><FileText className="w-3 h-3" />{profile.resume}</div>}
            </div>
            <Button onClick={() => showToast("Profile updated!")} className="mt-2">Save Changes</Button>
          </div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <div className="space-y-6">
            <div>
              <Label htmlFor="password">Change Password</Label>
              <div className="flex gap-2 mt-1">
                <Input id="password" type={showPassword ? "text" : "password"} placeholder="New password" className="flex-1" />
                <Button type="button" variant="outline" onClick={() => setShowPassword(v => !v)}>
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              <Button onClick={() => showToast("Password changed!")} className="mt-2">Update Password</Button>
            </div>
            <div>
              <Label>Two-Factor Authentication (2FA)</Label>
              <div className="flex items-center gap-2 mt-1">
                <Switch id="2fa" />
                <span className="text-xs text-gray-600">Enable 2FA for extra security</span>
              </div>
            </div>
            <div>
              <Label>Connected Accounts</Label>
              <div className="flex gap-2 mt-1">
                {connectedAccounts.map(acc => (
                  <Button key={acc} variant="outline" size="sm" className="flex items-center gap-1">
                    <User className="w-3 h-3" />{acc}
                  </Button>
                ))}
                <Button variant="ghost" size="sm">+ Add</Button>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span>Email Alerts</span>
              <Switch checked={notifications.email} onCheckedChange={v => setNotifications(n => ({ ...n, email: v }))} />
            </div>
            <div className="flex items-center justify-between">
              <span>Push Notifications</span>
              <Switch checked={notifications.push} onCheckedChange={v => setNotifications(n => ({ ...n, push: v }))} />
            </div>
            <div className="flex items-center justify-between">
              <span>SMS Updates</span>
              <Switch checked={notifications.sms} onCheckedChange={v => setNotifications(n => ({ ...n, sms: v }))} />
            </div>
            <Button onClick={() => showToast("Notification preferences saved!")} className="mt-2">Save Preferences</Button>
          </div>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing">
          <div className="space-y-6">
            <div>
              <Label>Current Plan</Label>
              <div className="flex items-center gap-2 mt-1">
                <span className={`px-2 py-1 rounded text-xs ${plan === "Premium" ? "bg-yellow-200 text-yellow-800" : "bg-gray-200 text-gray-800"}`}>{plan}</span>
                <Button size="sm" variant="outline" onClick={() => { setPlan(plan === "Free" ? "Premium" : "Free"); showToast("Plan updated!"); }}>
                  {plan === "Free" ? "Upgrade" : "Downgrade"}
                </Button>
              </div>
            </div>
            <div>
              <Label>Payment Method</Label>
              <Input placeholder="Card ending in 1234" className="mt-1" />
              <Button onClick={() => showToast("Payment method updated!")} className="mt-2">Update Payment</Button>
            </div>
            <div>
              <Label>Billing History</Label>
              <div className="bg-gray-50 rounded p-2 text-xs mt-1">No invoices yet.</div>
            </div>
            <Button variant="destructive" onClick={() => showToast("Subscription cancelled!")}>Cancel Subscription</Button>
          </div>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences">
          <div className="space-y-6">
            <div>
              <Label>Language</Label>
              <Input value={language} onChange={e => setLanguage(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label>Timezone</Label>
              <Input value={timezone} onChange={e => setTimezone(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label>Currency</Label>
              <Input value={currency} onChange={e => setCurrency(e.target.value)} className="mt-1" />
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span>Theme</span>
              <Button variant={theme === "light" ? "default" : "outline"} size="sm" onClick={() => setTheme("light")}> <Sun className="w-4 h-4" /> Light</Button>
              <Button variant={theme === "dark" ? "default" : "outline"} size="sm" onClick={() => setTheme("dark")}> <Moon className="w-4 h-4" /> Dark</Button>
            </div>
            <Button onClick={() => showToast("Preferences saved!")} className="mt-2">Save Preferences</Button>
          </div>
        </TabsContent>

        {/* Danger Zone Tab */}
        <TabsContent value="danger">
          <div className="space-y-6">
            <div className="bg-red-50 border border-red-200 rounded p-4">
              <h3 className="text-red-700 font-semibold mb-2">Danger Zone</h3>
              <div className="flex flex-col gap-3">
                <Button variant="destructive" onClick={() => setShowDeactivateModal(true)}><LogOut className="w-4 h-4 mr-1" />Deactivate Account</Button>
                <Button variant="destructive" onClick={() => setShowDeleteModal(true)}><Trash2 className="w-4 h-4 mr-1" />Delete Account</Button>
                <Button variant="outline" onClick={() => showToast("Data exported!")}>Export Data</Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Deactivate Modal */}
      {showDeactivateModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Deactivate Account</h3>
              <p className="text-sm text-gray-500 mb-6">Are you sure you want to deactivate your account? You can reactivate it later.</p>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setShowDeactivateModal(false)} className="flex-1">Cancel</Button>
                <Button variant="destructive" onClick={() => { setShowDeactivateModal(false); showToast("Account deactivated!"); }} className="flex-1">Deactivate</Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Account</h3>
              <p className="text-sm text-gray-500 mb-6">This action is irreversible. Are you sure you want to delete your account?</p>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setShowDeleteModal(false)} className="flex-1">Cancel</Button>
                <Button variant="destructive" onClick={() => { setShowDeleteModal(false); showToast("Account deleted!"); }} className="flex-1">Delete</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

