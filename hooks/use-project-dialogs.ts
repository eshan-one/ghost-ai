"use client"

import { useState } from "react"

import type { Project } from "@/types/project"

type ProjectDialogState =
  | { type: "create" }
  | { type: "rename"; project: Project }
  | { type: "delete"; project: Project }
  | null

export function useProjectDialogs() {
  const [dialog, setDialog] = useState<ProjectDialogState>(null)
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const close = () => {
    setDialog(null)
    setName("")
    setIsLoading(false)
  }

  const openCreate = () => {
    setName("")
    setDialog({ type: "create" })
  }

  const openRename = (project: Project) => {
    setName(project.name)
    setDialog({ type: "rename", project })
  }

  const openDelete = (project: Project) => {
    setDialog({ type: "delete", project })
  }

  const mockSubmit = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 400))
    close()
  }

  return {
    dialog,
    name,
    setName,
    isLoading,
    openCreate,
    openRename,
    openDelete,
    close,
    submitCreate: mockSubmit,
    submitRename: mockSubmit,
    submitDelete: mockSubmit,
  }
}
