import CustomInterviewForm from "@/components/CustomInterviewForm";
import { getCurrentUser } from "@/lib/actions/auth.action";
import React from "react";

const CreateCustomInterviewPage = async () => {
  const user = await getCurrentUser();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2>Create Your Own Interview</h2>
        <p className="text-muted-foreground">
          Customize your interview experience by creating your own questions and
          settings
        </p>
      </div>

      <CustomInterviewForm userId={user?.id!} userName={user?.name!} />
    </div>
  );
};

export default CreateCustomInterviewPage;
