import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, Calendar, MapPin, Tag, Clock, Moon, Sun, Ticket, 
  CheckCircle2, X, AlertCircle, ChevronRight, Filter, Users, 
  Sparkles, Award, ArrowRight, Trash2, ExternalLink, Share2, Phone, Mail, User
} from 'lucide-react';

// Sample Initial Event Data
const INITIAL_EVENTS = [
  {
    id: 'evt-1',
    title: 'Global Tech Innovators Summit 2026',
    category: 'Tech',
    date: '2026-11-20T09:00:00',
    venue: 'Silicon Convention Center, San Francisco, CA',
    shortDesc: 'Connect with world-class developers, AI pioneers, and tech visionary founders.',
    longDesc: 'Join thousands of developers, creators, and leaders at the biggest tech conference of the year. Featuring keynotes from industry legends, hands-on workshops on cutting-edge AI technologies, cloud architecture, and quantum computing breakthroughs.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    featured: true,
    price: 'Free',
    seatsLeft: 42
  },
  {
    id: 'evt-2',
    title: 'Neon Pulse EDM Festival',
    category: 'Music',
    date: '2026-11-25T18:00:00',
    venue: 'Sunset Amphitheater, Austin, TX',
    shortDesc: 'An unforgettable night featuring top international DJs and immersive laser visual shows.',
    longDesc: 'Experience dynamic multi-stage light and laser spectacles coupled with world-renowned electronic dance music artists. Food trucks, interactive art installations, and non-stop music until late night.',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
    featured: true,
    price: '$49',
    seatsLeft: 18
  },
  {
    id: 'evt-3',
    title: 'UX/UI & Design Systems Masterclass',
    category: 'Design',
    date: '2026-12-02T10:00:00',
    venue: 'Design Hub Live & Virtual Workshop',
    shortDesc: 'Master scalable component design systems, accessibility standards, and micro-interactions.',
    longDesc: 'A intensive deep-dive workshop tailored for product designers and frontend developers. Learn how to construct robust design tokens, component architecture, and fluid user experiences using modern design workflows.',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
    featured: false,
    price: '$25',
    seatsLeft: 12
  },
  {
    id: 'evt-4',
    title: 'Venture & Business Founders Conclave',
    category: 'Business',
    date: '2026-12-10T08:30:00',
    venue: 'Grand Plaza Ballroom, New York, NY',
    shortDesc: 'Pitch night, angel investor matchmaking, and high-impact scaling strategies.',
    longDesc: 'Bring your enterprise to the next stage. Connect with venture capitalists, learn proven fundraising strategies, and network with high-growth startup founders across fintech, SaaS, and healthtech domains.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    featured: true,
    price: 'Free',
    seatsLeft: 50
  },
  {
    id: 'evt-5',
    title: 'Full-Stack Web Dev Bootcamp Unleashed',
    category: 'Workshops',
    date: '2026-12-15T14:00:00',
    venue: 'Tech Campus & Online Streaming',
    shortDesc: 'Hands-on live coding with React, Node.js, and modern AI development toolchains.',
    longDesc: 'Build real-world full-stack web applications from scratch. Covers state management, API security, automated deployment pipelines, and integrating generative AI tools directly into production code.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    featured: false,
    price: 'Free',
    seatsLeft: 30
  },
  {
    id: 'evt-6',
    title: 'National eSports Championship Finals',
    category: 'Sports',
    date: '2026-12-28T12:00:00',
    venue: 'Cyber Arena Dome, Los Angeles, CA',
    shortDesc: 'Top pro teams compete live for the supreme championship title and cash prize pool.',
    longDesc: 'Witness electrifying eSports competition live at the arena. Featuring tactical shooters, battle royales, and fighting games with live shoutcasting, cosplay contests, and exclusive gaming gear giveaways.',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    featured: false,
    price: '$15',
    seatsLeft: 85
  }
];

const CATEGORIES = ['All', 'Tech', 'Music', 'Design', 'Business', 'Workshops', 'Sports'];

// Custom Hook for Live Countdown
function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetDate));

  function calculateTimeLeft(target) {
    const difference = +new Date(target) - +new Date();
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isPast: false
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}

