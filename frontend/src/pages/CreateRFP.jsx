// frontend/src/pages/CreateRFP.jsx
import { useEffect, useState } from "react";
import { createRFP, fetchRFPs } from "../api";

export default function CreateRFP() {
  const [text, setText] = useState("");
  const [rfps, setRFPs] = useState([]);
  const [loading, setLoading] = useState(false);

  async function load() {
    try {
      const list = await fetchRFPs();
      setRFPs(list);
    } catch (err) {
      console.error(err);
      setRFPs([]);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const handleGenerate = async () => {
    if (!text.trim()) return alert("Write something first");

    setLoading(true);

    try {
      const res = await createRFP(text);
      // backend returns { rfp }
      if (!res || !res.data || !res.data.rfp) {
        alert("Failed to generate RFP (no data returned).");
        setLoading(false);
        return;
      }
      const r = res.data.rfp;
      alert(
        "RFP Created:\n\n" +
          "Title: " + (r.title || "N/A") + "\n" +
          "Budget: " + (r.totalBudget || "N/A") + "\n" +
          "Delivery: " + (r.deliveryDays || "N/A") + " days\n" +
          "Terms: " + (r.terms || "N/A")
      );
      setText("");
      await load();
    } catch (err) {
      console.error("Create RFP error:", err);
      alert("Failed to generate RFP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Create RFP (Natural Language)</h2>
      <textarea
        placeholder="e.g., I need 20 laptops with 16GB RAM and 27-inch monitors..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: "100%", height: 140, padding: 8 }}
      />
      <div style={{ marginTop: 12 }}>
        <button onClick={handleGenerate} disabled={loading}>
          {loading ? "Generating..." : "Generate RFP (AI)"}
        </button>
      </div>

      <h3 style={{ marginTop: 24 }}>Existing RFPs</h3>
      {rfps.length === 0 ? (
        <p>No RFPs yet.</p>
      ) : (
        rfps.map((r) => (
          <div key={r.id} style={{ border: "1px solid #ddd", padding: 12, marginBottom: 8 }}>
            <strong>{r.title}</strong>
            <p style={{ margin: 0 }}>{r.description}</p>
            <small>Budget: {r.totalBudget || "N/A"} | Delivery: {r.deliveryDays || "N/A"} days</small>
          </div>
        ))
      )}
    </div>
  );
}
