// frontend/src/pages/Proposals.jsx
import { useEffect, useState } from "react";
import { fetchProposals, fetchRFPs } from "../api";

export default function Proposals() {
  const [proposals, setProposals] = useState([]);
  const [rfps, setRFPs] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setProposals(await fetchProposals());
    setRFPs(await fetchRFPs());
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>Proposals</h2>

      {proposals.length === 0 ? (
        <p>No proposals yet.</p>
      ) : (
        proposals.map((p) => (
          <div key={p.id} style={{ border: "1px solid #ddd", padding: 12, marginBottom: 8 }}>
            <strong>{p.vendorName || "Vendor"}</strong>
            <div>Score: {p.score ?? "N/A"}</div>
            <div>Notes: {p.notes || "—"}</div>
            <div>RFP ID: {p.rfpId}</div>
          </div>
        ))
      )}

      <h3 style={{ marginTop: 20 }}>RFPs (for reference)</h3>
      {rfps.map((r) => (
        <div key={r.id} style={{ padding: 8 }}>{r.title}</div>
      ))}
    </div>
  );
}
