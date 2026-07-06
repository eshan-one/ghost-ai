import type { Project } from "@/types/project"

export const mockOwnedProjects: Project[] = [
  { id: "1", name: "Checkout Redesign", slug: "checkout-redesign", role: "owner" },
  { id: "2", name: "Internal Analytics", slug: "internal-analytics", role: "owner" },
]

export const mockSharedProjects: Project[] = [
  { id: "3", name: "Marketing Site", slug: "marketing-site", role: "collaborator" },
]
