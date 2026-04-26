"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { saveAptitudeResult } from "@/lib/actions/interview.action";

interface AptitudeTestProps {
  questions: MCQQuestion[];
  category: string;
  userId: string;
  durationMinutes?: number;
}

const AptitudeTest = ({
  questions,
  category,
  userId,
  durationMinutes = 30,
}: AptitudeTestProps) => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [secondsLeft, setSecondsLeft] = useState(durationMinutes * 60);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // ── Timer ───────────────────────────────────────────────────────
  useEffect(() => {
    if (secondsLeft <= 0) {
      handleSubmit(true);
      return;
    }
    const timer = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const timerColor =
    secondsLeft < 300
      ? "text-red-400"
      : secondsLeft < 600
      ? "text-yellow-400"
      : "text-green-400";

  // ── Answer Selection ────────────────────────────────────────────
  const selectAnswer = (questionId: string, option: string) => {
    // Extract letter from "A. ..." format
    const letter = option.charAt(0).toUpperCase();
    setAnswers((prev) => ({ ...prev, [questionId]: letter }));
  };

  // ── Submit ──────────────────────────────────────────────────────
  const handleSubmit = useCallback(
    async (auto = false) => {
      if (isSubmitting) return;
      setIsSubmitting(true);
      setShowConfirm(false);

      const answerEntries: AptitudeAnswerEntry[] = questions.map((q) => ({
        questionId: q.id,
        selected: answers[q.id] ?? "",
        correct: q.correctAnswer,
        isCorrect: (answers[q.id] ?? "") === q.correctAnswer,
        questionText: q.question,
        options: q.options,
        explanation: q.explanation,
      }));

      const score = answerEntries.filter((a) => a.isCorrect).length;
      const percentage = Math.round((score / questions.length) * 100);

      const { success, resultId } = await saveAptitudeResult({
        userId,
        category,
        score,
        totalQuestions: questions.length,
        percentage,
        answers: answerEntries,
      });

      if (success && resultId) {
        router.push(`/aptitude/${category}/result?resultId=${resultId}`);
      } else {
        // Fallback: pass minimal data via URL (for offline resilience)
        router.push(
          `/aptitude/${category}/result?score=${score}&total=${questions.length}`
        );
      }
    },
    [answers, category, isSubmitting, questions, router, userId]
  );

  const currentQ = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const unansweredCount = questions.length - answeredCount;

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto">
      {/* ── Top Bar ── */}
      <div className="flex items-center justify-between bg-dark-200 rounded-xl px-5 py-3 border border-dark-300">
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400">
            Question {currentIndex + 1}/{questions.length}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-gray-300">
            {answeredCount} answered
          </span>
        </div>
        <div className={`text-2xl font-mono font-bold ${timerColor}`}>
          ⏱ {formatTime(secondsLeft)}
        </div>
      </div>

      {/* ── Question Navigator ── */}
      <div className="flex flex-wrap gap-2">
        {questions.map((q, i) => {
          const isAnswered = !!answers[q.id];
          const isCurrent = i === currentIndex;
          return (
            <button
              key={q.id}
              onClick={() => setCurrentIndex(i)}
              className={`w-8 h-8 rounded-md text-xs font-bold transition-all ${
                isCurrent
                  ? "bg-primary-100 text-black scale-110"
                  : isAnswered
                  ? "bg-green-600/60 text-white"
                  : "bg-dark-300 text-gray-400 hover:bg-dark-200"
              }`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>

      {/* ── Question Card ── */}
      <div className="bg-dark-200 rounded-2xl border border-dark-300 p-6 flex flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <p className="text-base text-white leading-relaxed font-medium">
            {currentIndex + 1}. {currentQ.question}
          </p>
          <span className="shrink-0 text-xs px-2 py-0.5 rounded-full bg-white/10 text-gray-400 capitalize">
            {currentQ.difficulty}
          </span>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-3">
          {currentQ.options.map((option) => {
            const letter = option.charAt(0).toUpperCase();
            const isSelected = answers[currentQ.id] === letter;
            return (
              <button
                key={option}
                onClick={() => selectAnswer(currentQ.id, option)}
                className={`text-left px-4 py-3 rounded-xl border transition-all text-sm ${
                  isSelected
                    ? "border-primary-100 bg-primary-100/10 text-white font-semibold"
                    : "border-dark-300 bg-dark-300/40 text-gray-300 hover:border-primary-100/50 hover:bg-dark-300/80"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Navigation ── */}
      <div className="flex gap-3">
        <button
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex((i) => i - 1)}
          className="flex-1 py-2 rounded-xl border border-dark-300 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all text-sm"
        >
          ← Previous
        </button>

        {currentIndex < questions.length - 1 ? (
          <button
            onClick={() => setCurrentIndex((i) => i + 1)}
            className="flex-1 py-2 rounded-xl bg-dark-200 border border-primary-100/30 text-white hover:bg-dark-300 transition-all text-sm"
          >
            Next →
          </button>
        ) : (
          <button
            onClick={() => setShowConfirm(true)}
            className="flex-1 py-2 rounded-xl btn-primary text-sm font-semibold"
          >
            Submit Test
          </button>
        )}
      </div>

      {/* Quick Submit from any page */}
      {currentIndex < questions.length - 1 && (
        <button
          onClick={() => setShowConfirm(true)}
          disabled={isSubmitting}
          className="py-2 rounded-xl btn-primary text-sm font-semibold disabled:opacity-60"
        >
          {isSubmitting ? "Submitting..." : "Submit Test Early"}
        </button>
      )}

      {/* ── Confirm Dialog ── */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-dark-200 rounded-2xl border border-dark-300 p-8 max-w-sm w-full mx-4 flex flex-col gap-5 shadow-2xl">
            <h3 className="text-xl font-bold text-white">Submit Test?</h3>
            <p className="text-gray-400 text-sm">
              You have answered <span className="text-white font-semibold">{answeredCount}</span> of{" "}
              <span className="text-white font-semibold">{questions.length}</span> questions.
              {unansweredCount > 0 && (
                <span className="text-yellow-400">
                  {" "}
                  {unansweredCount} question{unansweredCount > 1 ? "s" : ""} unanswered.
                </span>
              )}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-2 rounded-xl border border-dark-300 text-gray-400 hover:text-white text-sm"
              >
                Review
              </button>
              <button
                onClick={() => handleSubmit(false)}
                disabled={isSubmitting}
                className="flex-1 py-2 rounded-xl btn-primary text-sm font-semibold disabled:opacity-60"
              >
                {isSubmitting ? "Submitting..." : "Confirm Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AptitudeTest;
