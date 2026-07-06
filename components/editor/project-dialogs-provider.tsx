"use client"

import { createContext, useContext } from "react"

import { CreateProjectDialog } from "@/components/editor/create-project-dialog"
import { DeleteProjectDialog } from "@/components/editor/delete-project-dialog"
import { RenameProjectDialog } from "@/components/editor/rename-project-dialog"
import { useProjectDialogs } from "@/hooks/use-project-dialogs"
import type { Project } from "@/types/project"

interface ProjectDialogsContextValue {
  openCreate: () => void
  openRename: (project: Project) => void
  openDelete: (project: Project) => void
}

const ProjectDialogsContext = createContext<ProjectDialogsContextValue | null>(
  null
)

export function ProjectDialogsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const dialogs = useProjectDialogs()

  return (
    <ProjectDialogsContext.Provider
      value={{
        openCreate: dialogs.openCreate,
        openRename: dialogs.openRename,
        openDelete: dialogs.openDelete,
      }}
    >
      {children}

      <CreateProjectDialog
        open={dialogs.dialog?.type === "create"}
        name={dialogs.name}
        isLoading={dialogs.isLoading}
        onNameChange={dialogs.setName}
        onOpenChange={(open) => !open && dialogs.close()}
        onSubmit={dialogs.submitCreate}
      />

      <RenameProjectDialog
        open={dialogs.dialog?.type === "rename"}
        project={dialogs.dialog?.type === "rename" ? dialogs.dialog.project : null}
        name={dialogs.name}
        isLoading={dialogs.isLoading}
        onNameChange={dialogs.setName}
        onOpenChange={(open) => !open && dialogs.close()}
        onSubmit={dialogs.submitRename}
      />

      <DeleteProjectDialog
        open={dialogs.dialog?.type === "delete"}
        project={dialogs.dialog?.type === "delete" ? dialogs.dialog.project : null}
        isLoading={dialogs.isLoading}
        onOpenChange={(open) => !open && dialogs.close()}
        onConfirm={dialogs.submitDelete}
      />
    </ProjectDialogsContext.Provider>
  )
}

export function useProjectDialogsContext() {
  const context = useContext(ProjectDialogsContext)
  if (!context) {
    throw new Error(
      "useProjectDialogsContext must be used within a ProjectDialogsProvider"
    )
  }
  return context
}
