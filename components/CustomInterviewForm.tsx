"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createCustomInterview } from "@/lib/actions/interview.action";
import { Loader2, Plus, Trash2 } from "lucide-react";

const customInterviewSchema = z.object({
  role: z.string().min(2, "Role must be at least 2 characters"),
  type: z.enum(["Technical", "Behavioral", "Mixed"]),
  level: z.enum(["Junior", "Mid", "Senior"]),
  techstack: z.string().min(2, "Add at least one technology"),
  questions: z
    .array(z.string().min(5, "Question must be at least 5 characters"))
    .min(1, "Add at least one question")
    .max(20, "Maximum 20 questions allowed"),
});

type CustomInterviewFormData = z.infer<typeof customInterviewSchema>;

interface CustomInterviewFormProps {
  userId: string;
  userName: string;
}

const CustomInterviewForm = ({ userId, userName }: CustomInterviewFormProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [questions, setQuestions] = useState<string[]>([""]);
  const [currentQuestion, setCurrentQuestion] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CustomInterviewFormData>({
    resolver: zodResolver(customInterviewSchema),
    defaultValues: {
      type: "Technical",
      level: "Junior",
    },
  });

  const addQuestion = () => {
    if (currentQuestion.trim() && questions.length < 20) {
      const newQuestions = [...questions.filter((q) => q.trim()), currentQuestion.trim()];
      setQuestions(newQuestions);
      setValue("questions", newQuestions);
      setCurrentQuestion("");
    }
  };

  const removeQuestion = (index: number) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
    setValue("questions", newQuestions);
  };

  const onSubmit = async (data: CustomInterviewFormData) => {
    setIsSubmitting(true);
    try {
      const result = await createCustomInterview({
        ...data,
        userId,
        questions: questions.filter((q) => q.trim()),
      });

      if (result.success && result.interviewId) {
        toast.success("Custom interview created successfully!");
        router.push(`/interview/${result.interviewId}`);
      } else {
        toast.error(result.error || "Failed to create interview");
      }
    } catch (error) {
      console.error("Error creating interview:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      {/* Role Input */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="role">Job Role</Label>
        <Input
          id="role"
          placeholder="e.g., Frontend Developer, Data Scientist"
          {...register("role")}
          className="input"
        />
        {errors.role && (
          <p className="text-red-500 text-sm">{errors.role.message}</p>
        )}
      </div>

      {/* Type Selection */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="type">Interview Type</Label>
        <select
          id="type"
          {...register("type")}
          className="input"
        >
          <option value="Technical">Technical</option>
          <option value="Behavioral">Behavioral</option>
          <option value="Mixed">Mixed</option>
        </select>
        {errors.type && (
          <p className="text-red-500 text-sm">{errors.type.message}</p>
        )}
      </div>

      {/* Level Selection */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="level">Experience Level</Label>
        <select
          id="level"
          {...register("level")}
          className="input"
        >
          <option value="Junior">Junior</option>
          <option value="Mid">Mid</option>
          <option value="Senior">Senior</option>
        </select>
        {errors.level && (
          <p className="text-red-500 text-sm">{errors.level.message}</p>
        )}
      </div>

      {/* Tech Stack Input */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="techstack">Tech Stack (comma-separated)</Label>
        <Input
          id="techstack"
          placeholder="e.g., React, Node.js, TypeScript, MongoDB"
          {...register("techstack")}
          className="input"
        />
        {errors.techstack && (
          <p className="text-red-500 text-sm">{errors.techstack.message}</p>
        )}
      </div>

      {/* Questions Section */}
      <div className="flex flex-col gap-4">
        <Label>Interview Questions</Label>

        {/* Existing Questions List */}
        {questions.filter((q) => q.trim()).length > 0 && (
          <div className="flex flex-col gap-2">
            {questions.map((question, index) => {
              if (!question.trim()) return null;
              return (
                <div
                  key={index}
                  className="flex items-start gap-2 p-3 bg-dark-200 rounded-lg"
                >
                  <span className="text-sm text-muted-foreground min-w-[20px]">
                    {index + 1}.
                  </span>
                  <p className="flex-1 text-sm">{question}</p>
                  <button
                    type="button"
                    onClick={() => removeQuestion(index)}
                    className="text-red-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Add Question Input */}
        <div className="flex gap-2">
          <Input
            placeholder="Enter your question..."
            value={currentQuestion}
            onChange={(e) => setCurrentQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addQuestion();
              }
            }}
            className="input flex-1"
          />
          <Button
            type="button"
            onClick={addQuestion}
            disabled={!currentQuestion.trim() || questions.length >= 20}
            className="btn-primary"
          >
            <Plus size={20} />
          </Button>
        </div>

        {errors.questions && (
          <p className="text-red-500 text-sm">{errors.questions.message}</p>
        )}

        <p className="text-sm text-muted-foreground">
          {questions.filter((q) => q.trim()).length}/20 questions added
        </p>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting || questions.filter((q) => q.trim()).length === 0}
        className="btn-primary w-full"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin mr-2" size={20} />
            Creating Interview...
          </>
        ) : (
          "Create Custom Interview"
        )}
      </Button>
    </form>
  );
};

export default CustomInterviewForm;
