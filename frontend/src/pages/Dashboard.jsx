import { useEffect, useState } from "react";
import { fetchRFPs, fetchVendors, fetchProposals } from "../api";

import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [rfps, setRFPs] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setRFPs(await fetchRFPs());
    setVendors(await fetchVendors());
    setProposals(await fetchProposals());
  }

  const proposalsBar = {
    labels: vendors.map((v) => v.name),
    datasets: [
      {
        label: "Proposals Received",
        data: vendors.map(
          (v) => proposals.filter((p) => p.vendorId === v.id).length
        ),
        backgroundColor: "#162d58ff",
      },
    ],
  };

  const rfpLine = {
    labels: rfps.map((r) => r.createdAt?.split("T")[0]),
    datasets: [
      {
        label: "RFPs Created",
        data: rfps.map(() => 1),
        borderColor: "#00c6b3",
        tension: 0.3,
      },
    ],
  };

  return (
    <div style={{ padding: "30px", color: "white" }}>
      <h1>Dashboard Overview</h1>

      <div className="stats" style={{ display: "flex", gap: "20px" }}>
        <div className="stat-card">RFPs: {rfps.length}</div>
        <div className="stat-card">Vendors: {vendors.length}</div>
        <div className="stat-card">Proposals: {proposals.length}</div>
      </div>

      <h2 style={{ marginTop: "40px" }}>Proposals per Vendor</h2>
      <Bar data={proposalsBar} />

      <h2 style={{ marginTop: "40px" }}>RFPs Created Over Time</h2>
      <Line data={rfpLine} />
    </div>
  );
}
