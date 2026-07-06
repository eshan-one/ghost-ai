"use client";

import { useId } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { slugify } from "@/lib/slug";

interface CreateProjectDialogProps {
  open: boolean;
  name: string;
  isLoading: boolean;
  onNameChange: (name: string) => void;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
}

export function CreateProjectDialog({
  open,
  name,
  isLoading,
  onNameChange,
  onOpenChange,
  onSubmit,
}: CreateProjectDialogProps) {
  const nameId = useId();
  const slug = slugify(name);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create project</DialogTitle>
          <DialogDescription>
            Start a new architecture workspace.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          <label
            htmlFor={nameId}
            className="text-sm font-medium text-text-primary"
          >
            Project name
          </label>
          <Input
            id={nameId}
            value={name}
            onChange={(event) => onNameChange(event.target.value)}
            placeholder="My project"
            autoFocus
            onKeyDown={(event) => {
              if (event.key === "Enter" && name.trim() && !isLoading) {
                onSubmit();
              }
            }}
          />
          <p className="text-xs text-text-muted">
            {slug ? slug : "your-project-slug"}
          </p>
        </div>

        <DialogFooter>
          <Button onClick={onSubmit} disabled={!name.trim() || isLoading}>
            Create project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
