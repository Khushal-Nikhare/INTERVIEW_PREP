import React from "react";
import AptitudeCard, { CATEGORY_META } from "@/components/AptitudeCard";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { getAptitudeResultsByUser } from "@/lib/actions/interview.action";

const AptitudeHubPage = async () => {
  const user = await getCurrentUser();
  const userId = user?.id;

  // Fetch user's past aptitude results
  const pastResults = userId ? await getAptitudeResultsByUser(userId) : [];

  // Group results by category to find best score and total attempts
  const categoryStats: Record<string, { bestScore: number; attempts: number; lastAttempt: string }> = {};

  pastResults.forEach((result) => {
    if (!categoryStats[result.category]) {
      categoryStats[result.category] = { bestScore: 0, attempts: 0, lastAttempt: result.createdAt };
    }
    
    const stats = categoryStats[result.category];
    stats.attempts += 1;
    if (result.score > stats.bestScore) {
      stats.bestScore = result.score;
    }
    // Update last attempt if this result is newer
    if (new Date(result.createdAt) > new Date(stats.lastAttempt)) {
      stats.lastAttempt = result.createdAt;
    }
  });

  const categories = Object.keys(CATEGORY_META);

  return (
    <div className="flex flex-col gap-10 py-8 max-w-7xl mx-auto w-full">
      <section className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-white">Aptitude Tests</h1>
        <p className="text-gray-400 max-w-2xl text-lg">
          Sharpen your cognitive skills with our AI-generated aptitude tests. 
          Choose a category below to start a 30-minute timed test.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {categories.map((category) => {
          const stats = categoryStats[category];
          return (
            <AptitudeCard
              key={category}
              category={category}
              bestScore={stats?.bestScore}
              totalAttempts={stats?.attempts}
              lastAttempted={stats?.lastAttempt}
            />
          );
        })}
      </section>
      
      {pastResults.length > 0 && (
        <section className="mt-10 flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-white">Recent Activity</h2>
          <div className="bg-dark-200 border border-dark-300 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-dark-300 text-gray-400">
                  <tr>
                    <th className="px-6 py-4 font-medium">Category</th>
                    <th className="px-6 py-4 font-medium">Score</th>
                    <th className="px-6 py-4 font-medium">Percentage</th>
                    <th className="px-6 py-4 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-300">
                  {pastResults.slice(0, 5).map((result) => (
                    <tr key={result.id} className="hover:bg-dark-300/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-white capitalize">
                        {result.category.replace("_", " ")}
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {result.score} / {result.totalQuestions}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          result.percentage >= 80 ? "bg-green-500/10 text-green-400" :
                          result.percentage >= 50 ? "bg-yellow-500/10 text-yellow-400" :
                          "bg-red-500/10 text-red-400"
                        }`}>
                          {result.percentage}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-400">
                        {new Date(result.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default AptitudeHubPage;
