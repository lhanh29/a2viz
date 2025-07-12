import React, { useState, useRef, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // 🔥

import { getFirestore, doc, getDoc } from "firebase/firestore";



const Dashboard = () => {
  const [user, setUser] = useState(null); // 🔥 new state for user
  const [userPlan, setUserPlan] = useState("Free");        // ✅ moved inside
  const [preferences, setPreferences] = useState({});      // ✅ moved inside
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("settings");
  const [showWorkspaceSettings, setShowWorkspaceSettings] = useState(false);
  const profileRef = useRef(null);

  // Listen for Firebase user state
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const db = getFirestore();
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserPlan(data.plan || "Free");
          setPreferences(data.preferences || {});
        }
      }
    });
    return () => unsubscribe();
  }, []);
  


  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Content for each tab
  const renderTabContent = () => {
    if (activeTab === "settings") {
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2">Workspace Name</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-gray-700 text-white"
              placeholder="Workspace Name"
              defaultValue="Andy"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Workspace Logo</label>
            <button className="bg-gray-700 text-white px-4 py-2 rounded-md">
              Upload Logo
            </button>
            <p className="text-gray-400 text-sm mt-2">Min. 200x200 px. PNG or JPG.</p>
          </div>
          <div className="flex space-x-4">
            <button
              className="px-4 py-2 bg-gray-700 rounded text-white"
              onClick={() => setShowWorkspaceSettings(false)}
            >
              Cancel
            </button>
            <button className="px-4 py-2 bg-blue-500 rounded text-white">Save</button>
          </div>
        </div>
      );
    } else if (activeTab === "members") {
      return (
        <div>
          <h3 className="text-gray-300 mb-4">Manage your team members here.</h3>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Invite Members</button>
        </div>
      );
    } else if (activeTab === "plans") {
      return (
        <div>
          <h3 className="text-gray-300 mb-4">Manage your subscription plan and billing details.</h3>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Upgrade Plan</button>
        </div>
      );
    }
  };

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="w-1/7 bg-black p-4 flex flex-col">
        {/* Profile Section */}
        <div ref={profileRef} className="mb-4 bg-gray-800 p-4 rounded-lg shadow-md relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={user?.photoURL || "https://via.placeholder.com/50"}
                alt="Profile"
                className="rounded-full w-12 h-12 border-2 border-gray-500"
              />
              <div>
              <h2 className="text-lg font-semibold">{user?.displayName || "Guest"}</h2>

              <p className="text-sm text-gray-400">{userPlan}</p>



              </div>
            </div>
            {/* Dropdown Toggle */}
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 text-gray-400 hover:text-white transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute top-full mt-2 right-0 w-full bg-gray-900 rounded-lg shadow-lg">
              <ul className="text-sm text-gray-300">
                <li
                  className="rounded-lg p-2 hover:bg-gray-700 cursor-pointer"
                  onClick={() => setShowWorkspaceSettings(true)}
                >
                  Workspace Settings
                </li>
                <li className="p-2 hover:bg-gray-700 cursor-pointer">Invite Members</li>
                <li className="rounded-lg p-2 hover:bg-gray-700 cursor-pointer">
                  Upgrade Your Plan
                </li>
              </ul>
            </div>
          )}
        </div>


        {/* Navigation Links */}
        <nav className="space-y-6">
          <div>
            <h3 className="text-gray-500 uppercase text-sm mb-2 font-semibold">Main</h3>
            <a
              href="/dashboard"
              className="block hover:text-gray-300 rounded-lg p-2 hover:bg-gray-700 cursor-pointer"
            >
              Home
            </a>
          </div>
          <div>
            <h3 className="text-gray-500 uppercase text-sm mb-2">Library</h3>
            <a
              href="#assets"
              className="block hover:text-gray-300 rounded-lg p-2 hover:bg-gray-700 cursor-pointer"
            >
              Assets
            </a>
            <a
              href="#workspace-assets"
              className="block hover:text-gray-300 rounded-lg p-2 hover:bg-gray-700 cursor-pointer"
            >
              Workspace Assets
            </a>
            <a
              href="#favorite-assets"
              className="block hover:text-gray-300 rounded-lg p-2 hover:bg-gray-700 cursor-pointer"
            >
              Favorite Assets
            </a>
            <a
              href="#custom-elements"
              className="block hover:text-gray-300 rounded-lg p-2 hover:bg-gray-700 cursor-pointer"
            >
              Custom Elements
            </a>
          </div>
          <div>
            <h3 className="text-gray-500 uppercase text-sm mb-2 font-semibold">Tools</h3>
            <a
              href="#text-to-image"
              className="block hover:text-gray-300 rounded-lg p-2 hover:bg-gray-700 cursor-pointer"
            >
              Text to Image
            </a>
            <a
              href="#generative-session"
              className="block hover:text-gray-300 rounded-lg p-2 hover:bg-gray-700 cursor-pointer"
            >
              Sketch to Images
            </a>
            <a
              href="#video-gen1"
              className="block hover:text-gray-300 rounded-lg p-2 hover:bg-gray-700 cursor-pointer"
            >
              Image to Video (Gen-1)
            </a>
            <a
              href="#generative-audio"
              className="block hover:text-gray-300 rounded-lg p-2 hover:bg-gray-700 cursor-pointer"
            >
              Video to Video (Gen-1)
            </a>
            
          </div>
        </nav>

        {/* Footer */}
        <footer className="mt-auto text-gray-500">
          <a href="#help-center" className="block text-sm hover:text-gray-300">
            Help Center
          </a>
          <a href="#terms" className="block text-sm hover:text-gray-300">
            Terms of Use and Privacy Policy
          </a>
        </footer>
      </aside>


