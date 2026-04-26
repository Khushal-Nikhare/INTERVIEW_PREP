import Link from "next/link";
import dayjs from "dayjs";

const CATEGORY_META: Record<
  string,
  { label: string; icon: string; color: string; description: string }
> = {
  quantitative: {
    label: "Quantitative Aptitude",
    icon: "🔢",
    color: "from-blue-500/20 to-blue-600/10 border-blue-500/30",
    description: "Arithmetic, percentages, ratios, time-speed-distance, and more.",
  },
  logical_reasoning: {
    label: "Logical Reasoning",
    icon: "🧩",
    color: "from-purple-500/20 to-purple-600/10 border-purple-500/30",
    description: "Series, analogies, syllogisms, coding-decoding, blood relations.",
  },
  verbal_ability: {
    label: "Verbal Ability",
    icon: "📝",
    color: "from-green-500/20 to-green-600/10 border-green-500/30",
    description: "Synonyms, antonyms, reading comprehension, sentence correction.",
  },
};

interface AptitudeCardProps {
  category: string;
  bestScore?: number;
  lastAttempted?: string;
  totalAttempts?: number;
}

const AptitudeCard = ({
  category,
  bestScore,
  lastAttempted,
  totalAttempts = 0,
}: AptitudeCardProps) => {
  const meta = CATEGORY_META[category] ?? {
    label: category,
    icon: "📋",
    color: "from-gray-500/20 to-gray-600/10 border-gray-500/30",
    description: "Aptitude test questions.",
  };

  return (
    <div
      className={`aptitude-card bg-gradient-to-br ${meta.color} border rounded-2xl p-6 flex flex-col gap-4 hover:scale-[1.02] transition-transform duration-200`}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <span className="text-4xl">{meta.icon}</span>
        {bestScore !== undefined && (
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-white/10 text-white">
            Best: {bestScore}/20
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold text-white">{meta.label}</h3>
        <p className="text-sm text-gray-400">{meta.description}</p>
      </div>

      {/* Stats */}
      <div className="flex gap-4 text-xs text-gray-400">
        <span>20 Questions</span>
        <span>•</span>
        <span>30 min</span>
        {totalAttempts > 0 && (
          <>
            <span>•</span>
            <span>{totalAttempts} attempt{totalAttempts > 1 ? "s" : ""}</span>
          </>
        )}
      </div>

      {lastAttempted && (
        <p className="text-xs text-gray-500">
          Last: {dayjs(lastAttempted).format("MMM D, YYYY")}
        </p>
      )}

      {/* CTA */}
      <Link
        href={`/aptitude/${category}`}
        className="mt-auto btn-primary text-center text-sm font-semibold py-2 px-4 rounded-lg"
      >
        {totalAttempts > 0 ? "Retake Test" : "Start Test"}
      </Link>
    </div>
  );
};

export default AptitudeCard;
export { CATEGORY_META };
