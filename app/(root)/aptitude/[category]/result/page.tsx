import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { getAptitudeResultsByUser } from "@/lib/actions/interview.action";
import { CATEGORY_META } from "@/components/AptitudeCard";
import AptitudeResultCard from "@/components/AptitudeResultCard";

const AptitudeResultPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ resultId?: string; score?: string; total?: string }>;
}) => {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  const { category } = await params;
  const { resultId, score: fallbackScore, total: fallbackTotal } = await searchParams;

  const meta = CATEGORY_META[category] || { label: category, icon: "📋" };

  let resultData: AptitudeResult | null = null;

  if (resultId) {
    // Fetch result from backend
    const allResults = await getAptitudeResultsByUser(user.id);
    resultData = allResults.find((r) => r.id === resultId) || null;
  }

  // If no resultId or fetch failed, use fallback from URL (without question details)
  const score = resultData ? resultData.score : Number(fallbackScore) || 0;
  const total = resultData ? resultData.totalQuestions : Number(fallbackTotal) || 20;
  const percentage = resultData ? resultData.percentage : Math.round((score / total) * 100);

  const getScoreMessage = (pct: number) => {
    if (pct >= 90) return "Excellent! Outstanding performance.";
    if (pct >= 75) return "Great job! Very solid understanding.";
    if (pct >= 50) return "Good effort, but room for improvement.";
    return "Needs work. Keep practicing!";
  };

  return (
    <div className="flex flex-col gap-10 py-8 max-w-4xl mx-auto w-full">
      {/* ── Header ── */}
      <div className="flex flex-col items-center text-center gap-4">
        <span className="text-5xl">{meta.icon}</span>
        <h1 className="text-4xl font-bold text-white">Test Completed</h1>
        <p className="text-xl text-gray-400">{meta.label}</p>
      </div>

      {/* ── Score Card ── */}
      <div className="bg-dark-200 border border-dark-300 rounded-3xl p-8 md:p-12 flex flex-col items-center gap-6 shadow-2xl relative overflow-hidden">
        {/* Decorative background glow based on score */}
        <div 
          className={`absolute inset-0 opacity-10 blur-3xl rounded-full ${
            percentage >= 80 ? 'bg-green-500' : percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'
          }`} 
        />

        <h2 className="text-2xl font-semibold text-gray-200 z-10">Your Score</h2>
        
        <div className="flex items-baseline gap-2 z-10">
          <span className={`text-7xl font-bold ${
            percentage >= 80 ? "text-green-400" : percentage >= 50 ? "text-yellow-400" : "text-red-400"
          }`}>
            {score}
          </span>
          <span className="text-3xl text-gray-500">/ {total}</span>
        </div>
        
        <div className="flex flex-col items-center gap-1 z-10">
          <span className="text-lg font-medium text-white">{percentage}%</span>
          <p className="text-gray-400">{getScoreMessage(percentage)}</p>
        </div>

        <div className="flex gap-4 mt-4 w-full md:w-auto z-10">
          <Link href="/aptitude" className="btn-secondary flex-1 md:w-48 text-center justify-center">
            View All Tests
          </Link>
          <Link href={`/aptitude/${category}`} className="btn-primary flex-1 md:w-48 text-center justify-center">
            Retake Test
          </Link>
        </div>
      </div>

      {/* ── Question Breakdown ── */}
      {resultData && resultData.answers && resultData.answers.length > 0 && (
        <div className="flex flex-col gap-6 mt-8">
          <h3 className="text-2xl font-bold text-white mb-2">Question Breakdown</h3>
          
          <div className="flex flex-col gap-5">
            {/* If we have the full question data (new format), show detailed cards */}
            {resultData.answers[0].questionText ? (
              resultData.answers.map((ans, i) => (
                <AptitudeResultCard
                  key={i}
                  index={i}
                  question={ans.questionText || `Question ${i + 1}`}
                  options={ans.options || []}
                  userAnswer={ans.selected}
                  correctAnswer={ans.correct}
                  explanation={ans.explanation || ""}
                />
              ))
            ) : (
              /* Fallback for old results that only saved the answer keys */
              <div className="bg-dark-200 border border-dark-300 rounded-xl p-6">
                <p className="text-gray-400 italic text-center">
                  Detailed question review is not available for this older test attempt.
                </p>
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
                  {resultData.answers.map((ans, i) => (
                    <div key={i} className={`flex flex-col items-center p-3 rounded-lg border ${
                      ans.isCorrect ? 'bg-green-500/10 border-green-500/30' : 
                      !ans.selected ? 'bg-gray-500/10 border-gray-500/30' :
                      'bg-red-500/10 border-red-500/30'
                    }`}>
                      <span className="text-xs text-gray-500 font-medium mb-1">Q{i + 1}</span>
                      <span className={`text-lg font-bold ${
                        ans.isCorrect ? 'text-green-400' : 
                        !ans.selected ? 'text-gray-400' :
                        'text-red-400'
                      }`}>
                        {ans.selected || "-"}
                      </span>
                      {!ans.isCorrect && ans.selected && (
                        <span className="text-xs text-green-500 font-medium mt-1">Ans: {ans.correct}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AptitudeResultPage;
