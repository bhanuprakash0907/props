import { useState } from 'react';
import { ArrowDown, ArrowUp, Check, CheckCircle2, Code2, Minus, Plus, RotateCcw, Sparkles, Trash2 } from 'lucide-react';

const starterTasks = [
  { id: 1, text: 'Understand component props', done: true },
  { id: 2, text: 'Practice the useState hook', done: false },
  { id: 3, text: 'Handle a button click event', done: false },
];

function SectionTitle({ number, title, caption }) {
  return <div className="section-heading"><span className="section-number">{number}</span><div><h2>{title}</h2><p>{caption}</p></div></div>;
}

function TaskItem({ task, onToggle, onRemove }) {
  return <li className={`task-row ${task.done ? 'is-done' : ''}`}>
    <button className="check-button" onClick={() => onToggle(task.id)} aria-label={task.done ? 'Mark incomplete' : 'Mark complete'}>{task.done && <Check size={15} />}</button>
    <span className="task-text">{task.text}</span>
    <button className="icon-button remove-button" onClick={() => onRemove(task.id)} aria-label={`Delete ${task.text}`}><Trash2 size={16} /></button>
  </li>;
}

function App() {
  const [count, setCount] = useState(0);
  const [tasks, setTasks] = useState(starterTasks);
  const [input, setInput] = useState('');
  const [accent, setAccent] = useState('violet');
  const completed = tasks.filter(task => task.done).length;

  function addTask(event) {
    event.preventDefault();
    const text = input.trim();
    if (!text) return;
    setTasks(current => [...current, { id: Date.now(), text, done: false }]);
    setInput('');
  }
  function toggleTask(id) { setTasks(current => current.map(task => task.id === id ? { ...task, done: !task.done } : task)); }
  function removeTask(id) { setTasks(current => current.filter(task => task.id !== id)); }

  return <main className={`app-shell accent-${accent}`}>
    <header className="topbar"><a className="brand" href="#top"><span className="brand-mark"><Code2 size={19} /></span><span>react<span className="brand-light">lab</span></span></a><div className="topbar-right"><span className="live-dot" /> INTERACTIVE PLAYGROUND <span className="version">01</span></div></header>
    <div className="content" id="top">
      <section className="hero"><div className="eyebrow"><Sparkles size={14} /> FRONTEND DEVELOPMENT LAB</div><h1>Learn React by<br /><span>doing.</span></h1><p className="hero-copy">A tiny playground for the building blocks of React. Change something and see what happens.</p><div className="topic-chips"><span>01&nbsp; Props</span><span>02&nbsp; State</span><span>03&nbsp; Events</span><span>04&nbsp; Styling</span></div></section>
      <div className="lesson-grid">
        <section className="card counter-card"><SectionTitle number="01" title="State & events" caption="Click a button. State updates, UI follows." /><div className="counter-display"><span className="counter-label">CURRENT COUNT</span><div className="counter-number" aria-live="polite">{count}</div><span className="counter-note">{count === 0 ? 'Ready when you are' : count > 0 ? `${count} ${count === 1 ? 'step' : 'steps'} forward` : `${Math.abs(count)} ${Math.abs(count) === 1 ? 'step' : 'steps'} back`}</span></div><div className="counter-actions"><button className="button secondary" onClick={() => setCount(value => value - 1)}><Minus size={16} /> Decrease</button><button className="button primary" onClick={() => setCount(value => value + 1)}><Plus size={17} /> Increase</button></div><button className="reset-button" onClick={() => setCount(0)}><RotateCcw size={13} /> Reset count</button></section>
        <section className="card tasks-card"><SectionTitle number="02" title="Task list" caption="Props pass each task and its actions to a child." /><div className="task-progress"><div><span>YOUR PROGRESS</span><strong>{completed}<span> / {tasks.length} done</span></strong></div><div className="progress-track"><div className="progress-fill" style={{ width: `${tasks.length ? completed / tasks.length * 100 : 0}%` }} /></div></div><ul className="task-list">{tasks.map(task => <TaskItem key={task.id} task={task} onToggle={toggleTask} onRemove={removeTask} />)}</ul><form className="add-form" onSubmit={addTask}><input value={input} onChange={event => setInput(event.target.value)} placeholder="Add a learning goal..." aria-label="New task" /><button type="submit" aria-label="Add task"><Plus size={19} /></button></form><p className="props-note"><span className="props-pill">PROPS</span> Each row receives <code>task</code>, <code>onToggle</code> &amp; <code>onRemove</code>.</p></section>
        <section className="card styling-card"><SectionTitle number="03" title="Make it yours" caption="Styling can respond to application state, too." /><div className="theme-row"><div><strong>Accent color</strong><span>Pick a highlight color</span></div><div className="swatches" role="group" aria-label="Choose accent color">{['violet','blue','coral','green'].map(color => <button key={color} aria-label={`${color} accent`} aria-pressed={accent === color} onClick={() => setAccent(color)} className={`swatch ${color}`} />)}</div></div><div className="style-preview"><span className="preview-icon"><CheckCircle2 size={17} /></span><div><strong>Styled with CSS</strong><span>Accent updates from React state</span></div><span className="preview-arrow"><ArrowUp size={14} /><ArrowDown size={14} /></span></div><div className="code-hint"><span className="code-dot" /> CSS classes <code>.accent-{accent}</code> <span className="code-separator">·</span> selected: <strong>{accent}</strong></div></section>
      </div>
      <footer><span>Made for learning, one click at a time.</span><span><span className="footer-heart">✳</span> REACT FUNDAMENTALS</span></footer>
    </div>
  </main>;
}

export default App;
