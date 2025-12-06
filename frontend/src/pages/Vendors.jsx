// frontend/src/pages/Vendors.jsx
import { useEffect, useState } from "react";
import { fetchVendors, createVendor, deleteVendor } from "../api";

export default function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", contact: "" });

  useEffect(() => {
    load();
  }, []);

  const load = async () => setVendors(await fetchVendors());

  const add = async () => {
    if (!form.name) return alert("Name required");
    try {
      const v = await createVendor(form);
      setVendors([v, ...vendors]);
      setForm({ name: "", email: "", contact: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to add vendor");
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete this vendor?")) return;
    await deleteVendor(id);
    setVendors(vendors.filter((x) => x.id !== id));
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Vendors</h2>

      <div style={{ marginBottom: 16 }}>
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input placeholder="Contact" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} />
        <button onClick={add}>Add Vendor</button>
      </div>

      <ul>
        {vendors.map((v) => (
          <li key={v.id}>
            <strong>{v.name}</strong> — {v.email || "no-email"}
            <button onClick={() => remove(v.id)} style={{ marginLeft: 8 }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
