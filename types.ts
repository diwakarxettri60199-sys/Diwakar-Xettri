
export interface NoteContent {
  id: string;
  title: string;
  explanation: string;
  keyPoints: string[];
  examples: string[];
  summary?: string;
  formulas?: string[];
  examQuestions?: string[];
}

export interface Chapter {
  id: string;
  title: string;
  notes: NoteContent[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface Subject {
  id: string;
  name: string;
  semester: number;
  icon: string;
  color: string;
  description: string;
  chapters: Chapter[];
  quizzes: QuizQuestion[];
}

export interface Bookmark {
  id: string;
  subjectId: string;
  chapterId: string;
  noteId: string;
  title: string;
}

export type View = 'home' | 'semester' | 'subject' | 'note' | 'quiz' | 'bookmarks' | 'search' | 'admin';
