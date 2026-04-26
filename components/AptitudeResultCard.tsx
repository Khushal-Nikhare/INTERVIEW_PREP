import { CheckCircle2, XCircle } from "lucide-react";

interface AptitudeResultCardProps {
  question: string;
  options: string[];
  userAnswer: string;
  correctAnswer: string;
  explanation: string;
  index: number;
}

const AptitudeResultCard = ({
  question,
  options,
  userAnswer,
  correctAnswer,
  explanation,
  index,
}: AptitudeResultCardProps) => {
  const isCorrect = userAnswer === correctAnswer;
  const isSkipped = !userAnswer;

  return (
    <div
      className={`border rounded-2xl p-6 flex flex-col gap-4 ${
        isCorrect
          ? "bg-green-500/5 border-green-500/20"
          : isSkipped
          ? "bg-gray-500/5 border-gray-500/20"
          : "bg-red-500/5 border-red-500/20"
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <p className="text-base font-medium text-white">
          <span className="text-gray-400 mr-2">{index + 1}.</span>
          {question}
        </p>
        <div className="shrink-0">
          {isCorrect ? (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4" /> Correct
            </div>
          ) : isSkipped ? (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-500/10 text-gray-400 text-xs font-semibold">
              <span className="w-4 h-4 flex items-center justify-center font-bold text-lg">-</span> Skipped
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-semibold">
              <XCircle className="w-4 h-4" /> Incorrect
            </div>
          )}
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
        {options.map((option) => {
          const letter = option.charAt(0).toUpperCase();
          const isUserSelection = userAnswer === letter;
          const isActualCorrect = correctAnswer === letter;

          let optionStyle = "border-dark-300 bg-dark-300/40 text-gray-400"; // Default
          
          if (isActualCorrect) {
            optionStyle = "border-green-500/50 bg-green-500/10 text-green-300 font-medium";
          } else if (isUserSelection && !isActualCorrect) {
            optionStyle = "border-red-500/50 bg-red-500/10 text-red-300 font-medium";
          }

          return (
            <div
              key={option}
              className={`px-4 py-3 rounded-xl border text-sm ${optionStyle}`}
            >
              {option}
            </div>
          );
        })}
      </div>

      {/* Explanation */}
      <div className="mt-2 p-4 rounded-xl bg-dark-300/50 border border-dark-300">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
          Explanation
        </h4>
        <p className="text-sm text-gray-300 leading-relaxed">
          {explanation || "No explanation provided."}
        </p>
      </div>
    </div>
  );
};

export default AptitudeResultCard;
