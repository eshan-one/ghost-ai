"use client"

import { Pencil, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { Project } from "@/types/project"

interface ProjectListItemProps {
  project: Project
  onRename: (project: Project) => void
  onDelete: (project: Project) => void
}

export function ProjectListItem({
  project,
  onRename,
  onDelete,
}: ProjectListItemProps) {
  return (
    <div className="group flex items-center justify-between gap-2 rounded-xl px-2 py-1.5 hover:bg-bg-subtle">
      <span className="truncate text-sm text-text-primary">{project.name}</span>

      {project.role === "owner" && (
        <div className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onRename(project)}
            aria-label={`Rename ${project.name}`}
          >
            <Pencil />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onDelete(project)}
            aria-label={`Delete ${project.name}`}
          >
            <Trash2 />
          </Button>
        </div>
      )}
    </div>
  )
}
