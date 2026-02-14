import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart, LogIn, LogOut, Plus, Trash2, Edit3, Save, X,
  Clock, BookOpen, MessageCircleHeart, Image as ImageIcon
} from 'lucide-react';
import PageTransition from '../components/PageTransition';
import {
  adminLogin,
  getTimeline, createTimelineEvent, deleteTimelineEvent,
  getReasons, createReason, deleteReason,
  getGallery, addGalleryImage, deleteGalleryImage,
  updateLetter, getLetterInfo
} from '../services/endpoints';

/* ═══════════════════════════ AUTH ═══════════════════════════ */
function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await adminLogin({ username, password });
      localStorage.setItem('adminToken', res.data.token);
      onLogin();
    } catch {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dreamy px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-3xl p-8 sm:p-12 shadow-dreamy w-full max-w-sm"
      >
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blush to-lavender flex items-center justify-center">
            <LogIn className="w-6 h-6 text-mauve" />
          </div>
        </div>
        <h2 className="font-serif text-2xl text-center text-[#3d2b1f] mb-6">Admin Portal</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text" value={username} onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full px-4 py-3 rounded-xl glass text-sm text-[#3d2b1f] placeholder-mauve/30 focus:outline-none focus:ring-2 focus:ring-rose/30 border-none"
          />
          <input
            type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl glass text-sm text-[#3d2b1f] placeholder-mauve/30 focus:outline-none focus:ring-2 focus:ring-rose/30 border-none"
          />
          {error && <p className="text-rose text-xs text-center">{error}</p>}
          <button
            type="submit" disabled={loading}
            className="w-full py-3 rounded-xl text-white font-light text-sm cursor-pointer border-none disabled:opacity-50"
            style={{ background: 'linear-gradient(135deg, #f4a6b5, #c38eb4)' }}
          >
            {loading ? 'Logging in…' : 'Login'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════ SECTION WRAPPER ═══════════════════════════ */
function Section({ title, icon: Icon, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass rounded-2xl shadow-dreamy overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 cursor-pointer border-none bg-transparent text-left"
      >
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5 text-mauve" />
          <span className="font-serif text-lg text-[#3d2b1f]">{title}</span>
        </div>
        <motion.span animate={{ rotate: open ? 45 : 0 }} className="text-mauve/50 text-xl">+</motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════ TIMELINE MANAGER ═══════════════════════════ */
function TimelineManager() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', date: '', image: '' });
  const [loading, setLoading] = useState(false);

  const load = () => getTimeline().then(r => setEvents(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.date) return;
    setLoading(true);
    try {
      await createTimelineEvent(form);
      setForm({ title: '', description: '', date: '', image: '' });
      load();
    } catch {} finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    try { await deleteTimelineEvent(id); load(); } catch {}
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleAdd} className="space-y-3">
        <input value={form.title} onChange={e => setForm({...form, title: e.target.value})}
          placeholder="Title" className="w-full px-3 py-2 rounded-lg text-sm glass border-none focus:outline-none focus:ring-2 focus:ring-rose/30" />
        <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})}
          placeholder="Description" rows={3} className="w-full px-3 py-2 rounded-lg text-sm glass border-none focus:outline-none focus:ring-2 focus:ring-rose/30 resize-none" />
        <div className="flex gap-3">
          <input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})}
            className="flex-1 px-3 py-2 rounded-lg text-sm glass border-none focus:outline-none focus:ring-2 focus:ring-rose/30" />
          <input value={form.image} onChange={e => setForm({...form, image: e.target.value})}
            placeholder="Image URL (optional)" className="flex-1 px-3 py-2 rounded-lg text-sm glass border-none focus:outline-none focus:ring-2 focus:ring-rose/30" />
        </div>
        <button type="submit" disabled={loading}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm cursor-pointer border-none disabled:opacity-50"
          style={{ background: 'linear-gradient(135deg, #f4a6b5, #c38eb4)' }}>
          <Plus className="w-4 h-4" /> Add Event
        </button>
      </form>

      <div className="space-y-2 mt-4">
        {events.map(ev => (
          <div key={ev._id} className="flex items-center justify-between bg-blush/20 rounded-lg px-4 py-3">
            <div>
              <p className="text-sm font-medium text-[#3d2b1f]">{ev.title}</p>
              <p className="text-xs text-mauve/40">{new Date(ev.date).toLocaleDateString()}</p>
            </div>
            <button onClick={() => handleDelete(ev._id)}
              className="p-2 rounded-lg hover:bg-rose/10 cursor-pointer border-none bg-transparent transition-colors">
              <Trash2 className="w-4 h-4 text-rose" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════ REASONS MANAGER ═══════════════════════════ */
function ReasonsManager() {
  const [reasons, setReasons] = useState([]);
  const [form, setForm] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(false);

  const load = () => getReasons().then(r => setReasons(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description) return;
    setLoading(true);
    try {
      await createReason(form);
      setForm({ title: '', description: '' });
      load();
    } catch {} finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    try { await deleteReason(id); load(); } catch {}
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleAdd} className="space-y-3">
        <input value={form.title} onChange={e => setForm({...form, title: e.target.value})}
          placeholder="Reason title" className="w-full px-3 py-2 rounded-lg text-sm glass border-none focus:outline-none focus:ring-2 focus:ring-rose/30" />
        <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})}
          placeholder="Description" rows={2} className="w-full px-3 py-2 rounded-lg text-sm glass border-none focus:outline-none focus:ring-2 focus:ring-rose/30 resize-none" />
        <button type="submit" disabled={loading}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm cursor-pointer border-none disabled:opacity-50"
          style={{ background: 'linear-gradient(135deg, #f4a6b5, #c38eb4)' }}>
          <Plus className="w-4 h-4" /> Add Reason
        </button>
      </form>

      <div className="space-y-2 mt-4">
        {reasons.map(r => (
          <div key={r._id} className="flex items-center justify-between bg-blush/20 rounded-lg px-4 py-3">
            <p className="text-sm text-[#3d2b1f]">{r.title}</p>
            <button onClick={() => handleDelete(r._id)}
              className="p-2 rounded-lg hover:bg-rose/10 cursor-pointer border-none bg-transparent transition-colors">
              <Trash2 className="w-4 h-4 text-rose" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════ LETTER MANAGER ═══════════════════════════ */
function LetterManager() {
  const [form, setForm] = useState({ title: '', content: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSaved(false);
    try {
      const data = {};
      if (form.title) data.title = form.title;
      if (form.content) data.content = form.content;
      if (form.password) data.password = form.password;
      await updateLetter(data);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {} finally { setLoading(false); }
  };

  return (
    <form onSubmit={handleSave} className="space-y-3">
      <input value={form.title} onChange={e => setForm({...form, title: e.target.value})}
        placeholder="Letter title" className="w-full px-3 py-2 rounded-lg text-sm glass border-none focus:outline-none focus:ring-2 focus:ring-rose/30" />
      <textarea value={form.content} onChange={e => setForm({...form, content: e.target.value})}
        placeholder="Letter content…" rows={8} className="w-full px-3 py-2 rounded-lg text-sm glass border-none focus:outline-none focus:ring-2 focus:ring-rose/30 resize-none" />
      <input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})}
        placeholder="New password (leave blank to keep current)" className="w-full px-3 py-2 rounded-lg text-sm glass border-none focus:outline-none focus:ring-2 focus:ring-rose/30" />
      <div className="flex items-center gap-3">
        <button type="submit" disabled={loading}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm cursor-pointer border-none disabled:opacity-50"
          style={{ background: 'linear-gradient(135deg, #f4a6b5, #c38eb4)' }}>
          <Save className="w-4 h-4" /> Save Letter
        </button>
        {saved && <span className="text-xs text-emerald-500">Saved!</span>}
      </div>
    </form>
  );
}

/* ═══════════════════════════ GALLERY MANAGER ═══════════════════════════ */
function GalleryManager() {
  const [images, setImages] = useState([]);
  const [form, setForm] = useState({ imageUrl: '', title: '', description: '' });
  const [loading, setLoading] = useState(false);

  const load = () => getGallery().then(r => setImages(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.imageUrl) return;
    setLoading(true);
    try {
      await addGalleryImage(form);
      setForm({ imageUrl: '', title: '', description: '' });
      load();
    } catch {} finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    try { await deleteGalleryImage(id); load(); } catch {}
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleAdd} className="space-y-3">
        <input value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})}
          placeholder="Image URL" className="w-full px-3 py-2 rounded-lg text-sm glass border-none focus:outline-none focus:ring-2 focus:ring-rose/30" />
        <div className="flex gap-3">
          <input value={form.title} onChange={e => setForm({...form, title: e.target.value})}
            placeholder="Title (optional)" className="flex-1 px-3 py-2 rounded-lg text-sm glass border-none focus:outline-none focus:ring-2 focus:ring-rose/30" />
          <input value={form.description} onChange={e => setForm({...form, description: e.target.value})}
            placeholder="Description (optional)" className="flex-1 px-3 py-2 rounded-lg text-sm glass border-none focus:outline-none focus:ring-2 focus:ring-rose/30" />
        </div>
        <button type="submit" disabled={loading}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm cursor-pointer border-none disabled:opacity-50"
          style={{ background: 'linear-gradient(135deg, #f4a6b5, #c38eb4)' }}>
          <Plus className="w-4 h-4" /> Add Image
        </button>
      </form>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-4">
        {images.map(img => (
          <div key={img._id} className="relative group rounded-lg overflow-hidden">
            <img src={img.imageUrl} alt={img.title || ''} className="w-full h-20 object-cover" />
            <button onClick={() => handleDelete(img._id)}
              className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer border-none">
              <Trash2 className="w-4 h-4 text-white" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════ MAIN ADMIN PAGE ═══════════════════════════ */
export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('adminToken'));

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <LoginForm onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-cream pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="font-serif text-3xl text-[#3d2b1f]">Admin Dashboard</h1>
              <p className="text-sm text-mauve/40 mt-1">Manage your love story</p>
            </div>
            <button onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-mauve/60 text-sm hover:bg-blush/30 cursor-pointer border-none bg-transparent transition-colors">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>

          <div className="space-y-4">
            <Section title="Timeline Events" icon={Clock}>
              <TimelineManager />
            </Section>

            <Section title="Love Reasons" icon={Heart}>
              <ReasonsManager />
            </Section>

            <Section title="Secret Letter" icon={MessageCircleHeart}>
              <LetterManager />
            </Section>

            <Section title="Gallery Images" icon={ImageIcon}>
              <GalleryManager />
            </Section>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
