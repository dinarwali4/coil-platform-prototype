import React, { useState } from "react";
import {
  Users,
  MessageSquare,
  Clock,
  ShieldAlert,
  WifiOff,
  Wifi,
  Lock,
  CheckCircle,
  Flag,
  LayoutDashboard,
  Globe,
} from "lucide-react";

// --- MOCK DATA ---
const TEAMS = [
  {
    id: 1,
    name: "Team Alpha",
    members: ["Sarah (NYC)", "Ahmed (Cairo)", "Yuki (Tokyo)"],
    status: "Active",
    lastActivity: "2h ago",
  },
  {
    id: 2,
    name: "Team Bravo",
    members: ["Maria (Berlin)", "John (Austin)", "Wei (Beijing)"],
    status: "At Risk",
    lastActivity: "3d ago",
    alert: "Low Participation",
  },
];

const MESSAGES = [
  {
    id: 1,
    user: "Sarah",
    text: "Hi everyone! I've uploaded my intro video.",
    time: "09:00 AM",
    location: "New York",
  },
  {
    id: 2,
    user: "Ahmed",
    text: "Great! I just watched it. Interesting point about SDG #4.",
    time: "04:00 PM",
    location: "Cairo",
  },
  {
    id: 3,
    user: "System",
    text: "PROMPT: How does this issue show up in your local community?",
    type: "prompt",
  },
];

const TIMEZONES = [
  { city: "New York", offset: -5, awake: [7, 23] },
  { city: "Cairo", offset: 2, awake: [6, 22] },
  { city: "Tokyo", offset: 9, awake: [7, 23] },
];

// --- COMPONENTS ---