// Countdown Component
const CountdownTimer = ({ targetDate, compact = false }) => {
  const { days, hours, minutes, seconds, isPast } = useCountdown(targetDate);

  if (isPast) {
    return <span className="text-xs font-semibold text-red-500 bg-red-100 dark:bg-red-950/40 px-2 py-1 rounded">Event Ended</span>;
  }

  if (compact) {
    return (
      <div className="flex items-center space-x-1 text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2.5 py-1 rounded-md border border-indigo-100 dark:border-indigo-900">
        <Clock className="w-3.5 h-3.5 mr-1 animate-pulse" />
        <span>{String(days).padStart(2, '0')}d : {String(hours).padStart(2, '0')}h : {String(minutes).padStart(2, '0')}m : {String(seconds).padStart(2, '0')}s</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-2 text-center my-4">
      {[
        { label: 'Days', val: days },
        { label: 'Hours', val: hours },
        { label: 'Mins', val: minutes },
        { label: 'Secs', val: seconds }
      ].map((item, idx) => (
        <div key={idx} className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg border border-slate-200 dark:border-slate-700">
          <div className="text-xl sm:text-2xl font-bold font-mono text-indigo-600 dark:text-indigo-400">
            {String(item.val).padStart(2, '0')}
          </div>
          <div className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default function App() {
  // Theme State
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  // Events & Filter States
  const [events] = useState(INITIAL_EVENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('all'); // 'all' or 'featured'

  // Modals and Drawers State
  const [selectedEvent, setSelectedEvent] = useState(null); // For detail view
  const [registerEvent, setRegisterEvent] = useState(null); // For register form
  const [showRegistrationsModal, setShowRegistrationsModal] = useState(false);

  // Registered Events Persistence
  const [myRegistrations, setMyRegistrations] = useState(() => {
    const saved = localStorage.getItem('my_event_registrations');
    return saved ? JSON.parse(saved) : [];
  });

  // Form Fields & Validation State
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [formErrors, setFormErrors] = useState({});
  const [toastMessage, setToastMessage] = useState(null);

  // Sync Dark Mode with DOM
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Sync Registrations with LocalStorage
  useEffect(() => {
    localStorage.setItem('my_event_registrations', JSON.stringify(myRegistrations));
  }, [myRegistrations]);

  // Trigger Toast Notification
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Filtered Events logic
  const filteredEvents = useMemo(() => {
    return events.filter(evt => {
      const matchesSearch = evt.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            evt.shortDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            evt.venue.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || evt.category === selectedCategory;
      const matchesTab = activeTab === 'all' || (activeTab === 'featured' && evt.featured);
      return matchesSearch && matchesCategory && matchesTab;
    });
  }, [events, searchTerm, selectedCategory, activeTab]);

  // Form Validation Handler
  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

    if (!formData.name.trim()) {
      errors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone.replace(/\s+/g, ''))) {
      errors.phone = 'Please enter a valid phone number (min 10 digits)';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle Registration Submit
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Check duplicate registration
    const isAlreadyRegistered = myRegistrations.some(
      reg => reg.eventId === registerEvent.id && reg.email.toLowerCase() === formData.email.toLowerCase()
    );

    if (isAlreadyRegistered) {
      setFormErrors({ email: 'You are already registered for this event with this email!' });
      return;
    }

    const newRegistration = {
      id: 'reg-' + Date.now(),
      eventId: registerEvent.id,
      eventTitle: registerEvent.title,
      eventDate: registerEvent.date,
      eventVenue: registerEvent.venue,
      userName: formData.name,
      email: formData.email,
      phone: formData.phone,
      registeredAt: new Date().toISOString()
    };

    setMyRegistrations(prev => [newRegistration, ...prev]);
    showToast(`Successfully registered for ${registerEvent.title}!`);
    setRegisterEvent(null);
    setFormData({ name: '', email: '', phone: '' });
    setFormErrors({});
  };

  // Cancel Registration
  const cancelRegistration = (id) => {
    setMyRegistrations(prev => prev.filter(item => item.id !== id));
    showToast('Registration cancelled successfully.');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-200 font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-4 py-3 rounded-xl shadow-2xl space-x-3 transition-all transform animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 dark:text-emerald-600 flex-shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header / Navbar */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => { setActiveTab('all'); setSelectedCategory('All'); setSearchTerm(''); }}>
            <div className="bg-gradient-to-tr from-indigo-600 to-violet-500 p-2 rounded-xl text-white shadow-lg shadow-indigo-500/30">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              EventPulse
            </span>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-3">
            {/* My Registrations Button */}
            <button
              onClick={() => setShowRegistrationsModal(true)}
              className="relative inline-flex items-center space-x-2 px-3.5 py-2 text-sm font-semibold rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/80 transition-colors"
            >
              <Ticket className="w-4 h-4" />
              <span className="hidden sm:inline">My Tickets</span>
              {myRegistrations.length > 0 && (
                <span className="ml-1 px-2 py-0.5 text-xs bg-indigo-600 text-white rounded-full font-bold">
                  {myRegistrations.length}
                </span>
              )}
            </button>

            {/* Dark/Light Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">

        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-950 text-white p-8 sm:p-12 lg:p-16 shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(99,102,241,0.15),transparent)] pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-6">
            <span className="inline-flex items-center space-x-2 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Discover & Experience Great Events</span>
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Unlock Extraordinary <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
                Live Experiences
              </span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              Explore premier tech conferences, dynamic music festivals, interactive design workshops, and business conclaves around you. Register instantly with zero hassle.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#events-grid"
                className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3.5 rounded-xl font-semibold shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02]"
              >
                <span>Browse All Events</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <button
                onClick={() => { setActiveTab('featured'); setSelectedCategory('All'); }}
                className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3.5 rounded-xl font-semibold transition-all"
              >
                <Award className="w-4 h-4 text-amber-400" />
                <span>Featured Events</span>
              </button>
            </div>
          </div>
        </section>

        {/* Filter and Search Bar Section */}
        <section id="events-grid" className="space-y-6 scroll-mt-20">
          
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-800/90 p-4 rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-700">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search events by title, description or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')} 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Tab Switcher */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-900 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                  activeTab === 'all' 
                    ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                All Events
              </button>
              <button
                onClick={() => setActiveTab('featured')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center space-x-1 ${
                  activeTab === 'featured' 
                    ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <Award className="w-3.5 h-3.5 text-amber-500" />
                <span>Featured</span>
              </button>
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center mr-1">
              <Filter className="w-3.5 h-3.5 mr-1" /> Category:
            </span>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-semibold rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Events Grid */}
          {filteredEvents.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
              <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200">No events found</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1">
                Try adjusting your search criteria or switching categories.
              </p>
              <button
                onClick={() => { setSearchTerm(''); setSelectedCategory('All'); setActiveTab('all'); }}
                className="mt-4 px-4 py-2 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 rounded-lg text-xs font-semibold hover:bg-indigo-100"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map(evt => (
                <div
                  key={evt.id}
                  className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-700/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  {/* Card Image */}
                  <div className="relative h-48 overflow-hidden bg-slate-200 dark:bg-slate-700">
                    <img
                      src={evt.image}
                      alt={evt.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex items-center space-x-2">
                      <span className="bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                        {evt.category}
                      </span>
                      {evt.featured && (
                        <span className="bg-amber-500/90 backdrop-blur-md text-slate-950 text-[11px] font-extrabold px-2 py-1 rounded-md flex items-center space-x-1">
                          <Award className="w-3 h-3" />
                          <span>Featured</span>
                        </span>
                      )}
                    </div>
                    <div className="absolute bottom-3 right-3">
                      <span className="bg-indigo-600/90 backdrop-blur-md text-white text-xs font-extrabold px-2.5 py-1 rounded-lg">
                        {evt.price}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                        <span className="flex items-center">
                          <Calendar className="w-3.5 h-3.5 mr-1 text-indigo-500" />
                          {new Date(evt.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <CountdownTimer targetDate={evt.date} compact />
                      </div>

                      <h3 className="text-lg font-bold leading-snug text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {evt.title}
                      </h3>

                      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                        {evt.shortDesc}
                      </p>
                    </div>

                    <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-700/60">
                      <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 truncate">
                        <MapPin className="w-3.5 h-3.5 mr-1.5 text-slate-400 flex-shrink-0" />
                        <span className="truncate">{evt.venue}</span>
                      </div>

                      <div className="flex items-center space-x-2 pt-1">
                        <button
                          onClick={() => setSelectedEvent(evt)}
                          className="flex-1 py-2 px-3 bg-slate-100 dark:bg-slate-700/70 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-xl transition-colors text-center"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => { setRegisterEvent(evt); setFormData({ name: '', email: '', phone: '' }); setFormErrors({}); }}
                          className="flex-1 py-2 px-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition-colors text-center shadow-md shadow-indigo-600/20"
                        >
                          Register Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </main>

      {/* EVENT DETAIL MODAL */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-800 relative flex flex-col">
            
            {/* Modal Banner */}
            <div className="relative h-60 sm:h-72 w-full bg-slate-200 dark:bg-slate-800">
              <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-full object-cover" />
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/60 text-white hover:bg-slate-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {selectedEvent.category}
                </span>
                <span className="bg-slate-900/80 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {selectedEvent.price}
                </span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 leading-tight">
                  {selectedEvent.title}
                </h2>
                <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1 text-indigo-500" />
                    {new Date(selectedEvent.date).toLocaleString([], { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <span className="flex items-center">
                    <Users className="w-4 h-4 mr-1 text-indigo-500" />
                    {selectedEvent.seatsLeft} Spots Remaining
                  </span>
                </div>
              </div>

              {/* Countdown Banner */}
              <div className="bg-slate-50 dark:bg-slate-800/70 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/70">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                  Event Starts In
                </span>
                <CountdownTimer targetDate={selectedEvent.date} />
              </div>

              {/* Description */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">About The Event</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedEvent.longDesc}
                </p>
              </div>

              {/* Venue Info */}
              <div className="bg-indigo-50/50 dark:bg-indigo-950/30 p-4 rounded-2xl border border-indigo-100 dark:border-indigo-900/50 flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-indigo-900 dark:text-indigo-200 uppercase">Venue & Location</h5>
                  <p className="text-xs text-indigo-700 dark:text-indigo-300 mt-0.5">{selectedEvent.venue}</p>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end space-x-3">
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="px-5 py-2.5 text-xs font-semibold rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const evt = selectedEvent;
                    setSelectedEvent(null);
                    setRegisterEvent(evt);
                    setFormData({ name: '', email: '', phone: '' });
                    setFormErrors({});
                  }}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/30"
                >
                  Register For Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* INTERACTIVE REGISTRATION MODAL WITH VALIDATION */}
      {registerEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 relative">
            <button
              onClick={() => setRegisterEvent(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Registration
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                {registerEvent.title}
              </h3>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="e.g. Sarah Jenkins"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border ${
                      formErrors.name ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-700 focus:ring-indigo-500'
                    } rounded-xl text-sm focus:outline-none focus:ring-2`}
                  />
                </div>
                {formErrors.name && <p className="text-red-500 text-xs mt-1 font-medium">{formErrors.name}</p>}
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    placeholder="sarah@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border ${
                      formErrors.email ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-700 focus:ring-indigo-500'
                    } rounded-xl text-sm focus:outline-none focus:ring-2`}
                  />
                </div>
                {formErrors.email && <p className="text-red-500 text-xs mt-1 font-medium">{formErrors.email}</p>}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border ${
                      formErrors.phone ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-700 focus:ring-indigo-500'
                    } rounded-xl text-sm focus:outline-none focus:ring-2`}
                  />
                </div>
                {formErrors.phone && <p className="text-red-500 text-xs mt-1 font-medium">{formErrors.phone}</p>}
              </div>

              <div className="pt-4 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setRegisterEvent(null)}
                  className="px-4 py-2.5 text-xs font-semibold rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition-all"
                >
                  Confirm Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MY REGISTRATIONS MODAL (LOCALSTORAGE PERSISTENCE) */}
      {showRegistrationsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 relative">
            <button
              onClick={() => setShowRegistrationsModal(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-xl">
                <Ticket className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">My Registered Events</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Stored locally in your browser</p>
              </div>
            </div>

            {myRegistrations.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                <Ticket className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">No active event registrations</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                  Browse events and register to view your passes here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {myRegistrations.map((reg) => (
                  <div
                    key={reg.id}
                    className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded">
                        Ticket ID: {reg.id.slice(-6).toUpperCase()}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug">
                        {reg.eventTitle}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(reg.eventDate).toLocaleDateString()}
                      </p>
                      <p className="text-[11px] text-slate-400 dark:text-slate-500">
                        Attendee: {reg.userName} ({reg.email})
                      </p>
                    </div>

                    <button
                      onClick={() => cancelRegistration(reg.id)}
                      className="inline-flex items-center justify-center space-x-1 px-3 py-1.5 text-xs font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/60 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Cancel Pass</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 py-8 transition-colors">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-3">
          <div className="flex items-center justify-center space-x-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <span className="font-bold text-slate-900 dark:text-slate-100">EventPulse Platform</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Designed for seamless event discovery, interactive registrations, and responsive community management.
          </p>
          <p className="text-[11px] text-slate-400 dark:text-slate-600 pt-2">
            © 2026 EventPulse. Built with React & Tailwind CSS.
          </p>
        </div>
      </footer>

    </div>
  );
}