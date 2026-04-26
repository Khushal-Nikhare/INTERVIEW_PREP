import InterviewCard from "@/components/InterviewCard";
import { Button } from "@/components/ui/button";
import { dummyInterviews } from "@/constants";
import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewsByUserId,
  getLatestInterviews,
  getAptitudeResultsByUser,
} from "@/lib/actions/interview.action";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = async () => {
  const user = await getCurrentUser();
  const userId = user?.id;

  const [userInterviews, allInterview, aptitudeResults] = await Promise.all([
    getInterviewsByUserId(userId ?? ""),
    getLatestInterviews({ userId: userId ?? "" }),
    userId ? getAptitudeResultsByUser(userId) : Promise.resolve([]),
  ]);

  const hasPastInterviews = userInterviews?.length! > 0;
  const hasUpcomingInterviews = allInterview?.length! > 0;

  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
          <p className="text-lg">
            Practice real interview questions & get instant feedback
          </p>

          <div className="flex flex-wrap gap-4">
            <Button asChild className="btn-primary flex-1 min-w-[200px]">
              <Link href="/interview">Start an Interview</Link>
            </Button>
            <Button asChild variant="outline" className="flex-1 min-w-[200px]">
              <Link href="/aptitude">Take Aptitude Test</Link>
            </Button>
            <Button asChild variant="outline" className="flex-1 min-w-[200px]">
              <Link href="/interview/create">Create Custom Interview</Link>
            </Button>
          </div>
        </div>

        <Image
          src="/robot.png"
          alt="robo-dude"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>
        <div className="interviews-section">
          {hasPastInterviews ? (
            userInterviews?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <p>You haven&apos;t taken any interviews yet</p>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Take Interviews</h2>
        <div className="interviews-section">
          {hasUpcomingInterviews ? (
            allInterview?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <p>There are no interviews available</p>
          )}
        </div>
      </section>

      {aptitudeResults && aptitudeResults.length > 0 && (
        <section className="flex flex-col gap-6 mt-8">
          <h2>Your Aptitude Tests</h2>
          <div className="bg-dark-200 border border-dark-300 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-dark-300 text-gray-400">
                  <tr>
                    <th className="px-6 py-4 font-medium">Category</th>
                    <th className="px-6 py-4 font-medium">Score</th>
                    <th className="px-6 py-4 font-medium">Percentage</th>
                    <th className="px-6 py-4 font-medium">Date</th>
                    <th className="px-6 py-4 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-300">
                  {aptitudeResults.slice(0, 5).map((result) => (
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
                      <td className="px-6 py-4">
                        <Link href={`/aptitude/${result.category}/result?resultId=${result.id}`} className="text-primary-100 hover:text-primary-200 font-medium">
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {aptitudeResults.length > 5 && (
              <div className="p-4 border-t border-dark-300 text-center">
                <Link href="/aptitude" className="text-sm text-gray-400 hover:text-white transition-colors">
                  View All Tests →
                </Link>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default Page;
