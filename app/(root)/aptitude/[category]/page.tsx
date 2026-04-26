import { CATEGORY_META } from "@/components/AptitudeCard";
import AptitudeTest from "@/components/AptitudeTest";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { generateAptitudeQuestions } from "@/lib/actions/interview.action";
import { redirect } from "next/navigation";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

const AptitudeTestPage = async ({ params }: RouteParams) => {
  const { category } = await params;
  const user = await getCurrentUser();

  if (!user) redirect("/sign-in");

  const meta = CATEGORY_META[category];
  
  if (!meta) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
        <h2 className="text-2xl font-bold text-white">Category Not Found</h2>
        <p className="text-gray-400">The aptitude category &quot;{category}&quot; does not exist.</p>
        <Link href="/aptitude" className="btn-primary mt-4">Back to Categories</Link>
      </div>
    );
  }

  // Generate 20 questions
  const { success, questions, error } = await generateAptitudeQuestions(category, 20);

  if (!success || !questions || questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-6 max-w-lg mx-auto text-center">
        <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white">Failed to generate test</h2>
        <p className="text-gray-400">
          There was an error generating the AI questions: <br />
          <span className="text-red-400 text-sm mt-2 block">{error || "Unknown error"}</span>
        </p>
        <div className="flex gap-4 mt-4">
          <Link href="/aptitude" className="btn-secondary">Back</Link>
          <a href={`/aptitude/${category}`} className="btn-primary">Try Again</a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 py-6 w-full">
      <div className="flex flex-col items-center text-center gap-2 mb-4">
        <span className="text-4xl">{meta.icon}</span>
        <h1 className="text-3xl font-bold text-white">{meta.label} Test</h1>
        <p className="text-gray-400">Answer all {questions.length} questions. You have 30 minutes.</p>
      </div>

      <AptitudeTest
        questions={questions}
        category={category}
        userId={user.id}
        durationMinutes={30}
      />
    </div>
  );
};

export default AptitudeTestPage;
