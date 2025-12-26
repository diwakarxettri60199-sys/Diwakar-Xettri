
import { Subject } from './types';

export const SUBJECTS: Subject[] = [
  // SEMESTER I
  {
    id: 's1-eng', semester: 1, name: 'English', icon: 'fa-pen-nib', color: 'bg-blue-500',
    description: 'Developing core language and comprehension skills for business environments.',
    chapters: [
      {
        id: 's1-eng-c1', title: 'Communication Skills',
        notes: [{
          id: 's1-eng-n1', title: 'The Art of Persuasion',
          explanation: 'Persuasion is the process of convincing someone to align with your point of view through logic and emotion.',
          keyPoints: ['Ethos (Credibility)', 'Pathos (Emotion)', 'Logos (Logic)'],
          examples: ['A sales pitch for a new software product', 'A CEO rallying employees during a merger'],
          examQuestions: ['Define Persuasion and its three pillars.', 'How does tone affect professional communication?']
        }]
      }
    ],
    quizzes: []
  },
  { id: 's1-math', semester: 1, name: 'Business Mathematics', icon: 'fa-calculator', color: 'bg-red-500', description: 'Quantitative tools for financial and operational decision-making.', chapters: [], quizzes: [] },
  { id: 's1-pom', semester: 1, name: 'Principles of Management', icon: 'fa-users-gear', color: 'bg-indigo-500', description: 'Core management theories: Planning, Organizing, Leading, and Controlling.', chapters: [], quizzes: [] },
  { id: 's1-bc', semester: 1, name: 'Business Communication', icon: 'fa-envelope-open-text', color: 'bg-teal-500', description: 'Professional writing, presentation, and interpersonal skills.', chapters: [], quizzes: [] },
  { id: 's1-ca', semester: 1, name: 'Computer Application', icon: 'fa-laptop-code', color: 'bg-slate-600', description: 'Mastering productivity software like Excel, Word, and specialized tools.', chapters: [], quizzes: [] },

  // SEMESTER II
  { id: 's2-math2', semester: 2, name: 'Business Mathematics II', icon: 'fa-square-root-variable', color: 'bg-rose-500', description: 'Advanced statistics and calculus for business modeling.', chapters: [], quizzes: [] },
  { id: 's2-micro', semester: 2, name: 'Microeconomics', icon: 'fa-chart-line', color: 'bg-orange-500', description: 'Study of individual agents and markets.', chapters: [], quizzes: [] },
  { id: 's2-ob', semester: 2, name: 'Organizational Behavior', icon: 'fa-people-group', color: 'bg-purple-500', description: 'Analyzing human behavior within organizations.', chapters: [], quizzes: [] },
  { id: 's2-acc', semester: 2, name: 'Financial Accounting', icon: 'fa-file-invoice-dollar', color: 'bg-emerald-500', description: 'Fundamentals of balance sheets, ledger entries, and financial health.', chapters: [], quizzes: [] },
  { id: 's2-stat', semester: 2, name: 'Business Statistics', icon: 'fa-chart-simple', color: 'bg-cyan-500', description: 'Probabilities and data trends for business forecasting.', chapters: [], quizzes: [] },

  // SEMESTER III
  { id: 's3-macro', semester: 3, name: 'Macroeconomics', icon: 'fa-globe', color: 'bg-amber-500', description: 'Global economic trends, inflation, and national policies.', chapters: [], quizzes: [] },
  { id: 's3-law', semester: 3, name: 'Business Law', icon: 'fa-gavel', color: 'bg-stone-600', description: 'Contracts, liabilities, and the legal framework of trade.', chapters: [], quizzes: [] },
  { id: 's3-fin', semester: 3, name: 'Financial Management', icon: 'fa-vault', color: 'bg-blue-700', description: 'Wealth maximization and capital budgeting.', chapters: [], quizzes: [] },
  { id: 's3-mkt', semester: 3, name: 'Marketing Management', icon: 'fa-bullhorn', color: 'bg-pink-600', description: 'The 4 Ps: Product, Price, Place, and Promotion.', chapters: [], quizzes: [] },
  { id: 's3-brm', semester: 3, name: 'Business Research Methods', icon: 'fa-magnifying-glass-chart', color: 'bg-violet-600', description: 'Systematic investigation and data gathering for business problems.', chapters: [], quizzes: [] },

  // SEMESTER IV
  { id: 's4-ops', semester: 4, name: 'Operations Management', icon: 'fa-gears', color: 'bg-orange-600', description: 'Supply chain, logistics, and production efficiency.', chapters: [], quizzes: [] },
  { id: 's4-hrm', semester: 4, name: 'Human Resource Management', icon: 'fa-user-tie', color: 'bg-lime-600', description: 'Talent acquisition, retention, and workforce development.', chapters: [], quizzes: [] },
  { id: 's4-ent', semester: 4, name: 'Entrepreneurship Development', icon: 'fa-rocket', color: 'bg-yellow-600', description: 'Ideation, scaling, and the startup ecosystem.', chapters: [], quizzes: [] },
  { id: 's4-mis', semester: 4, name: 'Management Information System', icon: 'fa-network-wired', color: 'bg-indigo-700', description: 'IT systems for managerial decision-making.', chapters: [], quizzes: [] },
  { id: 's4-eth', semester: 4, name: 'Business Ethics', icon: 'fa-hand-holding-heart', color: 'bg-fuchsia-600', description: 'Corporate social responsibility and moral decision-making.', chapters: [], quizzes: [] },

  // SEMESTER V
  { id: 's5-strat', semester: 5, name: 'Strategic Management', icon: 'fa-chess', color: 'bg-red-700', description: 'Competitive advantage and high-level corporate planning.', chapters: [], quizzes: [] },
  { id: 's5-intl', semester: 5, name: 'International Business', icon: 'fa-earth-americas', color: 'bg-blue-800', description: 'Global markets and cross-cultural trade.', chapters: [], quizzes: [] },
  { id: 's5-ebiz', semester: 5, name: 'E-Business', icon: 'fa-wifi', color: 'bg-sky-500', description: 'Digital transformation and online business models.', chapters: [], quizzes: [] },
  { id: 's5-proj', semester: 5, name: 'Research Project', icon: 'fa-flask', color: 'bg-slate-700', description: 'Practical application of research methodologies.', chapters: [], quizzes: [] },

  // SEMESTER VI
  { id: 's6-lead', semester: 6, name: 'Leadership & Innovation', icon: 'fa-lightbulb', color: 'bg-amber-400', description: 'Leading change and fostering a creative culture.', chapters: [], quizzes: [] },
  { id: 's6-intern', semester: 6, name: 'Internship Training', icon: 'fa-briefcase', color: 'bg-gray-800', description: 'Hands-on industrial experience and reporting.', chapters: [], quizzes: [] },

  // SEMESTER VII & VIII (Advanced / Specialized Electives)
  { id: 's7-spec', semester: 7, name: 'Specialization Elective I', icon: 'fa-star', color: 'bg-purple-700', description: 'Deep dive into Finance, Marketing, or HR.', chapters: [], quizzes: [] },
  { id: 's8-spec', semester: 8, name: 'Specialization Elective II', icon: 'fa-trophy', color: 'bg-indigo-900', description: 'Final specialized mastery and capstone preparation.', chapters: [], quizzes: [] }
];
