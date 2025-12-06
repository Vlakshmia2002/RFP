// import React from "react";
// import { NavLink } from "react-router-dom";

// export default function Sidebar({ theme, setTheme }) {
//   return (
//     <aside className="sidebar">
//       <div className="brand">
//         <div className="logo">RFP</div>
//         <div className="title">RFP Manager</div>
//       </div>

//       <nav className="nav">
//         <NavLink to="/create" className="nav-link">Create RFP</NavLink>
//         <NavLink to="/vendors" className="nav-link">Vendors</NavLink>
//         <NavLink to="/proposals" className="nav-link">Proposals</NavLink>
//       </nav>

//       <li>
//   <Link to="/dashboard">Dashboard</Link>
// </li>


//       <div className="sidebar-footer">
//         <div className="theme-toggle">
//           <label className="switch">
//             <input
//               type="checkbox"
//               onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
//               checked={theme === "dark"}
//             />
//             <span className="slider" />
//           </label>
//           <span className="small-muted">Dark Mode</span>
//         </div>
//         <small className="small-muted">Single-user application</small>
//       </div>
//     </aside>
//   );
// }



import { Link } from "react-router-dom";
import { useState } from "react";
import "./Sidebar.css";


export default function Sidebar() {
  const [dark, setDark] = useState(false);

  return (
    <div className="sidebar">
      <h2 className="logo">RFP Manager</h2>

      <nav>
        <Link to="/create" className="nav-item">Create RFP</Link>
        <Link to="/vendors" className="nav-item">Vendors</Link>
        <Link to="/proposals" className="nav-item">Proposals</Link>
        <Link to="/dashboard" className="nav-item">Dashboard</Link>
      </nav>

      <div className="theme-toggle">
        <label>
          <input
            type="checkbox"
            checked={dark}
            onChange={() => setDark(!dark)}
          />
          Dark Mode
        </label>
      </div>
    </div>
  );
}
