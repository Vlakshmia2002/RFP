
// import React, { useEffect, useState } from "react";
// import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

// import CreateRFP from "./pages/CreateRFP";
// import Vendors from "./pages/Vendors";
// import Proposals from "./pages/Proposals";

// export default function App() {
//   const [dark, setDark] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);

//   useEffect(() => {
//     // load preference
//     const pref = localStorage.getItem("rfp_dark_mode");
//     if (pref === "1") setDark(true);
//     document.documentElement.classList.toggle("dark", pref === "1");
//   }, []);

//   function toggleDark() {
//     setDark((d) => {
//       const next = !d;
//       localStorage.setItem("rfp_dark_mode", next ? "1" : "0");
//       document.documentElement.classList.toggle("dark", next);
//       return next;
//     });
//   }

//   function toggleMobile() {
//     setMobileOpen((s) => !s);
//   }

//   return (
//     <BrowserRouter>
//       <div className="layout">
//         {/* Sidebar */}
//         <aside className={`sidebar ${mobileOpen ? "open" : ""}`}>
//           <div className="sidebar-head">
//             <h2 className="sidebar-title">RFP Manager</h2>
//             <div className="sidebar-controls">
//               <button className="icon-btn" onClick={toggleDark} aria-label="Toggle dark">
//                 {dark ? "🌙" : "☀️"}
//               </button>

//               <button className="mobile-close" onClick={toggleMobile} aria-label="Close menu">
//                 ✕
//               </button>
//             </div>
//           </div>

//           <nav className="sidebar-nav">
//             <NavLink to="/" className={({isActive}) => isActive ? "nav-item active" : "nav-item"} onClick={() => setMobileOpen(false)}>Create RFP</NavLink>
//             <NavLink to="/vendors" className={({isActive}) => isActive ? "nav-item active" : "nav-item"} onClick={() => setMobileOpen(false)}>Vendors</NavLink>
//             <NavLink to="/proposals" className={({isActive}) => isActive ? "nav-item active" : "nav-item"} onClick={() => setMobileOpen(false)}>Proposals</NavLink>
//           </nav>
//         </aside>

//         {/* Mobile topbar */}
//         <header className="topbar">
//           <button className="hamburger" onClick={toggleMobile} aria-label="Open menu">☰</button>
//           <div className="topbar-title">AI-powered RFP Manager</div>
//           <div className="topbar-actions">
//             <button className="icon-btn" onClick={toggleDark} aria-label="Toggle dark">
//               {dark ? "🌙" : "☀️"}
//             </button>
//           </div>
//         </header>

//         {/* Main Content */}
//         <main className="content">
//           <Routes>
//             <Route path="/" element={<CreateRFP />} />
//             <Route path="/vendors" element={<Vendors />} />
//             <Route path="/proposals" element={<Proposals />} />
//           </Routes>
//         </main>
//       </div>
//     </BrowserRouter>
//   );
// }




import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import CreateRFP from "./pages/CreateRFP";
import Vendors from "./pages/Vendors";
import Proposals from "./pages/Proposals";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <div className="app">
        <Sidebar theme={theme} setTheme={setTheme} />
        <main className="main">
          <Routes>
            <Route path="/create" element={<CreateRFP />} />
            <Route path="/vendors" element={<Vendors />} />
            <Route path="/proposals" element={<Proposals />} />
            <Route path="/" element={<Navigate to="/create" replace />} />
             <Route path="/dashboard" element={<Dashboard />} />

          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
