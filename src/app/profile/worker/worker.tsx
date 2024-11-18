"use client";

import { WorkerProfileView } from "./WorkerProfile";
import { WorkerProfile } from "./EditWorkerProfile";
// import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function WorkerProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              {isEditing ? "Edit Profile" : "Worker Profile"}
            </h1>
            <p className="text-muted-foreground">
              {isEditing
                ? "Update your work profile and payment details"
                : "View your work profile and payment details"}
            </p>
          </div>
          <div className="flex items-center gap-4">
            {/* <ModeToggle /> */}
            <Link href="/login">
              <Button variant="outline" size="icon">
                <LogOut className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {isEditing ? (
          <WorkerProfile onCancel={() => setIsEditing(false)} />
        ) : (
          <WorkerProfileView onEdit={() => setIsEditing(true)} />
        )}
      </div>
    </main>
  );
}