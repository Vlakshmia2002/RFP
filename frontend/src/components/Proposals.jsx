import React, { useEffect, useState } from 'react';
import API from '../api';
import VendorList from '../components/VendorList';
import ProposalCard from '../components/ProposalCard';

export default function Proposals() {
  const [rfps, setRfps] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [selectedRfp, setSelectedRfp] = useState(null);
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [scores, setScores] = useState([]);

  useEffect(() => {
    API.get('/rfps').then(r=>setRfps(r.data));
    API.get('/vendors').then(r=>setVendors(r.data));
  }, []);

  const loadProposals = async (rfp) => {
    setSelectedRfp(rfp);
    const res = await API.get(`/proposals/rfp/${rfp.id}`);
    setProposals(res.data);
  };

  const sendRfp = async () => {
    if (!selectedRfp) return alert('Select an RFP');
    const res = await API.post('/proposals/send', { rfpId: selectedRfp.id, vendorIds: selectedVendors });
    alert('RFP sent to vendors');
    // optionally reload proposals after some time
  };

  const recommend = async () => {
    if (!selectedRfp) return alert('Select an RFP');
    const res = await API.get(`/proposals/rfp/${selectedRfp.id}/recommend`);
    setScores(res.data.scores || res.data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Proposals & Vendor Comparison</h2>

      <div style={{ display: 'flex', gap: 20 }}>
        <div style={{ flex: 1 }}>
          <h3>Select RFP</h3>
          {rfps.map(r => (
            <div key={r.id} className="rfp-card" style={{ cursor: 'pointer' }} onClick={() => loadProposals(r)}>
              <strong>{r.title}</strong>
              <div className="small-muted">{r.description}</div>
            </div>
          ))}
        </div>

        <div style={{ width: 320 }}>
          <h3>Vendors</h3>
          <VendorList vendors={vendors} selected={selectedVendors} onToggle={(id) => {
            setSelectedVendors(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev, id]);
          }} />
          <button onClick={sendRfp} style={{ marginTop: 10 }}>Send RFP</button>
          <hr />
          <h3>Proposals</h3>
          {proposals.map(p => <ProposalCard key={p.id} p={p} />)}
          <button onClick={recommend} style={{ marginTop: 10 }}>AI Recommendation</button>

          {scores && scores.length>0 && (
            <div style={{ marginTop: 12 }}>
              <h4>Scores</h4>
              {scores.map(s => (
                <div key={s.proposalId} style={{ padding: 8, border: '1px solid #eee', borderRadius: 6, marginBottom: 6 }}>
                  <div><strong>Proposal #{s.proposalId}</strong> — Score: {s.score}</div>
                  <div className="small-muted">{s.reason}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