{/* Main Content */}
      <main
        className="flex-1 relative p-5"
        style={{
          backdropFilter: "blur(10px)", // Apply transparency effect
          backgroundColor: "rgba(0, 0, 0, 0.8)", // Transparent black
        }}
      >
        {/* Black Header */}
        <div
          className="p-5 flex justify-between items-center sticky top-0 z-20"
          style={{
            backdropFilter: "blur(10px)", // Transparency for the header
            backgroundColor: "rgba(0, 0, 0, 0.8)", // Match main content transparency
          }}
        >
          <h1 className="text-3xl font-bold" style={{ marginLeft: "60px" }}>
            Welcome to the A.I Architecture World!
          </h1>
          <input
            type="text"
            placeholder="Search for tools, assets, and projects"
            className="p-2 rounded-lg w-1/3 bg-gray-700 text-gray-300 placeholder-gray-500"
            style={{ marginRight: "70px" }}
          />
        </div>



  {/* Conditional Rendering for Main Content */}
        {showWorkspaceSettings ? (
  <div className="p-16">
    {/* User Profile Section */}
    <div className="flex items-center space-x-4 mb-6">
      <img
        src={user?.photoURL || "https://via.placeholder.com/50"}
        alt="Profile"
        className="w-16 h-16 rounded-full border-2 border-gray-500"
      />
      <h2 className="text-lg font-semibold">{user?.displayName || "Guest"}</h2>

    </div>

    {/* Workspace Settings Tabs */}
    <div className="border-b border-gray-700 mb-6">
      <button
        className={`px-6 py-3 ${
          activeTab === "settings"
            ? "border-b-2 border-blue-500 text-white"
            : "text-gray-400"
        }`}
        onClick={() => setActiveTab("settings")}
      >
        Settings
      </button>
      <button
        className={`px-6 py-3 ${
          activeTab === "members"
            ? "border-b-2 border-blue-500 text-white"
            : "text-gray-400"
        }`}
        onClick={() => setActiveTab("members")}
      >
        Members
      </button>
      <button
        className={`px-6 py-3 ${
          activeTab === "plans"
            ? "border-b-2 border-blue-500 text-white"
            : "text-gray-400"
        }`}
        onClick={() => setActiveTab("plans")}
      >
        Plans & Billing
      </button>
    </div>
    {renderTabContent()}
  </div>
  ) : (

    
          <div className="p-16 overflow-y-auto h-[calc(100vh-64px)] bg-transparent">
            {/* Introducing Act-One Section */}
            <section
              className="mb-8 flex items-center justify-between p-6 rounded-lg shadow-lg"
              style={{
                backgroundColor: "rgba(32, 32, 32, 0.9)", // Slight transparency for content
              }}
            >
              <div className="w-2/5 space-y-4">
                <h2 className="text-4xl font-bold text-white">Introducing Act-One</h2>
                <p className="text-gray-300">
                  Generate expressive character performances inside Gen-3 Alpha and Gen-3 Alpha Turbo.
                </p>
                <div className="mt-4 flex space-x-4">
                  <button className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600">
                    Try it now
                  </button>
                  <button className="px-6 py-3 border border-gray-400 text-gray-300 rounded-lg font-semibold hover:bg-gray-700">
                    More details
                  </button>
                </div>
              </div>
              <a
                href="https://example.com/video"
                className="w-3/5 flex items-center justify-center bg-gray-700 rounded-lg shadow-lg text-center"
                style={{ aspectRatio: "16/9" }}
              >
                <span className="text-red-500 text-2xl font-bold">href video 16:9</span>
              </a>
            </section>

           
            
{/* Start a Generative Session Section */}
  <section className="p-2">
  <h2 className="text-3xl font-bold mb-6 text-white">
    Start a Generative Session
  </h2>
  <div
    className="grid grid-cols-5 gap-6"
    style={{
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: "calc(100%)", // Aligns left and right with "Introducing Act-One" box
    }}
  >
    <a
      href="#introducing-sessions"
      className="rounded-lg shadow-lg p-6 flex flex-col items-center justify-center"
      style={{
        backgroundColor: "rgba(32, 32, 32, 0.9)", // Transparent black background
      }}
    >
      <img
        src="https://via.placeholder.com/150"
        alt="Introducing Sessions"
        className="mb-4 rounded-lg"
      />
      <h3 className="text-lg font-semibold text-white">Introducing Sessions</h3>
      <p className="text-gray-400 text-center">
        Create, save, and organize your video generations.
      </p>
    </a>
    <a
      href="#start-new-session"
      className="rounded-lg shadow-lg p-6 flex flex-col items-center justify-center"
      style={{
        backgroundColor: "rgba(32, 32, 32, 0.9)", // Transparent black background
      }}
    >
      <div className="w-full h-24 bg-gray-700 rounded-md mb-4 flex items-center justify-center">
        <span className="text-gray-400 text-2xl font-bold">+</span>
      </div>
      <h3 className="text-lg font-semibold text-white">Start a new session</h3>
    </a>
    {[...Array(3)].map((_, index) => (
      <a
        key={index}
        href="#"
        className="rounded-lg shadow-lg p-6 flex flex-col items-center justify-center"
        style={{
          backgroundColor: "rgba(32, 32, 32, 0.9)", // Transparent black background
        }}
      >
        <div className="w-full h-24 bg-gray-700 rounded-md mb-4"></div>
        <h3 className="text-lg font-semibold text-white">Card {index + 3}</h3>
        <p className="text-gray-400 text-center">Description for card {index + 3}.</p>
      </a>
    ))}
  </div>
</section>


{/* Tools Section */}
<section className="p-2 mt-8">
  <h2 className="text-3xl font-bold mb-4 text-white">a2viz's AI Tools</h2>
  <p className="text-gray-400 mb-6">
    Create and explore image, video, and audio AI-powered tools.
  </p>
  <div
    className="grid grid-cols-4 gap-6"
    style={{
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: "calc(100%)", // Aligns left and right with other sections
    }}
  >
    {[...Array(4)].map((_, index) => (
      <a
        key={index}
        href="#"
        className="rounded-lg shadow-lg flex flex-col items-center justify-center"
        style={{
          backgroundColor: "rgba(32, 32, 32, 0.9)", // Transparent black background
        }}
      >
        <div className="h-40 w-full bg-gray-700 rounded-md"></div>
        <h3 className="text-xl font-semibold text-white mt-4">
          Tool {index + 1}
        </h3>
        <p className="text-gray-400 text-center">
          Description for Tool {index + 1}.
        </p>
      </a>
    ))}
  </div>
</section>


          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;