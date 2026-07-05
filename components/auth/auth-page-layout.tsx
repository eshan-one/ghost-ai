import { FileText, Share2, Sparkles } from "lucide-react"

interface AuthPageLayoutProps {
  children: React.ReactNode
}

const FEATURES = [
  {
    icon: Sparkles,
    title: "AI Architecture Generation",
    description: "Describe your system, AI maps it to nodes and edges on a live canvas.",
  },
  {
    icon: Share2,
    title: "Real-time Collaboration",
    description: "Live cursors, presence indicators, and shared node editing across your team.",
  },
  {
    icon: FileText,
    title: "Instant Spec Generation",
    description: "Export a complete Markdown technical spec directly from the canvas graph.",
  },
]

export function AuthPageLayout({ children }: AuthPageLayoutProps) {
  return (
    <div className="flex min-h-screen bg-bg-base">
      <div className="hidden w-1/2 flex-col justify-center gap-10 border-r border-border-default bg-bg-surface px-16 lg:flex">
        <div className="flex items-center gap-2.5">
          <span className="size-6 rounded-md bg-accent-primary" aria-hidden />
          <span className="text-lg font-semibold text-text-primary">
            Ghost AI
          </span>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold leading-tight text-text-primary">
            Design systems at the speed of thought.
          </h1>
          <p className="max-w-md text-base text-text-secondary">
            Describe your architecture in plain English. Ghost AI maps it to
            a shared canvas your whole team can refine in real time.
          </p>
        </div>

        <ul className="flex flex-col gap-5">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <li key={title} className="flex items-start gap-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent-primary-dim text-accent-primary">
                <Icon className="size-4" />
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium text-text-primary">
                  {title}
                </span>
                <span className="text-sm text-text-muted">{description}</span>
              </div>
            </li>
          ))}
        </ul>

        <p className="text-xs text-text-faint">
          © {new Date().getFullYear()} Ghost AI. All rights reserved.
        </p>
      </div>

      <div className="flex flex-1 items-center justify-center px-6 py-12">
        {children}
      </div>
    </div>
  )
}