// 1. Timezone Overlap Finder (The PDF "Overlap Finder")
const TimezoneVisualizer = () => {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-6">
      <h3 className="text-sm font-bold text-slate-700 mb-3 flex items-center">
        <Clock className="w-4 h-4 mr-2 text-blue-600" />
        The Overlap Finder (Find Synchronous Time)
      </h3>
      <div className="space-y-2">
        {TIMEZONES.map((tz) => (
          <div key={tz.city} className="flex items-center text-xs">
            <span className="w-16 font-medium text-slate-600">{tz.city}</span>
            <div className="flex-1 flex h-4 gap-0.5">
              {hours.map((h) => {
                // simple shift simulation
                const localHour = (h + tz.offset + 24) % 24;
                const isAwake = localHour >= 8 && localHour <= 22;
                const isOverlap = h >= 13 && h <= 15; // Hardcoded overlap window for demo

                let bgClass = "bg-gray-200"; // Sleeping
                if (isAwake) bgClass = "bg-blue-200"; // Awake
                if (isOverlap) bgClass = "bg-green-500"; // Overlap (Golden Time)

                return (
                  <div
                    key={h}
                    className={`flex-1 rounded-sm ${bgClass}`}
                    title={`${localHour}:00`}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 text-xs text-green-700 font-medium text-center">
        ✓ Optimal Meeting Window: 13:00 - 15:00 UTC
      </div>
    </div>
  );
};

// 2. Phased Progression Sidebar (The "Scaffolding")
const ProjectPhases = ({ activePhase }) => (
  <div className="w-full md:w-64 bg-white border-r border-slate-200 p-4 hidden md:block">
    <h2 className="font-bold text-slate-800 mb-6">Project Timeline</h2>
    <ul className="space-y-4">
      <li className="flex items-center text-green-600">
        <CheckCircle className="w-5 h-5 mr-3" />
        <span className="text-sm">1. Icebreakers</span>
      </li>
      <li
        className={`flex items-center ${
          activePhase === 2 ? "text-blue-600 font-bold" : "text-slate-400"
        }`}
      >
        <div
          className={`w-5 h-5 mr-3 rounded-full flex items-center justify-center border ${
            activePhase === 2 ? "border-blue-600" : "border-slate-300"
          }`}
        >
          2
        </div>
        <span className="text-sm">2. Topic Exploration</span>
      </li>
      <li className="flex items-center text-slate-400">
        <Lock className="w-4 h-4 mr-3" />
        <span className="text-sm">3. Co-Creation</span>
      </li>
      <li className="flex items-center text-slate-400">
        <Lock className="w-4 h-4 mr-3" />
        <span className="text-sm">4. Reflection</span>
      </li>
    </ul>

    <div className="mt-8 p-3 bg-blue-50 rounded text-xs text-blue-800">
      <strong>Faculty Note:</strong> Phase 3 unlocks automatically on Nov 28th.
    </div>
  </div>
);

// 3. Faculty Dashboard View
const FacultyDashboard = () => (
  <div className="p-6 bg-slate-50 min-h-screen">
    <header className="mb-8">
      <h1 className="text-2xl font-bold text-slate-900">
        Mission Control Dashboard
      </h1>
      <p className="text-slate-600">Global Health Project • Fall 2025</p>
    </header>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {TEAMS.map((team) => (
        <div
          key={team.id}
          className="bg-white p-5 rounded-lg shadow-sm border border-slate-200"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-bold text-lg text-slate-800">{team.name}</h3>
              <div className="flex gap-2 mt-1">
                {team.members.map((m) => (
                  <span
                    key={m}
                    className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-full"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
            {team.status === "At Risk" ? (
              <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold flex items-center">
                <ShieldAlert className="w-3 h-3 mr-1" /> Intervention Needed
              </span>
            ) : (
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                Active
              </span>
            )}
          </div>

          <div className="h-24 bg-slate-50 rounded flex items-end justify-between px-2 pb-2 gap-1">
            {/* Fake Engagement Graph */}
            {[40, 60, 30, 80, 20, 10, 50].map((h, i) => (
              <div
                key={i}
                style={{ height: `${team.status === "At Risk" ? h / 2 : h}%` }}
                className={`w-full rounded-t ${
                  team.status === "At Risk" ? "bg-red-300" : "bg-blue-300"
                }`}
              ></div>
            ))}
          </div>
          <p className="mt-3 text-xs text-slate-500 text-right">
            Last activity: {team.lastActivity}
          </p>
        </div>
      ))}
    </div>
  </div>
);

// --- MAIN APP SHELL ---

export default function App() {
  const [view, setView] = useState("student"); // 'student' or 'faculty'
  const [isOffline, setIsOffline] = useState(false);
  const [msgInput, setMsgInput] = useState("");
  // 1. Create a "State" to hold the messages so they can update
  const [messages, setMessages] = useState(MESSAGES);

  // 2. The function that runs when you click Send
  const handleSend = () => {
    if (msgInput.trim() === "") return; // Don't send empty messages

    const newMessage = {
      id: Date.now(),
      user: "You",
      text: msgInput,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      location: "Islamabad",
    };

    setMessages([...messages, newMessage]); // Add new message to list
    setMsgInput(""); // Clear the text box
  };
  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-slate-200 px-4 py-3 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 text-white p-1 rounded">
            <Globe size={20} />
          </div>
          <span className="font-bold text-lg tracking-tight">
            Scaffolding Global Minds
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setView(view === "student" ? "faculty" : "student")}
            className="text-xs bg-slate-800 text-white px-3 py-1 rounded hover:bg-slate-700 transition"
          >
            Switch to {view === "student" ? "Faculty" : "Student"} View
          </button>
        </div>
      </nav>

      {/* VIEW: FACULTY DASHBOARD */}
      {view === "faculty" && <FacultyDashboard />}

      {/* VIEW: STUDENT EXPERIENCE */}
      {view === "student" && (
        <div className="flex h-[calc(100vh-60px)]">
          <ProjectPhases activePhase={2} />

          <main className="flex-1 flex flex-col relative">
            {/* Header / Tools */}
            <div className="p-4 bg-white border-b border-slate-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Team Alpha Workspace</h2>
                <button
                  onClick={() => setIsOffline(!isOffline)}
                  className={`flex items-center text-xs px-3 py-1 rounded-full border ${
                    isOffline
                      ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                      : "bg-green-100 text-green-800 border-green-200"
                  }`}
                >
                  {isOffline ? (
                    <WifiOff className="w-3 h-3 mr-1" />
                  ) : (
                    <Wifi className="w-3 h-3 mr-1" />
                  )}
                  {isOffline ? "Low Bandwidth Mode" : "Online"}
                </button>
              </div>

              <TimezoneVisualizer />
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {messages.map((msg) =>
                msg.type === "prompt" ? (
                  <div
                    key={msg.id}
                    className="bg-blue-50 border border-blue-100 p-4 rounded-lg mx-8 text-center"
                  >
                    <p className="text-blue-800 text-sm font-medium italic">
                      {msg.text}
                    </p>
                    <p className="text-blue-600 text-xs mt-1">
                      - Pedagogical Bot
                    </p>
                  </div>
                ) : (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.user === "Sarah" ? "items-end" : "items-start"
                    }`}
                  >
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-xs font-bold text-slate-700">
                        {msg.user}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {msg.time} • {msg.location}
                      </span>
                    </div>
                    <div
                      className={`max-w-[80%] p-3 rounded-lg text-sm shadow-sm relative group ${
                        msg.user === "Sarah"
                          ? "bg-blue-600 text-white rounded-tr-none"
                          : "bg-white text-slate-800 border border-slate-200 rounded-tl-none"
                      }`}
                    >
                      {msg.text}
                      <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 transition">
                        <Flag size={12} />
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-200">
              {isOffline && (
                <div className="text-xs text-yellow-600 mb-2 flex items-center">
                  <WifiOff size={12} className="mr-1" /> You are offline.
                  Messages will be saved and sent when connection returns.
                </div>
              )}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={msgInput}
                  onChange={(e) => setMsgInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type a message..."
                  className="flex-1 border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSend}
                  className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  <MessageSquare size={20} />
                </button>
              </div>
            </div>
          </main>
        </div>
      )}
    </div>
  );
}
