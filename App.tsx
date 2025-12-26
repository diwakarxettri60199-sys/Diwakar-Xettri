
import React, { useState, useEffect, useMemo } from 'react';
import { SUBJECTS } from './constants';
import { Subject, Chapter, NoteContent, View, Bookmark } from './types';
import { getAIExplanation } from './services/geminiService';

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [selectedSemester, setSelectedSemester] = useState<number | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedNote, setSelectedNote] = useState<NoteContent | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('bba_bookmarks');
    if (saved) setBookmarks(JSON.parse(saved));
    const isDark = localStorage.getItem('bba_dark') === 'true';
    setDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    const newVal = !darkMode;
    setDarkMode(newVal);
    localStorage.setItem('bba_dark', String(newVal));
  };

  const toggleBookmark = (note: NoteContent, sub: Subject, chap: Chapter) => {
    const isBookmarked = bookmarks.some(b => b.noteId === note.id);
    let newBookmarks;
    if (isBookmarked) {
      newBookmarks = bookmarks.filter(b => b.noteId !== note.id);
    } else {
      newBookmarks = [...bookmarks, { 
        id: Math.random().toString(36), 
        subjectId: sub.id, 
        chapterId: chap.id, 
        noteId: note.id,
        title: note.title 
      }];
    }
    setBookmarks(newBookmarks);
    localStorage.setItem('bba_bookmarks', JSON.stringify(newBookmarks));
  };

  const handleAIExplain = async (note: NoteContent) => {
    setAiLoading(true);
    setAiResponse(null);
    const explanation = await getAIExplanation(note.title, note.explanation);
    setAiResponse(explanation);
    setAiLoading(false);
  };

  const openSemester = (sem: number) => {
    setSelectedSemester(sem);
    setView('semester');
    window.scrollTo(0, 0);
  };

  const openSubject = (s: Subject) => {
    setSelectedSubject(s);
    setView('subject');
    window.scrollTo(0, 0);
  };

  const openNote = (n: NoteContent, c: Chapter) => {
    setSelectedNote(n);
    setSelectedChapter(c);
    setView('note');
    window.scrollTo(0, 0);
  };

  const goBack = () => {
    if (view === 'note') setView('subject');
    else if (view === 'subject') setView('semester');
    else if (view === 'semester') setView('home');
    else setView('home');
    setAiResponse(null);
    window.scrollTo(0, 0);
  };

  // --- Components ---

  const Navbar = () => (
    <nav className={`sticky top-0 z-50 border-b px-6 py-4 flex items-center justify-between transition-all backdrop-blur-md ${darkMode ? 'bg-gray-950/80 border-gray-800' : 'bg-white/80 border-gray-100'}`}>
      <div className="flex items-center gap-4 cursor-pointer group" onClick={() => setView('home')}>
        <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-500/20 group-hover:scale-110 transition-transform">
          <i className="fas fa-graduation-cap text-xl"></i>
        </div>
        <div>
          <h1 className={`font-black text-xl tracking-tighter leading-none ${darkMode ? 'text-white' : 'text-gray-900'}`}>BBA Hub</h1>
          <p className="text-[10px] uppercase font-black text-blue-500 tracking-widest mt-1">4-Year Curriculum</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <button onClick={toggleDarkMode} className={`p-3 rounded-2xl transition-all ${darkMode ? 'text-yellow-400 bg-gray-900 border border-gray-800' : 'text-gray-400 hover:bg-gray-100 border border-transparent'}`}>
          <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
        </button>
        <button onClick={() => setView('search')} className={`p-3 rounded-2xl transition-all ${view === 'search' ? 'text-blue-600 bg-blue-50' : 'text-gray-400 hover:bg-gray-100'}`}>
          <i className="fas fa-search"></i>
        </button>
        <button onClick={() => setView('bookmarks')} className={`p-3 rounded-2xl transition-all ${view === 'bookmarks' ? 'text-blue-600 bg-blue-50' : 'text-gray-400 hover:bg-gray-100'}`}>
          <i className="fas fa-bookmark"></i>
        </button>
      </div>
    </nav>
  );

  const Header = ({ title, subtitle, onBack }: { title: string; subtitle?: string; onBack?: () => void }) => (
    <div className={`px-6 pt-8 pb-4 space-y-2 animate-in fade-in slide-in-from-top-4 duration-500`}>
      {onBack && (
        <button onClick={onBack} className={`mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-all ${darkMode ? 'text-gray-500 hover:text-blue-400' : 'text-gray-400 hover:text-blue-600'}`}>
          <i className="fas fa-arrow-left"></i> Back
        </button>
      )}
      <h2 className={`text-4xl font-black leading-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h2>
      {subtitle && <p className="text-gray-400 text-sm font-medium">{subtitle}</p>}
    </div>
  );

  const renderHome = () => (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="px-6">
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800 p-8 rounded-[3rem] shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="relative z-10 space-y-6">
            <h2 className="text-4xl font-black text-white leading-none">Your Complete<br/>BBA Roadmap.</h2>
            <p className="text-blue-100 text-md opacity-80 max-w-xs leading-relaxed">Access notes, exam prep, and AI support for every semester of your degree.</p>
            <div className="flex gap-3">
              <button onClick={() => setView('search')} className="bg-white text-blue-700 px-6 py-4 rounded-2xl font-black text-sm shadow-xl active:scale-95 transition-all">Explore Subjects</button>
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 px-5 py-4 rounded-2xl flex items-center gap-2">
                <i className="fas fa-bolt text-yellow-400"></i>
                <span className="text-white text-xs font-black">AI Enabled</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 space-y-6 pb-20">
        <div className="flex items-center justify-between">
          <h3 className={`text-xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>Study by Semester</h3>
          <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Year 1 to 4</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => {
            const subjectsCount = SUBJECTS.filter(s => s.semester === sem).length;
            return (
              <button
                key={sem}
                onClick={() => openSemester(sem)}
                className={`p-6 rounded-[2.5rem] border text-left transition-all active:scale-95 group hover:shadow-2xl ${
                  darkMode ? 'bg-gray-900 border-gray-800 hover:bg-gray-800' : 'bg-white border-gray-100 hover:border-blue-200'
                }`}
              >
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <span className="text-md font-black">S{sem}</span>
                </div>
                <h4 className={`font-black text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>Semester {sem}</h4>
                <p className="text-xs text-gray-400 font-bold mt-1 uppercase tracking-tight">{subjectsCount} Subjects</p>
              </button>
            );
          })}
        </div>

        <div className={`mt-10 p-8 rounded-[3rem] border transition-all ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-blue-50'}`}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-white rounded-3xl flex items-center justify-center text-indigo-600 shadow-xl shadow-indigo-500/10">
              <i className="fas fa-brain text-2xl"></i>
            </div>
            <div>
              <h4 className={`font-black text-xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>Interactive Revision</h4>
              <p className="text-sm text-gray-400">Personalized AI Quizzes.</p>
            </div>
          </div>
          <button 
            onClick={() => setView('quiz')}
            className="w-full bg-indigo-600 text-white py-5 rounded-3xl font-black shadow-2xl shadow-indigo-600/30 hover:bg-indigo-700 active:scale-95 transition-all"
          >
            Start Quiz Session
          </button>
        </div>
      </div>
    </div>
  );

  const renderSemester = () => {
    const semesterSubjects = SUBJECTS.filter(s => s.semester === selectedSemester);
    return (
      <div className="space-y-6 pb-20 animate-in slide-in-from-right duration-500">
        <Header title={`Semester ${selectedSemester}`} subtitle="Focus on your core competencies for this term." onBack={goBack} />
        
        <div className="px-6 grid gap-4">
          {semesterSubjects.map(sub => (
            <button
              key={sub.id}
              onClick={() => openSubject(sub)}
              className={`p-6 rounded-[2.5rem] border flex items-center gap-6 text-left transition-all active:scale-95 group hover:shadow-xl ${
                darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100 shadow-sm'
              }`}
            >
              <div className={`${sub.color} w-16 h-16 rounded-3xl flex items-center justify-center text-white text-3xl shadow-lg shadow-blue-500/10`}>
                <i className={`fas ${sub.icon}`}></i>
              </div>
              <div className="flex-1">
                <h4 className={`font-black text-xl leading-tight ${darkMode ? 'text-white' : 'text-gray-900'} group-hover:text-blue-500 transition-colors`}>{sub.name}</h4>
                <p className="text-xs text-gray-400 line-clamp-1 mt-1">{sub.description}</p>
              </div>
              <i className="fas fa-chevron-right text-gray-300 text-sm"></i>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderSubject = () => {
    if (!selectedSubject) return null;
    return (
      <div className="space-y-6 pb-20 animate-in slide-in-from-right duration-500">
        <Header title={selectedSubject.name} subtitle="Master every chapter with structured notes." onBack={goBack} />
        
        <div className="px-6">
          <div className={`${selectedSubject.color} p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden mb-10`}>
            <i className={`fas ${selectedSubject.icon} text-8xl absolute -bottom-6 -right-6 opacity-20 transform -rotate-12`}></i>
            <h3 className="text-3xl font-black mb-2">{selectedSubject.name}</h3>
            <p className="text-sm opacity-90 leading-relaxed max-w-xs">{selectedSubject.description}</p>
          </div>

          <div className="space-y-6">
            <h3 className={`text-xl font-black px-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Course Modules</h3>
            {selectedSubject.chapters.length === 0 ? (
              <div className="text-center py-20 opacity-30 italic font-medium">Curriculum updates in progress...</div>
            ) : (
              selectedSubject.chapters.map((chap, idx) => (
                <div key={chap.id} className={`rounded-[3rem] border overflow-hidden shadow-sm ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}>
                  <div className={`px-8 py-5 border-b flex items-center justify-between ${darkMode ? 'bg-gray-900/50 border-gray-800' : 'bg-gray-50 border-gray-100'}`}>
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 text-xs font-black flex items-center justify-center">{idx + 1}</span>
                      <span className={`text-sm font-black uppercase tracking-widest ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{chap.title}</span>
                    </div>
                  </div>
                  <div className="divide-y divide-gray-100/10">
                    {chap.notes.map(note => (
                      <button
                        key={note.id}
                        onClick={() => openNote(note, chap)}
                        className={`w-full text-left px-8 py-6 flex items-center justify-between group transition-colors ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-blue-50/50'}`}
                      >
                        <span className={`text-lg font-bold ${darkMode ? 'text-gray-200 group-hover:text-blue-400' : 'text-gray-700 group-hover:text-blue-600'}`}>{note.title}</span>
                        <i className="fas fa-arrow-right text-gray-300 text-xs transform group-hover:translate-x-1 transition-transform"></i>
                      </button>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderNote = () => {
    if (!selectedNote || !selectedSubject || !selectedChapter) return null;
    const isBookmarked = bookmarks.some(b => b.noteId === selectedNote.id);

    return (
      <div className="pb-32 space-y-8 animate-in fade-in duration-500">
        <div className="px-6 pt-8 flex justify-between items-start">
          <div className="flex-1 pr-6">
            <button onClick={goBack} className="text-blue-600 font-black text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
              <i className="fas fa-arrow-left"></i> {selectedSubject.name}
            </button>
            <h2 className={`text-4xl font-black leading-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedNote.title}</h2>
            <p className="text-gray-400 text-sm font-medium mt-1">{selectedChapter.title}</p>
          </div>
          <button 
            onClick={() => toggleBookmark(selectedNote, selectedSubject, selectedChapter)}
            className={`w-14 h-14 rounded-3xl flex items-center justify-center shadow-xl transition-all active:scale-90 ${
              isBookmarked ? 'bg-blue-600 text-white' : darkMode ? 'bg-gray-900 text-gray-500' : 'bg-white text-gray-400 border border-gray-100'
            }`}
          >
            <i className={`fa${isBookmarked ? 's' : 'r'} fa-bookmark text-xl`}></i>
          </button>
        </div>

        <div className="px-6 space-y-8">
          <div className={`rounded-[3rem] p-10 shadow-2xl space-y-10 border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}>
            <section>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-sm shadow-inner">
                  <i className="fas fa-book-open"></i>
                </div>
                <h3 className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>Concept Overview</h3>
              </div>
              <p className={`leading-relaxed text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{selectedNote.explanation}</p>
            </section>

            <section>
              <h3 className={`text-[10px] font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                <div className="h-px bg-current flex-1"></div>
                Critical Takeaways
                <div className="h-px bg-current flex-1"></div>
              </h3>
              <div className="grid gap-4">
                {selectedNote.keyPoints.map((point, i) => (
                  <div key={i} className={`p-6 rounded-3xl flex gap-5 items-start transition-colors ${darkMode ? 'bg-gray-800/40 border border-gray-800' : 'bg-gray-50 border border-gray-100'}`}>
                    <span className="w-8 h-8 rounded-2xl bg-blue-600 text-white text-xs font-black flex-shrink-0 flex items-center justify-center mt-1 shadow-lg shadow-blue-500/20">{i+1}</span>
                    <p className={`text-md font-bold leading-snug ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{point}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className={`rounded-[2.5rem] p-8 transition-colors ${darkMode ? 'bg-indigo-950/20 border border-indigo-900/30' : 'bg-blue-50 border border-blue-100'}`}>
              <h3 className="text-sm font-black text-blue-600 mb-6 flex items-center gap-3">
                <i className="fas fa-lightbulb text-lg"></i> Business In Practice
              </h3>
              <div className="space-y-5">
                {selectedNote.examples.map((ex, i) => (
                  <div key={i} className="flex gap-4 text-sm font-bold text-blue-900/80 leading-relaxed italic">
                    <span className="text-blue-400 text-lg">•</span> {ex}
                  </div>
                ))}
              </div>
            </section>

            {selectedNote.examQuestions && selectedNote.examQuestions.length > 0 && (
              <section className={`rounded-[2.5rem] p-8 border ${darkMode ? 'bg-rose-950/20 border-rose-900/30' : 'bg-rose-50 border-rose-100'}`}>
                <h3 className="text-sm font-black text-rose-600 mb-6 flex items-center gap-3">
                  <i className="fas fa-file-signature text-lg"></i> Exam Questions
                </h3>
                <div className="space-y-4">
                  {selectedNote.examQuestions.map((q, i) => (
                    <div key={i} className={`p-4 rounded-2xl font-bold text-sm ${darkMode ? 'bg-gray-900/50 text-rose-400' : 'bg-white text-rose-900 shadow-sm'}`}>
                      Q{i+1}: {q}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className={`rounded-[3rem] p-10 shadow-xl border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>Smart AI Tutor</h3>
                <p className="text-sm text-gray-400 font-medium mt-1">Deep-dive explanation & doubt solver.</p>
              </div>
              <button 
                onClick={() => handleAIExplain(selectedNote)}
                disabled={aiLoading}
                className={`w-16 h-16 rounded-[2rem] shadow-2xl flex items-center justify-center transition-all active:scale-95 ${
                  aiLoading ? 'bg-gray-100 text-gray-400' : 'bg-gradient-to-br from-indigo-600 to-purple-700 text-white'
                }`}
              >
                {aiLoading ? <i className="fas fa-spinner fa-spin text-xl"></i> : <i className="fas fa-wand-magic-sparkles text-xl"></i>}
              </button>
            </div>

            {aiResponse ? (
              <div className="p-8 bg-indigo-50/50 rounded-[2.5rem] border border-indigo-100 animate-in zoom-in duration-500">
                <div className="text-md text-gray-800 whitespace-pre-line leading-relaxed italic font-medium">
                  {aiResponse}
                </div>
              </div>
            ) : !aiLoading && (
              <div className="text-center py-6 text-xs font-black text-gray-300 uppercase tracking-widest border-2 border-dashed border-gray-100 rounded-3xl">
                Tap the wand for personalized AI insights
              </div>
            )}
          </div>
          
          <div className="flex gap-4 pb-10">
             <button className="flex-1 py-5 bg-gray-900 text-white rounded-[2rem] font-black text-sm shadow-2xl active:scale-95 transition-all">
               <i className="fas fa-file-pdf mr-2"></i> Download PDF
             </button>
             <button onClick={() => setView('quiz')} className="flex-1 py-5 bg-blue-600 text-white rounded-[2rem] font-black text-sm shadow-2xl active:scale-95 transition-all">
               <i className="fas fa-tasks mr-2"></i> Take Mock Test
             </button>
          </div>
        </div>
      </div>
    );
  };

  const renderSearch = () => (
    <div className="px-6 space-y-10 pb-20 animate-in fade-in duration-500">
      <Header title="Explore Courses" subtitle="Instant access to the entire 4-year syllabus." />

      <div className="relative group">
        <div className="absolute inset-0 bg-blue-600/5 blur-3xl group-focus-within:bg-blue-600/10 transition-colors rounded-[2rem]"></div>
        <i className="fas fa-search absolute left-8 top-1/2 -translate-y-1/2 text-blue-500 text-xl"></i>
        <input 
          type="text" 
          placeholder="Search topics (e.g. 'Ethos', 'Persuasion', 'HRM')..." 
          className={`w-full relative z-10 ${darkMode ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-gray-200 text-gray-900'} border rounded-[2rem] py-6 pl-20 pr-8 shadow-2xl focus:ring-4 focus:ring-blue-500/20 outline-none transition-all font-bold placeholder-gray-400`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid gap-4">
        {SUBJECTS.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase())).map(sub => (
          <button 
            key={sub.id} 
            onClick={() => openSubject(sub)}
            className={`${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100 shadow-sm'} p-6 rounded-[2.5rem] border flex items-center gap-6 text-left group transition-all hover:scale-[1.02]`}
          >
            <div className={`${sub.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg`}>
              <i className={`fas ${sub.icon}`}></i>
            </div>
            <div>
              <h4 className={`font-black text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>{sub.name}</h4>
              <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] mt-1">Semester {sub.semester}</p>
            </div>
            <i className="fas fa-arrow-right ml-auto text-gray-300"></i>
          </button>
        ))}
        {SUBJECTS.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
          <div className="text-center py-20 opacity-20 italic font-black">No subjects found...</div>
        )}
      </div>
    </div>
  );

  return (
    <div className={`${darkMode ? 'bg-gray-950' : 'bg-[#F9FBFF]'} min-h-screen transition-colors duration-500 font-sans selection:bg-blue-100 selection:text-blue-900`}>
      <div className="max-w-2xl mx-auto min-h-screen">
        <Navbar />
        
        <main className="relative">
          {view === 'home' && renderHome()}
          {view === 'semester' && renderSemester()}
          {view === 'subject' && renderSubject()}
          {view === 'note' && renderNote()}
          {view === 'search' && renderSearch()}
          
          {view === 'bookmarks' && (
             <div className="px-6 space-y-8 animate-in fade-in duration-500">
                <Header title="Your Library" subtitle="Saved notes for quick exam revision." onBack={goBack} />
                {bookmarks.length > 0 ? (
                  <div className="grid gap-4">
                    {bookmarks.map(b => {
                      const sub = SUBJECTS.find(s => s.id === b.subjectId);
                      const chap = sub?.chapters.find(c => c.id === b.chapterId);
                      const note = chap?.notes.find(n => n.id === b.noteId);
                      return (
                        <button 
                          key={b.id} 
                          onClick={() => { if (note && chap) openNote(note, chap); }}
                          className={`${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100 shadow-md'} p-6 rounded-[2.5rem] border flex items-center gap-6 text-left group`}
                        >
                           <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-inner">
                              <i className="fas fa-bookmark"></i>
                           </div>
                           <div className="flex-1">
                              <h4 className={`font-black text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>{b.title}</h4>
                              <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">Saved Resource</p>
                           </div>
                           <i className="fas fa-chevron-right text-gray-200"></i>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-24 opacity-10 flex flex-col items-center">
                    <i className="fas fa-bookmark-slash text-8xl mb-6"></i>
                    <p className="font-black italic text-xl">Your library is empty.</p>
                  </div>
                )}
             </div>
          )}

          {view === 'quiz' && (
             <div className="px-6 flex flex-col items-center justify-center min-h-[80vh] text-center space-y-10 animate-in zoom-in duration-500">
                <div className="relative">
                  <div className="absolute inset-0 bg-indigo-600 blur-[100px] opacity-30"></div>
                  <div className="relative w-32 h-32 rounded-[3rem] bg-indigo-600 text-white flex items-center justify-center text-5xl shadow-2xl shadow-indigo-600/50">
                     <i className="fas fa-brain"></i>
                  </div>
                </div>
                <div className="space-y-4">
                   <h2 className={`text-4xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>Smart Revision</h2>
                   <p className="text-md text-gray-400 font-medium max-w-xs mx-auto">Generate personalized mock tests based on your curriculum.</p>
                </div>
                <button className="w-full max-w-xs bg-gray-900 text-white py-6 rounded-[2.5rem] font-black text-lg shadow-2xl active:scale-95 transition-all hover:bg-black">
                   Launch Quiz Module
                </button>
                <div className="flex items-center gap-6 opacity-30">
                  <i className="fas fa-check-circle text-xs"></i>
                  <span className="text-[10px] font-black uppercase tracking-widest">Global Analytics Enabled</span>
                  <i className="fas fa-check-circle text-xs"></i>
                </div>
             </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
