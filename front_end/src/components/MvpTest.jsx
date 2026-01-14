import React, { useState } from 'react';

/**
 * GLPT ALL-IN-ONE MVP
 * Contains: 
 * 1. Yearly Contribution Calendar
 * 2. Rank & XP Progress System
 * 3. Goal Entry System
 * 4. Admin vs User View Toggle
 */

export default function App() {
  // --- STATE MANAGEMENT ---
  const [isAdmin, setIsAdmin] = useState(false);
  const [xp, setXp] = useState(1250);
  const [goals, setGoals] = useState([
    { id: 1, title: "Finish Spring Boot Migration", difficulty: 3 },
    { id: 2, title: "Daily Exercise", difficulty: 1 }
  ]);
  const [contributions, setContributions] = useState([
    { date: new Date().toISOString().split('T')[0], count: 1 }
  ]);

  // --- LOGIC: XP & CALENDAR UPDATES ---
  const handleGoalCompletion = (difficulty) => {
    const today = new Date().toISOString().split('T')[0];
    
    // Update XP (3 levels of difficulty = more XP)
    setXp(prev => prev + (difficulty * 25));

    // Update Calendar Color (Increments count for today)
    setContributions(prev => {
      const exists = prev.find(c => c.date === today);
      if (exists) {
        return prev.map(c => c.date === today ? { ...c, count: c.count + 1 } : c);
      }
      return [...prev, { date: today, count: 1 }];
    });
  };

  // --- COMPONENT: YEARLY CALENDAR (Built-in) ---
  const renderCalendar = () => {
    const countByDate = {};
    contributions.forEach(c => countByDate[c.date] = c.count);

    const today = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 364);
    while (start.getDay() !== 0) start.setDate(start.getDate() - 1);

    const weeks = [];
    let current = new Date(start);

    while (current <= today) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        const dStr = new Date(current).toISOString().split('T')[0];
        const count = countByDate[dStr] || 0;
        const color = count === 0 ? '#ebedf0' : count === 1 ? '#9be9a8' : count === 2 ? '#40c463' : '#216e39';
        week.push(<div key={dStr} title={`${dStr}: ${count} entries`} style={{ width: '10px', height: '10px', backgroundColor: color, margin: '2px', borderRadius: '2px' }} />);
        current.setDate(current.getDate() + 1);
      }
      weeks.push(<div key={current.getTime()} style={{ display: 'flex', flexDirection: 'column' }}>{week}</div>);
    }
    return <div style={{ display: 'flex', overflowX: 'auto', padding: '10px', background: 'white', borderRadius: '8px' }}>{weeks}</div>;
  };

  return (
    <div style={styles.container}>
      {/* HEADER & ROLE TOGGLE */}
      <div style={styles.header}>
        <h1 style={{ margin: 0 }}>GLPT Dashboard</h1>
        <button onClick={() => setIsAdmin(!isAdmin)} style={styles.adminToggle}>
          {isAdmin ? "Viewing as ADMIN" : "Viewing as USER"}
        </button>
      </div>

      {/* RANK PANEL */}
      <div style={styles.card}>
        <h3 style={{ margin: '0 0 10px 0' }}>Rank: Gold {Math.floor(xp / 1000)}</h3>
        <div style={styles.xpTrack}>
          <div style={{ ...styles.xpBar, width: `${(xp % 1000) / 10}%` }} />
        </div>
        <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>Total XP: {xp}</div>
      </div>

      {/* CALENDAR */}
      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ margin: '0 0 10px 0' }}>Activity Heatmap</h4>
        {renderCalendar()}
      </div>

      {/* GOALS LIST */}
      <div style={styles.section}>
        <h3>Current Goals</h3>
        {goals.map(goal => (
          <div key={goal.id} style={styles.goalRow}>
            <span>{goal.title} <small style={{ color: '#888' }}>(Diff: {goal.difficulty})</small></span>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => handleGoalCompletion(goal.difficulty)} style={styles.doneBtn}>Mark Done</button>
              {isAdmin && <button style={styles.delBtn} onClick={() => setGoals(goals.filter(g => g.id !== goal.id))}>Delete</button>}
            </div>
          </div>
        ))}
      </div>

      {/* ADMIN-ONLY SECTION */}
      {isAdmin && (
        <div style={styles.adminPanel}>
          <h4>Admin Database Preview</h4>
          <p>Total Registered Users: 12</p>
          <p>System Uptime: 99.9%</p>
          <button style={styles.adminAction}>Flush Cache (Fake)</button>
        </div>
      )}
    </div>
  );
}

// --- CSS-IN-JS STYLES ---
const styles = {
  container: { maxWidth: '600px', margin: '40px auto', fontFamily: 'system-ui, sans-serif', padding: '20px', backgroundColor: '#f6f8fa', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  adminToggle: { padding: '8px 12px', borderRadius: '20px', border: '1px solid #ccc', cursor: 'pointer', fontWeight: 'bold' },
  card: { background: 'white', padding: '20px', borderRadius: '12px', marginBottom: '20px' },
  xpTrack: { height: '12px', backgroundColor: '#e1e4e8', borderRadius: '6px', overflow: 'hidden' },
  xpBar: { height: '100%', backgroundColor: '#2da44e', transition: 'width 0.4s ease' },
  goalRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', padding: '12px', borderRadius: '8px', marginBottom: '8px', border: '1px solid #ddd' },
  doneBtn: { backgroundColor: '#2da44e', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' },
  delBtn: { backgroundColor: '#cf222e', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' },
  adminPanel: { marginTop: '30px', padding: '20px', background: '#fffbdd', border: '1px solid #d4a72c', borderRadius: '10px' },
  adminAction: { background: '#24292f', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' }
};