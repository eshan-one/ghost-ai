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
import type { Project } from "@/types/project";

interface RenameProjectDialogProps {
  open: boolean;
  project: Project | null;
  name: string;
  isLoading: boolean;
  onNameChange: (name: string) => void;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
}

export function RenameProjectDialog({
  open,
  project,
  name,
  isLoading,
  onNameChange,
  onOpenChange,
  onSubmit,
}: RenameProjectDialogProps) {
  const nameId = useId();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename project</DialogTitle>
          <DialogDescription>
            Renaming &ldquo;{project?.name}&rdquo;.
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
            autoFocus
            onKeyDown={(event) => {
              if (event.key === "Enter" && name.trim() && !isLoading) {
                onSubmit();
              }
            }}
          />
        </div>

        <DialogFooter>
          <Button onClick={onSubmit} disabled={!name.trim() || isLoading}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
