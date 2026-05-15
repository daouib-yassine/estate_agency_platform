"use client";
import React, { useState } from 'react';
import {
  LayoutDashboard, Home, Building2, Users, CalendarCheck,
  Bell, Settings, LogOut, Search, ChevronDown, ChevronRight,
  User, Lock, Globe, Palette, BellRing, Shield, CreditCard,
  Smartphone, Mail, Phone, MapPin, Camera, Eye, EyeOff,
  Check, X, ToggleLeft, ToggleRight, Save, AlertCircle,
  Key, Monitor, Trash2, Download, Upload, Plus, Minus,
  BarChart2, ArrowRight, CheckCircle2
} from 'lucide-react';

/* ─────────────────────────────────────────────
   SIDEBAR NAV
───────────────────────────────────────────── */
const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard',    id: 'dashboard' },
  { icon: Home,            label: 'Properties',   id: 'properties' },
  { icon: Building2,       label: 'Developments', id: 'developments' },
  { icon: CalendarCheck,   label: 'Attendance',   id: 'attendance' },
  { icon: Users,           label: 'Clients',      id: 'clients' },
  { icon: BarChart2,       label: 'Reports',      id: 'reports' },
  { icon: Settings,        label: 'Settings',     id: 'settings' },
];

/* ─────────────────────────────────────────────
   SETTINGS SECTIONS
───────────────────────────────────────────── */
const settingsSections = [
  { id: 'profile',        icon: User,        label: 'Profile' },
  { id: 'security',       icon: Lock,        label: 'Security' },
  { id: 'notifications',  icon: BellRing,    label: 'Notifications' },
  { id: 'appearance',     icon: Palette,     label: 'Appearance' },
  { id: 'integrations',   icon: Globe,       label: 'Integrations' },
  { id: 'billing',        icon: CreditCard,  label: 'Billing' },
  { id: 'privacy',        icon: Shield,      label: 'Privacy & Data' },
];

