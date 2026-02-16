import AddInterviewForm from "@/components/AddInterviewForm";
import { getCurrentUser } from "@/lib/actions/auth.action";
import React from "react";

const Page = async () => {
  const user = await getCurrentUser();
  
  return (
    <div className="flex flex-col gap-6">
      <h2>Add New Interview</h2>
      <p className="text-gray-600">Create a custom interview to share with others</p>
      <AddInterviewForm userId={user?.id!} />
    </div>
  );
};

export default Page;
