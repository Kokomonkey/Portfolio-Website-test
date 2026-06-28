'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { competitions, disciplines, prizeRanges, deadlineRanges, Competition } from '@/data/competitions';

// Sidebar Component
function Sidebar({
  selectedDisciplines,
  setSelectedDisciplines,
  selectedPrizes,
  setSelectedPrizes,
  selectedDeadlines,
  setSelectedDeadlines,
  onOpenModal,
  language,
  setLanguage,
}: {
  selectedDisciplines: string[];
  setSelectedDisciplines: (disciplines: string[]) => void;
  selectedPrizes: string[];
  setSelectedPrizes: (prizes: string[]) => void;
  selectedDeadlines: string[];
  setSelectedDeadlines: (deadlines: string[]) => void;
  onOpenModal: () => void;
  language: 'EN' | 'NL';
  setLanguage: (lang: 'EN' | 'NL') => void;
}) {
  const toggleDiscipline = (discipline: string) => {
    if (selectedDisciplines.includes(discipline)) {
      setSelectedDisciplines(selectedDisciplines.filter(d => d !== discipline));
    } else {
      setSelectedDisciplines([...selectedDisciplines, discipline]);
    }
  };

  const togglePrize = (prize: string) => {
    if (selectedPrizes.includes(prize)) {
      setSelectedPrizes(selectedPrizes.filter(p => p !== prize));
    } else {
      setSelectedPrizes([...selectedPrizes, prize]);
    }
  };

  const toggleDeadline = (deadline: string) => {
    if (selectedDeadlines.includes(deadline)) {
      setSelectedDeadlines(selectedDeadlines.filter(d => d !== deadline));
    } else {
      setSelectedDeadlines([...selectedDeadlines, deadline]);
    }
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-[280px] bg-arch-white/90 backdrop-blur border-r border-arch-black/10 shadow-lg flex flex-col z-40">
      {/* Header */}
      <div className="p-6 border-b border-arch-black/10">
        <h1 className="text-2xl font-bold tracking-tight text-arch-black">
          COMPETITION<br />AGGREGATOR
        </h1>
        <p className="text-xs text-arch-black/50 mt-2 tracking-widest uppercase">
          Architecture & Design
        </p>
      </div>

      {/* Navigation */}
      <nav className="p-6 border-b border-arch-black/10">
        <ul className="space-y-3">
          <li>
            <a href="#" className="text-sm font-medium text-arch-black hover:text-arch-black/70 transition-colors">
              About us
            </a>
          </li>
          <li>
            <a href="#" className="text-sm font-medium text-arch-black hover:text-arch-black/70 transition-colors">
              Contact
            </a>
          </li>
        </ul>
      </nav>

      {/* Filters */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Disciplines */}
        <div>
          <h3 className="text-xs font-semibold tracking-widest uppercase text-arch-black/50 mb-4">
            Disciplines
          </h3>
          <div className="space-y-2">
            {disciplines.map((discipline) => (
              <label key={discipline} className="flex items-center gap-3 cursor-pointer group">
                <div className="w-4 h-4 border border-arch-black/30 relative flex items-center justify-center transition-colors group-hover:border-arch-black">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={selectedDisciplines.includes(discipline)}
                    onChange={() => toggleDiscipline(discipline)}
                  />
                  {selectedDisciplines.includes(discipline) && (
                    <div className="w-2 h-2 bg-arch-black" />
                  )}
                </div>
                <span className="text-sm text-arch-black/80 group-hover:text-arch-black transition-colors">
                  {discipline}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Prize Ranges */}
        <div>
          <h3 className="text-xs font-semibold tracking-widest uppercase text-arch-black/50 mb-4">
            Prize Range
          </h3>
          <div className="space-y-2">
            {prizeRanges.map((range) => (
              <label key={range.label} className="flex items-center gap-3 cursor-pointer group">
                <div className="w-4 h-4 border border-arch-black/30 relative flex items-center justify-center transition-colors group-hover:border-arch-black">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={selectedPrizes.includes(range.label)}
                    onChange={() => togglePrize(range.label)}
                  />
                  {selectedPrizes.includes(range.label) && (
                    <div className="w-2 h-2 bg-arch-black" />
                  )}
                </div>
                <span className="text-sm text-arch-black/80 group-hover:text-arch-black transition-colors">
                  {range.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Deadline Ranges */}
        <div>
          <h3 className="text-xs font-semibold tracking-widest uppercase text-arch-black/50 mb-4">
            Deadline
          </h3>
          <div className="space-y-2">
            {deadlineRanges.map((range) => (
              <label key={range.label} className="flex items-center gap-3 cursor-pointer group">
                <div className="w-4 h-4 border border-arch-black/30 relative flex items-center justify-center transition-colors group-hover:border-arch-black">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={selectedDeadlines.includes(range.label)}
                    onChange={() => toggleDeadline(range.label)}
                  />
                  {selectedDeadlines.includes(range.label) && (
                    <div className="w-2 h-2 bg-arch-black" />
                  )}
                </div>
                <span className="text-sm text-arch-black/80 group-hover:text-arch-black transition-colors">
                  {range.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="p-6 border-t border-arch-black/10">
        <button
          onClick={onOpenModal}
          className="w-full py-4 bg-arch-black text-arch-white text-sm font-medium tracking-wide hover:bg-arch-black/80 transition-colors"
        >
          Help me find my Competition
        </button>
      </div>

      {/* Language Toggle */}
      <div className="p-6 pt-0">
        <div className="flex gap-2">
          <button
            onClick={() => setLanguage('EN')}
            className={`flex-1 py-2 text-xs font-medium tracking-widest transition-colors ${
              language === 'EN'
                ? 'bg-arch-black text-arch-white'
                : 'bg-arch-gray text-arch-black/50 hover:text-arch-black'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage('NL')}
            className={`flex-1 py-2 text-xs font-medium tracking-widest transition-colors ${
              language === 'NL'
                ? 'bg-arch-black text-arch-white'
                : 'bg-arch-gray text-arch-black/50 hover:text-arch-black'
            }`}
          >
            NL
          </button>
        </div>
      </div>
    </aside>
  );
}

// Competition Card Component
function CompetitionCard({
  competition,
  onClick,
}: {
  competition: Competition;
  onClick: () => void;
}) {
  return (
    <article
      onClick={onClick}
      className="bg-arch-white/95 border border-arch-black/10 rounded-xl shadow-md cursor-pointer hover:shadow-xl hover:border-arch-black/30 transition-all duration-300 group overflow-hidden"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={competition.imageUrl}
          alt={competition.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-arch-white/90 rounded-full text-xs font-semibold tracking-wider text-arch-black shadow">
            {competition.discipline}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3">
        <h2 className="text-lg font-bold text-arch-black mb-1 leading-tight group-hover:text-arch-black/70 transition-colors">
          {competition.title}
        </h2>
        <div className="flex flex-wrap gap-2 text-xs text-arch-black/60">
          <span className="px-2 py-1 bg-arch-gray rounded">Team: <span className="font-semibold text-arch-black">{competition.teamSize}</span></span>
          <span className="px-2 py-1 bg-arch-gray rounded">Prize: <span className="font-semibold text-arch-black">{competition.prize}</span></span>
          <span className="px-2 py-1 bg-arch-gray rounded">Deadline: <span className="font-semibold text-arch-black">{competition.deadline}</span></span>
          <span className="px-2 py-1 bg-arch-gray rounded">Entry Fee: <span className="font-semibold text-arch-black">{competition.cost}</span></span>
        </div>
      </div>
    </article>
  );
}

// Detail Panel Component
function DetailPanel({
  competition,
  onClose,
}: {
  competition: Competition | null;
  onClose: () => void;
}) {
  if (!competition) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-arch-black/40 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 h-screen w-[500px] bg-arch-white/95 shadow-2xl border-l border-arch-black/10 z-50 overflow-y-auto transform transition-transform duration-300 ease-out rounded-l-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center border border-arch-black/20 text-arch-black hover:bg-arch-black hover:text-arch-white transition-colors z-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="square"
            strokeLinejoin="miter"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Image */}
        <div className="relative h-64 rounded-t-2xl overflow-hidden">
          <Image
            src={competition.imageUrl}
            alt={competition.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col gap-6">
          {/* Discipline Tag */}
          <span className="inline-block px-3 py-1 bg-arch-black text-arch-white text-xs font-semibold tracking-wider mb-2 rounded-full shadow">
            {competition.discipline}
          </span>

          {/* Title */}
          <h2 className="text-2xl font-bold text-arch-black mb-2">
            {competition.title}
          </h2>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <span className="text-xs text-arch-black/50 block mb-1 tracking-wider uppercase">Prize</span>
              <span className="text-lg font-semibold text-arch-black">{competition.prize}</span>
            </div>
            <div>
              <span className="text-xs text-arch-black/50 block mb-1 tracking-wider uppercase">Entry Fee</span>
              <span className="text-lg font-semibold text-arch-black">{competition.cost}</span>
            </div>
            <div>
              <span className="text-xs text-arch-black/50 block mb-1 tracking-wider uppercase">Team Size</span>
              <span className="text-lg font-semibold text-arch-black">{competition.teamSize}</span>
            </div>
            <div>
              <span className="text-xs text-arch-black/50 block mb-1 tracking-wider uppercase">Deadline</span>
              <span className="text-lg font-semibold text-arch-black">{competition.deadline}</span>
            </div>
            <div>
              <span className="text-xs text-arch-black/50 block mb-1 tracking-wider uppercase">Location</span>
              <span className="text-lg font-semibold text-arch-black">{competition.location}</span>
            </div>
            <div>
              <span className="text-xs text-arch-black/50 block mb-1 tracking-wider uppercase">Organizer</span>
              <span className="text-lg font-semibold text-arch-black">{competition.organizer}</span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-4">
            <h3 className="text-xs font-semibold tracking-widest uppercase text-arch-black/50 mb-2">
              Description
            </h3>
            <p className="text-sm text-arch-black/80 leading-relaxed">
              {competition.description}
            </p>
          </div>

          {/* Join Button */}
          <a
            href={`mailto:competitions@example.com?subject=Join Competition: ${competition.title}`}
            className="block w-full py-4 bg-arch-black text-arch-white text-center text-base font-semibold tracking-wide rounded-lg shadow hover:bg-arch-black/80 transition-colors"
          >
            Join now
          </a>
        </div>
      </div>
    </>
  );
}

// Questionnaire Modal Component
function QuestionnaireModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const questions = [
    {
      id: 'discipline',
      question: 'What is your primary discipline?',
      options: ['Architecture', 'Landscape Architecture', 'Urbanism', 'Industrial Design'],
    },
    {
      id: 'teamSize',
      question: 'What is your team size?',
      options: ['Solo', '2-3 members', '4-5 members', '6+ members'],
    },
    {
      id: 'budget',
      question: 'What is your budget for entry fees?',
      options: ['Under $50', '$50-$150', '$150-$300', 'No limit'],
    },
  ];

  const currentQuestion = questions[step - 1];

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: answer });
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleSubmit = () => {
    alert('Recommendations: Urban Housing Innovation Challenge, Metro Station Redesign, Cultural Center in Historic District');
    onClose();
    setStep(1);
    setAnswers({});
  };

  const handleClose = () => {
    onClose();
    setStep(1);
    setAnswers({});
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-arch-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-arch-white w-full max-w-md p-8 relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-arch-black/50 hover:text-arch-black transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="square"
            strokeLinejoin="miter"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 transition-colors ${
                s <= step ? 'bg-arch-black' : 'bg-arch-black/20'
              }`}
            />
          ))}
        </div>

        {/* Question */}
        <h3 className="text-lg font-semibold text-arch-black mb-6">
          {currentQuestion?.question}
        </h3>

        {/* Options */}
        <div className="space-y-3">
          {currentQuestion?.options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              className="w-full p-4 text-left border border-arch-black/20 text-sm text-arch-black hover:border-arch-black hover:bg-arch-gray transition-colors"
            >
              {option}
            </button>
          ))}
        </div>

        {/* Submit Button (only on last step) */}
        {step === 3 && (
          <button
            onClick={handleSubmit}
            className="w-full mt-6 py-4 bg-arch-black text-arch-white text-sm font-medium tracking-wide hover:bg-arch-black/80 transition-colors"
          >
            Show Recommendations
          </button>
        )}
      </div>
    </div>
  );
}

// Main Page Component
export default function Home() {
  const [selectedDisciplines, setSelectedDisciplines] = useState<string[]>([]);
  const [selectedPrizes, setSelectedPrizes] = useState<string[]>([]);
  const [selectedDeadlines, setSelectedDeadlines] = useState<string[]>([]);
  const [selectedCompetition, setSelectedCompetition] = useState<Competition | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [language, setLanguage] = useState<'EN' | 'NL'>('EN');

  // Filter competitions
  const filteredCompetitions = useMemo(() => {
    return competitions.filter((competition) => {
      // Discipline filter
      if (selectedDisciplines.length > 0 && !selectedDisciplines.includes(competition.discipline)) {
        return false;
      }

      // Prize filter
      if (selectedPrizes.length > 0) {
        const matchesPrize = selectedPrizes.some((prizeLabel) => {
          const range = prizeRanges.find((r) => r.label === prizeLabel);
          if (!range) return false;
          return competition.prizeAmount >= range.min && competition.prizeAmount < range.max;
        });
        if (!matchesPrize) return false;
      }

      // Deadline filter
      if (selectedDeadlines.length > 0) {
        const now = new Date();
        const matchesDeadline = selectedDeadlines.some((deadlineLabel) => {
          const range = deadlineRanges.find((r) => r.label === deadlineLabel);
          if (!range) return false;
          const futureDate = new Date();
          futureDate.setMonth(futureDate.getMonth() + range.months);
          return competition.deadlineDate <= futureDate;
        });
        if (!matchesDeadline) return false;
      }

      return true;
    });
  }, [selectedDisciplines, selectedPrizes, selectedDeadlines]);

  return (
    <div className="min-h-screen bg-arch-white">
      {/* Sidebar */}
      <Sidebar
        selectedDisciplines={selectedDisciplines}
        setSelectedDisciplines={setSelectedDisciplines}
        selectedPrizes={selectedPrizes}
        setSelectedPrizes={setSelectedPrizes}
        selectedDeadlines={selectedDeadlines}
        setSelectedDeadlines={setSelectedDeadlines}
        onOpenModal={() => setIsModalOpen(true)}
        language={language}
        setLanguage={setLanguage}
      />

      {/* Main Content */}
      <main className="ml-[280px] p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-arch-black">
            Open Competitions
          </h1>
          <p className="text-sm text-arch-black/50 mt-2">
            {filteredCompetitions.length} competition{filteredCompetitions.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Competition Grid */}
        {filteredCompetitions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCompetitions.map((competition) => (
              <CompetitionCard
                key={competition.id}
                competition={competition}
                onClick={() => setSelectedCompetition(competition)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-arch-black/50">No competitions match your filters.</p>
            <button
              onClick={() => {
                setSelectedDisciplines([]);
                setSelectedPrizes([]);
                setSelectedDeadlines([]);
              }}
              className="mt-4 text-sm font-medium text-arch-black underline hover:text-arch-black/70 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </main>

      {/* Detail Panel */}
      <DetailPanel
        competition={selectedCompetition}
        onClose={() => setSelectedCompetition(null)}
      />

      {/* Questionnaire Modal */}
      <QuestionnaireModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}