/* ─────────────────────────────────────────────
   TOGGLE COMPONENT
───────────────────────────────────────────── */
function Toggle({ enabled, onChange }) {
  return (
    <button
      onClick={onChange}
      className={`relative inline-flex h-5 w-9 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${enabled ? 'bg-[#b89a5a]' : 'bg-gray-200'}`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${enabled ? 'translate-x-4' : 'translate-x-0'}`} />
    </button>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function SettingsDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('profile');
  const [notification, setNotification] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // Profile state
  const [profile, setProfile] = useState({
    firstName: 'Jonathan',
    lastName: 'Altis',
    email: 'jonathan.altis@altisrealty.com',
    phone: '+1 213 555-0181',
    role: 'Administrator',
    location: 'Los Angeles, CA',
    bio: 'Senior administrator and lead agent at Altis Realty. Specializing in luxury residential and commercial properties across Southern California.',
    timezone: 'America/Los_Angeles',
    language: 'English (US)',
  });

  // Notification state
  const [notifSettings, setNotifSettings] = useState({
    emailNewVisit: true,
    emailStatusChange: true,
    emailDealClosed: true,
    emailWeeklyReport: false,
    pushNewVisit: true,
    pushStatusChange: false,
    pushNoShow: true,
    pushDealClosed: true,
    smsReminders: false,
    smsUrgentOnly: true,
  });

  // Appearance state
  const [appearance, setAppearance] = useState({
    theme: 'light',
    accentColor: 'gold',
    density: 'comfortable',
    sidebarCollapsed: false,
    showAgentPhotos: true,
    animationsEnabled: true,
  });

  // Security state
  const [security, setSecurity] = useState({
    twoFactor: false,
    sessionTimeout: '4h',
    loginAlerts: true,
    deviceHistory: true,
  });

  const showNotif = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSave = () => showNotif('Settings saved successfully');

  return (
    <div className="flex h-screen bg-[#f0ede8] font-sans text-[#0f1f3d] overflow-hidden">

      {/* ── SIDEBAR ── */}
      {/* <aside className={`relative flex flex-col bg-[#0f1f3d] transition-all duration-300 ${sidebarOpen ? 'w-60' : 'w-16'} flex-shrink-0 z-20`}>
        <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-sm bg-[#b89a5a]">
            <span className="font-serif text-sm font-bold text-white">A</span>
          </div>
          {sidebarOpen && (
            <span className="font-serif text-lg text-white tracking-wider">Altis<span className="text-[#d4b87a]">.</span></span>
          )}
        </div>
        <nav className="flex-1 py-4 space-y-0.5 px-2 overflow-y-auto">
          {navItems.map(({ icon: Icon, label, id }) => {
            const isActive = id === 'settings';
            return (
              <button
                key={id}
                onClick={() => {
                  if (id === 'dashboard') window.location.href = '/admin/dashboard';
                  else if (id === 'attendance') window.location.href = '/admin/attendance_dashboard';
                  else if (id === 'properties') window.location.href = '/admin/properties_dashboard';
                  else if (id === 'developments') window.location.href = '/admin/development_dashboard';
                  else if (id === 'clients') window.location.href = '/admin/client_dashboard';
                  // else if (id === 'reports') window.location.href = '/admin/reports_dashboard';
                  else if (id === 'settings') window.location.href = '/admin/settings_dashboard';
                }}
                className={`flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-left transition-all ${isActive ? 'bg-[#b89a5a] text-white' : 'text-white/50 hover:bg-white/5 hover:text-white/80'}`}
              >
                <Icon size={16} className="flex-shrink-0" />
                {sidebarOpen && <span className="text-[12px] font-medium tracking-wide">{label}</span>}
                {sidebarOpen && isActive && <ChevronRight size={12} className="ml-auto" />}
              </button>
            );
          })}
        </nav>
        <div className="border-t border-white/10 p-3 space-y-1">
          <div className={`flex items-center gap-3 px-3 py-2.5 ${sidebarOpen ? '' : 'justify-center'}`}>
            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=60&q=80" alt="Admin" className="h-7 w-7 flex-shrink-0 rounded-full object-cover object-top" />
            {sidebarOpen && (
              <div className="min-w-0">
                <p className="truncate text-[11px] font-medium text-white">Jonathan Altis</p>
                <p className="text-[9px] text-white/40">Administrator</p>
              </div>
            )}
          </div>
          <button className={`flex w-full items-center gap-3 rounded-sm px-3 py-2 text-white/40 hover:text-rose-400 transition-colors ${!sidebarOpen ? 'justify-center' : ''}`}>
            <LogOut size={14} />
            {sidebarOpen && <span className="text-[11px]">Sign Out</span>}
          </button>
        </div>
        <button
          onClick={() => setSidebarOpen(s => !s)}
          className="absolute -right-3 top-8 flex h-6 w-6 items-center justify-center rounded-full bg-[#b89a5a] text-white shadow-lg"
        >
          {sidebarOpen ? <ChevronDown size={10} className="-rotate-90" /> : <ChevronDown size={10} className="rotate-90" />}
        </button>
      </aside> */}

      {/* ── MAIN CONTENT ── */}
      <div className="flex flex-1 flex-col overflow-hidden">

        {/* Top bar */}
        <header className="flex items-center justify-between border-b border-[#e2ddd6] bg-white px-6 py-3.5 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search settings..."
                className="rounded-sm border border-gray-200 bg-[#f7f6f3] pl-9 pr-4 py-2 text-[12px] outline-none focus:border-[#b89a5a] w-64 transition-colors placeholder:text-gray-400"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[11px] text-gray-400">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <button className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#f7f6f3] border border-gray-200 text-gray-500 hover:border-[#b89a5a] transition-colors">
              <Bell size={14} />
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 rounded-sm bg-[#0f1f3d] px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-white hover:bg-[#b89a5a] transition-colors"
            >
              <Save size={12} /> Save Changes
            </button>
          </div>
        </header>

        {/* Settings layout */}
        <div className="flex flex-1 overflow-hidden">

          {/* Settings sidebar */}
          <aside className="w-52 flex-shrink-0 border-r border-[#e2ddd6] bg-white overflow-y-auto">
            <div className="p-4">
              <p className="mb-3 text-[9px] font-bold uppercase tracking-widest text-gray-400">Preferences</p>
              <nav className="space-y-0.5">
                {settingsSections.map(({ id, icon: Icon, label }) => (
                  <button
                    key={id}
                    onClick={() => setActiveSection(id)}
                    className={`flex w-full items-center gap-2.5 rounded-sm px-3 py-2.5 text-left transition-all ${activeSection === id ? 'bg-[#f0ede8] text-[#0f1f3d] font-semibold' : 'text-gray-500 hover:bg-[#faf9f7] hover:text-[#0f1f3d]'}`}
                  >
                    <Icon size={13} className={activeSection === id ? 'text-[#b89a5a]' : ''} />
                    <span className="text-[12px]">{label}</span>
                    {activeSection === id && <ChevronRight size={10} className="ml-auto text-[#b89a5a]" />}
                  </button>
                ))}
              </nav>

              <p className="mb-3 mt-6 text-[9px] font-bold uppercase tracking-widest text-gray-400">Danger Zone</p>
              <button className="flex w-full items-center gap-2.5 rounded-sm px-3 py-2.5 text-left text-rose-500 hover:bg-rose-50 transition-colors">
                <Trash2 size={13} />
                <span className="text-[12px]">Delete Account</span>
              </button>
            </div>
          </aside>

          {/* Settings content */}
          <main className="flex-1 overflow-y-auto p-6 space-y-6">

            {/* ── PROFILE ── */}
            {activeSection === 'profile' && (
              <div className="space-y-6">
                <SectionHeader title="Profile" subtitle="Manage your personal information and how it appears across the platform." />

                {/* Avatar card */}
                <div className="rounded-sm bg-white border border-[#e2ddd6] shadow-sm p-6">
                  <h3 className="mb-5 text-[11px] font-bold uppercase tracking-widest text-gray-400">Profile Photo</h3>
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&q=80" alt="Profile" className="h-20 w-20 rounded-full object-cover object-top ring-4 ring-[#f0ede8]" />
                      <button className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#b89a5a] text-white shadow-md hover:bg-[#a08848] transition-colors">
                        <Camera size={12} />
                      </button>
                    </div>
                    <div>
                      <p className="text-[13px] font-medium">Jonathan Altis</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">Administrator · Altis Realty</p>
                      <div className="mt-3 flex gap-2">
                        <button className="flex items-center gap-1.5 rounded-sm border border-[#0f1f3d] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#0f1f3d] hover:bg-[#0f1f3d] hover:text-white transition-all">
                          <Upload size={10} /> Upload New
                        </button>
                        <button className="flex items-center gap-1.5 rounded-sm border border-gray-200 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-500 hover:border-rose-300 hover:text-rose-500 transition-all">
                          <Trash2 size={10} /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Personal info */}
                <div className="rounded-sm bg-white border border-[#e2ddd6] shadow-sm p-6">
                  <h3 className="mb-5 text-[11px] font-bold uppercase tracking-widest text-gray-400">Personal Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="First Name" value={profile.firstName} onChange={v => setProfile(p => ({ ...p, firstName: v }))} />
                    <Field label="Last Name" value={profile.lastName} onChange={v => setProfile(p => ({ ...p, lastName: v }))} />
                    <Field label="Email Address" value={profile.email} onChange={v => setProfile(p => ({ ...p, email: v }))} icon={<Mail size={12} className="text-gray-400" />} />
                    <Field label="Phone Number" value={profile.phone} onChange={v => setProfile(p => ({ ...p, phone: v }))} icon={<Phone size={12} className="text-gray-400" />} />
                    <Field label="Role" value={profile.role} onChange={v => setProfile(p => ({ ...p, role: v }))} disabled />
                    <Field label="Location" value={profile.location} onChange={v => setProfile(p => ({ ...p, location: v }))} icon={<MapPin size={12} className="text-gray-400" />} />
                  </div>
                  <div className="mt-4">
                    <label className="block mb-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-500">Bio</label>
                    <textarea
                      value={profile.bio}
                      onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))}
                      rows={3}
                      className="w-full rounded-sm border border-gray-200 bg-[#faf9f7] px-3 py-2.5 text-[12px] text-[#0f1f3d] outline-none focus:border-[#b89a5a] resize-none transition-colors"
                    />
                  </div>
                </div>

                {/* Regional settings */}
                <div className="rounded-sm bg-white border border-[#e2ddd6] shadow-sm p-6">
                  <h3 className="mb-5 text-[11px] font-bold uppercase tracking-widest text-gray-400">Regional Settings</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <SelectField
                      label="Timezone"
                      value={profile.timezone}
                      onChange={v => setProfile(p => ({ ...p, timezone: v }))}
                      options={['America/Los_Angeles', 'America/New_York', 'America/Chicago', 'Europe/London', 'Europe/Paris', 'Asia/Dubai']}
                    />
                    <SelectField
                      label="Language"
                      value={profile.language}
                      onChange={v => setProfile(p => ({ ...p, language: v }))}
                      options={['English (US)', 'English (UK)', 'French', 'Spanish', 'Arabic', 'Mandarin']}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ── SECURITY ── */}
            {activeSection === 'security' && (
              <div className="space-y-6">
                <SectionHeader title="Security" subtitle="Manage your account security, authentication, and active sessions." />

                {/* Password */}
                <div className="rounded-sm bg-white border border-[#e2ddd6] shadow-sm p-6">
                  <h3 className="mb-5 text-[11px] font-bold uppercase tracking-widest text-gray-400">Change Password</h3>
                  <div className="space-y-4 max-w-md">
                    <PasswordField label="Current Password" showPassword={showPassword} onToggle={() => setShowPassword(s => !s)} />
                    <PasswordField label="New Password" showPassword={showPassword} onToggle={() => setShowPassword(s => !s)} />
                    <PasswordField label="Confirm New Password" showPassword={showPassword} onToggle={() => setShowPassword(s => !s)} />
                    <div className="pt-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Password Strength</p>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map(i => (
                          <div key={i} className={`h-1 flex-1 rounded-full ${i <= 3 ? 'bg-[#b89a5a]' : 'bg-gray-200'}`} />
                        ))}
                      </div>
                      <p className="mt-1.5 text-[10px] text-[#b89a5a]">Strong password</p>
                    </div>
                    <button onClick={handleSave} className="rounded-sm bg-[#0f1f3d] px-5 py-2 text-[11px] font-bold uppercase tracking-widest text-white hover:bg-[#b89a5a] transition-colors">
                      Update Password
                    </button>
                  </div>
                </div>

                {/* 2FA */}
                <div className="rounded-sm bg-white border border-[#e2ddd6] shadow-sm p-6">
                  <h3 className="mb-5 text-[11px] font-bold uppercase tracking-widest text-gray-400">Two-Factor Authentication</h3>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[13px] font-medium">Authenticator App</p>
                      <p className="text-[11px] text-gray-400 mt-1 max-w-sm">Use an authenticator app like Google Authenticator or Authy to generate time-based one-time passwords.</p>
                      {!security.twoFactor && (
                        <button className="mt-3 flex items-center gap-1.5 rounded-sm border border-[#0f1f3d] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#0f1f3d] hover:bg-[#0f1f3d] hover:text-white transition-all">
                          <Smartphone size={10} /> Enable 2FA
                        </button>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {security.twoFactor ? (
                        <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-[10px] font-bold text-emerald-700">
                          <Check size={10} /> Enabled
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 rounded-full bg-gray-100 border border-gray-200 px-3 py-1 text-[10px] font-bold text-gray-500">
                          <X size={10} /> Disabled
                        </span>
                      )}
                      <Toggle enabled={security.twoFactor} onChange={() => setSecurity(s => ({ ...s, twoFactor: !s.twoFactor }))} />
                    </div>
                  </div>
                </div>

                {/* Session settings */}
                <div className="rounded-sm bg-white border border-[#e2ddd6] shadow-sm p-6">
                  <h3 className="mb-5 text-[11px] font-bold uppercase tracking-widest text-gray-400">Session & Alerts</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-[#f0ede8]">
                      <div>
                        <p className="text-[12px] font-medium">Login Alerts</p>
                        <p className="text-[11px] text-gray-400 mt-0.5">Get notified of new sign-ins via email</p>
                      </div>
                      <Toggle enabled={security.loginAlerts} onChange={() => setSecurity(s => ({ ...s, loginAlerts: !s.loginAlerts }))} />
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-[#f0ede8]">
                      <div>
                        <p className="text-[12px] font-medium">Device Login History</p>
                        <p className="text-[11px] text-gray-400 mt-0.5">Track all devices and locations that access your account</p>
                      </div>
                      <Toggle enabled={security.deviceHistory} onChange={() => setSecurity(s => ({ ...s, deviceHistory: !s.deviceHistory }))} />
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <div>
                        <p className="text-[12px] font-medium">Auto Logout</p>
                        <p className="text-[11px] text-gray-400 mt-0.5">Automatically sign out after inactivity</p>
                      </div>
                      <SelectField
                        label=""
                        value={security.sessionTimeout}
                        onChange={v => setSecurity(s => ({ ...s, sessionTimeout: v }))}
                        options={['1h', '2h', '4h', '8h', '24h', 'Never']}
                        compact
                      />
                    </div>
                  </div>
                </div>

                {/* Active sessions */}
                <div className="rounded-sm bg-white border border-[#e2ddd6] shadow-sm p-6">
                  <h3 className="mb-5 text-[11px] font-bold uppercase tracking-widest text-gray-400">Active Sessions</h3>
                  <div className="space-y-3">
                    {[
                      { device: 'MacBook Pro 16"', location: 'Los Angeles, CA', time: 'Active now', current: true, icon: Monitor },
                      { device: 'iPhone 15 Pro', location: 'Los Angeles, CA', time: '2 hours ago', current: false, icon: Smartphone },
                      { device: 'iPad Pro', location: 'Santa Monica, CA', time: '3 days ago', current: false, icon: Monitor },
                    ].map(({ device, location, time, current, icon: Icon }) => (
                      <div key={device} className="flex items-center justify-between rounded-sm border border-[#f0ede8] p-4 bg-[#faf9f7]">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-white border border-[#e2ddd6]">
                            <Icon size={14} className="text-gray-400" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-[12px] font-medium">{device}</p>
                              {current && <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[9px] font-bold text-emerald-700">Current</span>}
                            </div>
                            <p className="text-[10px] text-gray-400 mt-0.5">{location} · {time}</p>
                          </div>
                        </div>
                        {!current && (
                          <button className="text-[10px] font-bold text-rose-500 hover:text-rose-700 transition-colors">Revoke</button>
                        )}
                      </div>
                    ))}
                  </div>
                  <button className="mt-4 text-[10px] font-bold uppercase tracking-widest text-rose-500 hover:text-rose-700 transition-colors">Revoke All Other Sessions</button>
                </div>
              </div>
            )}

            {/* ── NOTIFICATIONS ── */}
            {activeSection === 'notifications' && (
              <div className="space-y-6">
                <SectionHeader title="Notifications" subtitle="Control how and when you receive updates about visits, clients, and deals." />

                {[
                  {
                    title: 'Email Notifications',
                    icon: Mail,
                    items: [
                      { key: 'emailNewVisit',      label: 'New Visit Scheduled',    desc: 'Receive an email when a new visit is booked' },
                      { key: 'emailStatusChange',  label: 'Visit Status Changes',   desc: 'Notified when a visit is confirmed, cancelled or rescheduled' },
                      { key: 'emailDealClosed',    label: 'Deal Closed',            desc: 'Email confirmation when a deal is marked as completed' },
                      { key: 'emailWeeklyReport',  label: 'Weekly Summary Report',  desc: 'Receive a weekly digest every Monday morning' },
                    ],
                  },
                  {
                    title: 'Push Notifications',
                    icon: BellRing,
                    items: [
                      { key: 'pushNewVisit',      label: 'New Visit Alert',     desc: 'Instant push for newly booked visits' },
                      { key: 'pushStatusChange',  label: 'Status Updates',      desc: 'Real-time updates on visit status changes' },
                      { key: 'pushNoShow',        label: 'No-Show Flag',        desc: 'Alert when a client misses their appointment' },
                      { key: 'pushDealClosed',    label: 'Deal Milestones',     desc: 'Celebrate completed deals in real time' },
                    ],
                  },
                  {
                    title: 'SMS Notifications',
                    icon: Smartphone,
                    items: [
                      { key: 'smsReminders',  label: 'Appointment Reminders', desc: 'SMS reminders 1 hour before a scheduled visit' },
                      { key: 'smsUrgentOnly', label: 'Urgent Alerts Only',    desc: 'Only receive SMS for cancellations and no-shows' },
                    ],
                  },
                ].map(({ title, icon: Icon, items }) => (
                  <div key={title} className="rounded-sm bg-white border border-[#e2ddd6] shadow-sm p-6">
                    <div className="flex items-center gap-2 mb-5">
                      <Icon size={14} className="text-[#b89a5a]" />
                      <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-400">{title}</h3>
                    </div>
                    <div className="space-y-0">
                      {items.map(({ key, label, desc }, i) => (
                        <div key={key} className={`flex items-center justify-between py-4 ${i < items.length - 1 ? 'border-b border-[#f0ede8]' : ''}`}>
                          <div>
                            <p className="text-[12px] font-medium">{label}</p>
                            <p className="text-[11px] text-gray-400 mt-0.5">{desc}</p>
                          </div>
                          <Toggle
                            enabled={notifSettings[key]}
                            onChange={() => setNotifSettings(s => ({ ...s, [key]: !s[key] }))}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── APPEARANCE ── */}
            {activeSection === 'appearance' && (
              <div className="space-y-6">
                <SectionHeader title="Appearance" subtitle="Personalise the look and feel of your dashboard." />

                {/* Theme */}
                <div className="rounded-sm bg-white border border-[#e2ddd6] shadow-sm p-6">
                  <h3 className="mb-5 text-[11px] font-bold uppercase tracking-widest text-gray-400">Theme</h3>
                  <div className="flex gap-3">
                    {['light', 'dark', 'system'].map(t => (
                      <button
                        key={t}
                        onClick={() => setAppearance(a => ({ ...a, theme: t }))}
                        className={`flex-1 rounded-sm border-2 p-4 text-center transition-all ${appearance.theme === t ? 'border-[#b89a5a] bg-[#faf8f3]' : 'border-[#e2ddd6] hover:border-[#b89a5a]/40'}`}
                      >
                        <div className={`mx-auto mb-2 h-10 w-full rounded-sm border ${t === 'dark' ? 'bg-[#0f1f3d]' : t === 'system' ? 'bg-gradient-to-r from-white to-[#0f1f3d]' : 'bg-white'} border-gray-200`} />
                        <p className="text-[11px] font-bold capitalize text-[#0f1f3d]">{t}</p>
                        {appearance.theme === t && <Check size={12} className="mx-auto mt-1 text-[#b89a5a]" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Accent color */}
                <div className="rounded-sm bg-white border border-[#e2ddd6] shadow-sm p-6">
                  <h3 className="mb-5 text-[11px] font-bold uppercase tracking-widest text-gray-400">Accent Color</h3>
                  <div className="flex gap-3">
                    {[
                      { id: 'gold',  color: 'bg-[#b89a5a]', label: 'Gold' },
                      { id: 'navy',  color: 'bg-[#0f1f3d]', label: 'Navy' },
                      { id: 'sage',  color: 'bg-[#6b8c6e]', label: 'Sage' },
                      { id: 'slate', color: 'bg-[#64748b]', label: 'Slate' },
                      { id: 'rose',  color: 'bg-[#be3a4e]', label: 'Rose' },
                    ].map(({ id, color, label }) => (
                      <button
                        key={id}
                        onClick={() => setAppearance(a => ({ ...a, accentColor: id }))}
                        className="flex flex-col items-center gap-2"
                      >
                        <div className={`h-9 w-9 rounded-full ${color} flex items-center justify-center ring-2 ring-offset-2 transition-all ${appearance.accentColor === id ? 'ring-[#b89a5a]' : 'ring-transparent'}`}>
                          {appearance.accentColor === id && <Check size={12} className="text-white" />}
                        </div>
                        <span className="text-[10px] text-gray-500">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Density & options */}
                <div className="rounded-sm bg-white border border-[#e2ddd6] shadow-sm p-6">
                  <h3 className="mb-5 text-[11px] font-bold uppercase tracking-widest text-gray-400">Display Options</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-[12px] font-medium mb-3">Table Density</p>
                      <div className="flex gap-2">
                        {['compact', 'comfortable', 'spacious'].map(d => (
                          <button
                            key={d}
                            onClick={() => setAppearance(a => ({ ...a, density: d }))}
                            className={`rounded-sm border px-3 py-2 text-[11px] font-medium capitalize transition-all ${appearance.density === d ? 'border-[#b89a5a] bg-[#faf8f3] text-[#0f1f3d]' : 'border-gray-200 text-gray-500 hover:border-[#b89a5a]/40'}`}
                          >
                            {d}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between py-3 border-t border-[#f0ede8]">
                      <div>
                        <p className="text-[12px] font-medium">Show Agent Photos</p>
                        <p className="text-[11px] text-gray-400 mt-0.5">Display agent avatars in tables and lists</p>
                      </div>
                      <Toggle enabled={appearance.showAgentPhotos} onChange={() => setAppearance(a => ({ ...a, showAgentPhotos: !a.showAgentPhotos }))} />
                    </div>
                    <div className="flex items-center justify-between py-3 border-t border-[#f0ede8]">
                      <div>
                        <p className="text-[12px] font-medium">Interface Animations</p>
                        <p className="text-[11px] text-gray-400 mt-0.5">Enable transitions and motion effects throughout the dashboard</p>
                      </div>
                      <Toggle enabled={appearance.animationsEnabled} onChange={() => setAppearance(a => ({ ...a, animationsEnabled: !a.animationsEnabled }))} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── INTEGRATIONS ── */}
            {activeSection === 'integrations' && (
              <div className="space-y-6">
                <SectionHeader title="Integrations" subtitle="Connect external tools and services to extend your dashboard capabilities." />

                <div className="rounded-sm bg-white border border-[#e2ddd6] shadow-sm divide-y divide-[#f0ede8]">
                  {[
                    { name: 'Google Calendar', desc: 'Sync visit appointments with your Google Calendar', connected: true,  logo: '📅' },
                    { name: 'Mailchimp',        desc: 'Automate client outreach and follow-up campaigns',  connected: true,  logo: '📧' },
                    { name: 'DocuSign',         desc: 'Send and track property agreements electronically', connected: false, logo: '✍️' },
                    { name: 'Salesforce CRM',   desc: 'Sync client data and deal pipeline',                connected: false, logo: '☁️' },
                    { name: 'Stripe',           desc: 'Process deposit payments and retainer fees',        connected: false, logo: '💳' },
                    { name: 'Zapier',           desc: 'Automate workflows across 5000+ apps',             connected: true,  logo: '⚡' },
                  ].map(({ name, desc, connected, logo }) => (
                    <div key={name} className="flex items-center justify-between p-5 hover:bg-[#faf9f7] transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-[#e2ddd6] bg-white text-xl shadow-sm">
                          {logo}
                        </div>
                        <div>
                          <p className="text-[13px] font-medium">{name}</p>
                          <p className="text-[11px] text-gray-400 mt-0.5">{desc}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {connected ? (
                          <>
                            <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-[9px] font-bold text-emerald-700">
                              <Check size={9} /> Connected
                            </span>
                            <button className="text-[10px] font-bold text-gray-400 hover:text-rose-500 transition-colors">Disconnect</button>
                          </>
                        ) : (
                          <button className="flex items-center gap-1.5 rounded-sm border border-[#0f1f3d] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#0f1f3d] hover:bg-[#0f1f3d] hover:text-white transition-all">
                            <Plus size={10} /> Connect
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* API Key */}
                <div className="rounded-sm bg-white border border-[#e2ddd6] shadow-sm p-6">
                  <h3 className="mb-1 text-[11px] font-bold uppercase tracking-widest text-gray-400">API Access</h3>
                  <p className="text-[11px] text-gray-400 mb-4">Use the API key below to integrate Altis data with custom applications.</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 flex items-center gap-2 rounded-sm border border-gray-200 bg-[#faf9f7] px-3 py-2.5">
                      <Key size={12} className="text-gray-400 flex-shrink-0" />
                      <span className="text-[12px] text-gray-500 font-mono tracking-wider">altis_sk_•••••••••••••••••••••••••••</span>
                    </div>
                    <button onClick={handleSave} className="rounded-sm border border-[#0f1f3d] px-3 py-2.5 text-[11px] font-bold text-[#0f1f3d] hover:bg-[#0f1f3d] hover:text-white transition-all flex items-center gap-1.5 whitespace-nowrap">
                      <Eye size={11} /> Reveal Key
                    </button>
                    <button className="rounded-sm bg-[#b89a5a] px-3 py-2.5 text-[11px] font-bold text-white hover:bg-[#a08848] transition-all whitespace-nowrap">
                      Regenerate
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ── BILLING ── */}
            {activeSection === 'billing' && (
              <div className="space-y-6">
                <SectionHeader title="Billing" subtitle="Manage your subscription, payment methods, and invoices." />

                {/* Current plan */}
                <div className="rounded-sm bg-[#0f1f3d] p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
                  <div className="relative">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#d4b87a]">Current Plan</p>
                    <h2 className="font-serif text-3xl text-white mt-1">Enterprise</h2>
                    <p className="text-[12px] text-white/50 mt-1">Renews on June 1, 2026 · $299/month</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {['Unlimited Agents', 'Unlimited Visits', 'Advanced Reports', 'Priority Support', 'API Access'].map(f => (
                        <span key={f} className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-[10px] text-white/80">
                          <Check size={9} className="text-[#d4b87a]" /> {f}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button className="rounded-sm bg-[#b89a5a] px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-white hover:bg-[#a08848] transition-colors">Manage Plan</button>
                      <button className="rounded-sm border border-white/20 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-white/70 hover:border-white/50 hover:text-white transition-colors">Cancel Subscription</button>
                    </div>
                  </div>
                </div>

                {/* Payment method */}
                <div className="rounded-sm bg-white border border-[#e2ddd6] shadow-sm p-6">
                  <h3 className="mb-5 text-[11px] font-bold uppercase tracking-widest text-gray-400">Payment Method</h3>
                  <div className="flex items-center justify-between rounded-sm border border-[#e2ddd6] p-4 bg-[#faf9f7]">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-14 items-center justify-center rounded-sm border border-gray-200 bg-white text-[10px] font-bold text-[#0f1f3d]">VISA</div>
                      <div>
                        <p className="text-[12px] font-medium">Visa ending in 4242</p>
                        <p className="text-[10px] text-gray-400">Expires 09 / 2028</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-[9px] font-bold text-emerald-700">Primary</span>
                      <button className="text-[10px] font-bold text-[#b89a5a] hover:text-[#0f1f3d] transition-colors">Edit</button>
                    </div>
                  </div>
                  <button className="mt-3 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#0f1f3d] hover:text-[#b89a5a] transition-colors">
                    <Plus size={10} /> Add Payment Method
                  </button>
                </div>

                {/* Invoices */}
                <div className="rounded-sm bg-white border border-[#e2ddd6] shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-[#e2ddd6]">
                    <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Invoices</h3>
                  </div>
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#faf9f7] border-b border-[#f0ede8]">
                        {['Date', 'Description', 'Amount', 'Status', ''].map(h => (
                          <th key={h} className="px-6 py-3 text-left text-[9px] font-bold uppercase tracking-widest text-gray-400">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f7f5f2]">
                      {[
                        { date: 'May 1, 2026', desc: 'Enterprise Plan — May 2026', amount: '$299.00', paid: true },
                        { date: 'Apr 1, 2026', desc: 'Enterprise Plan — Apr 2026', amount: '$299.00', paid: true },
                        { date: 'Mar 1, 2026', desc: 'Enterprise Plan — Mar 2026', amount: '$299.00', paid: true },
                        { date: 'Feb 1, 2026', desc: 'Enterprise Plan — Feb 2026', amount: '$299.00', paid: true },
                      ].map(({ date, desc, amount, paid }) => (
                        <tr key={date} className="hover:bg-[#faf9f7] transition-colors">
                          <td className="px-6 py-3.5 text-[12px] text-gray-500">{date}</td>
                          <td className="px-6 py-3.5 text-[12px]">{desc}</td>
                          <td className="px-6 py-3.5 text-[12px] font-medium">{amount}</td>
                          <td className="px-6 py-3.5">
                            <span className={`rounded-full px-2.5 py-1 text-[9px] font-bold ${paid ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
                              {paid ? 'Paid' : 'Pending'}
                            </span>
                          </td>
                          <td className="px-6 py-3.5">
                            <button className="flex items-center gap-1 text-[10px] font-bold text-[#b89a5a] hover:text-[#0f1f3d] transition-colors">
                              <Download size={10} /> PDF
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ── PRIVACY ── */}
            {activeSection === 'privacy' && (
              <div className="space-y-6">
                <SectionHeader title="Privacy & Data" subtitle="Control how your data is used, stored, and shared within the platform." />

                <div className="rounded-sm bg-amber-50 border border-amber-200 p-4 flex gap-3">
                  <AlertCircle size={15} className="text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-[12px] text-amber-800">Altis stores all data in compliance with GDPR and CCPA. You can export or delete your data at any time.</p>
                </div>

                <div className="rounded-sm bg-white border border-[#e2ddd6] shadow-sm p-6">
                  <h3 className="mb-5 text-[11px] font-bold uppercase tracking-widest text-gray-400">Data Controls</h3>
                  <div className="space-y-0">
                    {[
                      { label: 'Analytics & Usage Data', desc: 'Allow Altis to collect anonymised usage data to improve the product' },
                      { label: 'Marketing Communications', desc: 'Receive product updates, tips, and promotional emails from Altis' },
                      { label: 'Third-Party Data Sharing', desc: 'Allow integrated services (e.g. Salesforce) to access client records' },
                      { label: 'Activity Logging', desc: 'Log all admin actions for audit purposes (recommended)' },
                    ].map(({ label, desc }, i, arr) => (
                      <div key={label} className={`flex items-center justify-between py-4 ${i < arr.length - 1 ? 'border-b border-[#f0ede8]' : ''}`}>
                        <div>
                          <p className="text-[12px] font-medium">{label}</p>
                          <p className="text-[11px] text-gray-400 mt-0.5">{desc}</p>
                        </div>
                        <Toggle enabled={i === 3} onChange={() => {}} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-sm bg-white border border-[#e2ddd6] shadow-sm p-6">
                  <h3 className="mb-5 text-[11px] font-bold uppercase tracking-widest text-gray-400">Data Portability</h3>
                  <div className="flex flex-wrap gap-3">
                    <button className="flex items-center gap-2 rounded-sm border border-[#0f1f3d] px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-[#0f1f3d] hover:bg-[#0f1f3d] hover:text-white transition-all">
                      <Download size={11} /> Export All Data
                    </button>
                    <button className="flex items-center gap-2 rounded-sm border border-[#0f1f3d] px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-[#0f1f3d] hover:bg-[#0f1f3d] hover:text-white transition-all">
                      <Download size={11} /> Export Client Records
                    </button>
                    <button className="flex items-center gap-2 rounded-sm border border-[#0f1f3d] px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-[#0f1f3d] hover:bg-[#0f1f3d] hover:text-white transition-all">
                      <Download size={11} /> Export Work Hours History
                    </button>
                  </div>
                </div>

                <div className="rounded-sm border border-rose-200 bg-rose-50 p-6">
                  <h3 className="mb-2 text-[11px] font-bold uppercase tracking-widest text-rose-700">Danger Zone</h3>
                  <p className="text-[12px] text-rose-600 mb-4">These actions are irreversible. Please proceed with caution.</p>
                  <div className="flex flex-wrap gap-3">
                    <button className="flex items-center gap-2 rounded-sm border border-rose-400 bg-white px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-rose-600 hover:bg-rose-600 hover:text-white transition-all">
                      <Trash2 size={11} /> Clear All Visit Data
                    </button>
                    <button className="flex items-center gap-2 rounded-sm border border-rose-400 bg-white px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-rose-600 hover:bg-rose-600 hover:text-white transition-all">
                      <Trash2 size={11} /> Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}

          </main>
        </div>
      </div>

      {/* Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-sm bg-[#0f1f3d] px-5 py-3.5 shadow-2xl border-l-4 border-[#b89a5a]">
          <CheckCircle2 size={15} className="text-[#d4b87a]" />
          <span className="text-[12px] font-medium text-white">{notification}</span>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   SMALL REUSABLE COMPONENTS
───────────────────────────────────────────── */
function SectionHeader({ title, subtitle }) {
  return (
    <div className="border-b border-[#e2ddd6] pb-4">
      <h1 className="font-serif text-2xl font-normal">{title}</h1>
      <p className="mt-1 text-[12px] text-gray-500">{subtitle}</p>
    </div>
  );
}

function Field({ label, value, onChange, icon, disabled }) {
  return (
    <div>
      <label className="block mb-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-500">{label}</label>
      <div className="relative">
        {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2">{icon}</div>}
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          disabled={disabled}
          className={`w-full rounded-sm border border-gray-200 bg-[#faf9f7] ${icon ? 'pl-8' : 'pl-3'} pr-3 py-2.5 text-[12px] text-[#0f1f3d] outline-none focus:border-[#b89a5a] transition-colors ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        />
      </div>
    </div>
  );
}

function SelectField({ label, value, onChange, options, compact }) {
  return (
    <div className={compact ? '' : ''}>
      {label && <label className="block mb-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-500">{label}</label>}
      <div className="relative">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className={`w-full appearance-none rounded-sm border border-gray-200 bg-[#faf9f7] px-3 ${compact ? 'py-1.5' : 'py-2.5'} text-[12px] text-[#0f1f3d] outline-none focus:border-[#b89a5a] transition-colors pr-8`}
        >
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown size={11} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  );
}

function PasswordField({ label, showPassword, onToggle }) {
  return (
    <div>
      <label className="block mb-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-500">{label}</label>
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          className="w-full rounded-sm border border-gray-200 bg-[#faf9f7] pl-3 pr-9 py-2.5 text-[12px] text-[#0f1f3d] outline-none focus:border-[#b89a5a] transition-colors"
        />
        <button onClick={onToggle} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0f1f3d] transition-colors">
          {showPassword ? <EyeOff size={13} /> : <Eye size={13} />}
        </button>
      </div>
    </div>
  );
}