import { FolderOpen, Plus, Users, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface ProjectSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function ProjectSidebar({ isOpen, onClose }: ProjectSidebarProps) {
  return (
    <aside
      aria-hidden={!isOpen}
      className={cn(
        "fixed top-14 left-0 z-40 flex h-[calc(100%-3.5rem)] w-80 flex-col border-r border-border-default bg-bg-elevated shadow-2xl transition-transform duration-200 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-border-default px-4">
        <h2 className="text-sm font-semibold text-text-primary">Projects</h2>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <X />
        </Button>
      </div>

      <Tabs defaultValue="my-projects" className="flex min-h-0 flex-1 flex-col gap-0 p-3">
        <TabsList className="w-full">
          <TabsTrigger value="my-projects" className="flex-1">
            My Projects
          </TabsTrigger>
          <TabsTrigger value="shared" className="flex-1">
            Shared
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="my-projects"
          className="flex flex-1 flex-col items-center justify-center gap-2 text-center"
        >
          <FolderOpen className="h-8 w-8 text-text-faint" />
          <p className="text-sm text-text-muted">No projects yet</p>
        </TabsContent>

        <TabsContent
          value="shared"
          className="flex flex-1 flex-col items-center justify-center gap-2 text-center"
        >
          <Users className="h-8 w-8 text-text-faint" />
          <p className="text-sm text-text-muted">No shared projects yet</p>
        </TabsContent>
      </Tabs>

      <div className="shrink-0 border-t border-border-default p-3">
        <Button className="w-full">
          <Plus />
          New Project
        </Button>
      </div>
    </aside>
  )
}
