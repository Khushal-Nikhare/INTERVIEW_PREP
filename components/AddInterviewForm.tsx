"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { addInterview } from "@/lib/actions/interview.action";

interface AddInterviewFormProps {
  userId: string;
}

const AddInterviewForm = ({ userId }: AddInterviewFormProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    role: "",
    level: "junior",
    type: "technical",
    techstack: "",
    questions: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const techstackArray = formData.techstack
        .split(",")
        .map((tech) => tech.trim())
        .filter((tech) => tech.length > 0);

      const questionsArray = formData.questions
        .split("\n")
        .map((q) => q.trim())
        .filter((q) => q.length > 0);

      if (questionsArray.length === 0) {
        alert("Please add at least one question");
        setIsSubmitting(false);
        return;
      }

      const result = await addInterview({
        userId,
        role: formData.role,
        level: formData.level,
        type: formData.type,
        techstack: techstackArray,
        questions: questionsArray,
      });

      if (result.success) {
        router.push("/");
        router.refresh();
      } else {
        alert("Failed to create interview. Please try again.");
      }
    } catch (error) {
      console.error("Error creating interview:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-2xl">
      <div className="flex flex-col gap-2">
        <Label htmlFor="role">Job Role *</Label>
        <Input
          id="role"
          type="text"
          placeholder="e.g., Frontend Developer, Data Scientist"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="level">Experience Level *</Label>
        <Select
          value={formData.level}
          onValueChange={(value) => setFormData({ ...formData, level: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="junior">Junior</SelectItem>
            <SelectItem value="mid">Mid-Level</SelectItem>
            <SelectItem value="senior">Senior</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="type">Interview Type *</Label>
        <Select
          value={formData.type}
          onValueChange={(value) => setFormData({ ...formData, type: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="technical">Technical</SelectItem>
            <SelectItem value="behavioral">Behavioral</SelectItem>
            <SelectItem value="mixed">Mixed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="techstack">Tech Stack</Label>
        <Input
          id="techstack"
          type="text"
          placeholder="e.g., React, Node.js, TypeScript (comma-separated)"
          value={formData.techstack}
          onChange={(e) =>
            setFormData({ ...formData, techstack: e.target.value })
          }
        />
        <p className="text-sm text-gray-500">
          Separate multiple technologies with commas
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="questions">Interview Questions *</Label>
        <Textarea
          id="questions"
          placeholder="Enter one question per line&#10;Example:&#10;Tell me about your experience with React&#10;How do you handle state management?&#10;Explain the concept of closures in JavaScript"
          value={formData.questions}
          onChange={(e) =>
            setFormData({ ...formData, questions: e.target.value })
          }
          rows={10}
          required
          className="font-mono text-sm"
        />
        <p className="text-sm text-gray-500">Enter one question per line</p>
      </div>

      <div className="flex gap-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary"
        >
          {isSubmitting ? "Creating..." : "Create Interview"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/")}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default AddInterviewForm;
