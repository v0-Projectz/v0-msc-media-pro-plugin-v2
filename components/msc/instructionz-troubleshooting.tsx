"use client"

import { useState } from "react"
import { Copy, Check, ExternalLink, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

const apiKeyGuide = {
  title: "Finding Your Bunny.net API Key",
  location: "BUNNY.NET",
  steps: [
    "Log in to your BUNNY.NET dashboard.",
    "Click your Profile Icon in the top-right corner and select Account Settings.",
    "On the left sidebar, click API Key.",
    "Copy the \"Account API Key\" and paste it into the Presto Player settings in WordPress.",
  ],
}

const issues = [
  {
    id: "issue-1",
    title: "VIDEO DOESN'T POP UP",
    solution: "Clear the Divi Cache.",
    detail: "Go to Divi > Theme Options > Builder > Advanced and click Clear Static CSS File Generation.",
  },
  {
    id: "issue-2",
    title: "SPINNING WHEEL OR \"VIDEO NOT FOUND\"",
    solution: "The ID Audit.",
    detail: "Verify the MSC Presto ID matches the Video ID inside Bunny.net exactly. If the ID is wrong, the \"Vault\" won't open.",
  },
  {
    id: "issue-3",
    title: "MEDIA HUB IS EMPTY",
    solution: "The Handshake Check.",
    detail: "Verify Bunny.net API Key in Presto Player Settings. If you changed your Bunny password, update the key.",
  },
  {
    id: "issue-4",
    title: "LIGHTBOX NOT TRIGGERING",
    solution: "Script Conflict Resolution.",
    detail: "Disable any third-party popup or lightbox plugins. MSC Media Pro's Custom Lightbox requires exclusive control of the overlay layer.",
  },
  {
    id: "issue-5",
    title: "SLOW VIDEO LOAD TIMES",
    solution: "CDN Cache Purge.",
    detail: "Go to your Bunny.net dashboard > Pull Zone > Purge Cache. Then run Reset Engine & Purge Cache from the MSC Media Pro dashboard.",
  },
]

const quickFixSnippets = [
  {
    title: "How to add a Button Shadow?",
    code: `.et_pb_button {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.et_pb_button:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  transform: translateY(-2px);
}`,
  },
  {
    title: "Force Video Container Aspect Ratio",
    code: `.msc-video-wrapper {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;
  overflow: hidden;
}

.msc-video-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}`,
  },
]

export function InstructionzTroubleshooting() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  function handleCopy(text: string, id: string) {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">
          Troubleshooting
        </h2>
        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
          Check these common solutions before reaching out for support.
        </p>
      </div>

      {/* API Key Guide Card */}
      <div className="rounded-lg border border-border bg-card p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-5 w-1 rounded-full bg-accent" />
          <h3 className="text-sm font-bold text-card-foreground">
            {apiKeyGuide.title}
          </h3>
        </div>
        <div className="rounded-md border border-border bg-secondary p-4">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-accent">
            The Location:
          </p>
          <p className="text-sm text-card-foreground leading-relaxed">
            Log in to your{" "}
            <a href="https://bunny.net" target="_blank" rel="noopener noreferrer" className="font-bold text-accent hover:underline">
              {apiKeyGuide.location}
            </a>{" "}
            dashboard.
          </p>
          <ol className="mt-3 flex flex-col gap-2">
            {apiKeyGuide.steps.slice(1).map((step, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-card-foreground leading-relaxed">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-muted text-[9px] font-sans text-muted-foreground">
                  {i + 2}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Common Technical Fixes Header */}
      <div className="flex items-center gap-2">
        <div className="h-5 w-1 rounded-full bg-accent" />
        <h3 className="text-sm font-bold text-card-foreground">
          Common Technical Fixes
        </h3>
      </div>

      {/* Issue Cards */}
      <div className="flex flex-col gap-3">
        {issues.map((issue) => (
          <div
            key={issue.id}
            className="rounded-lg border border-border bg-card p-5 transition-all hover:border-accent/30"
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <div className="flex-1">
                <p className="text-xs font-bold uppercase tracking-widest text-accent">
                  {issue.title}
                </p>
                <p className="mt-2 text-sm text-card-foreground leading-relaxed">
                  <span className="font-bold">{"The Solution: "}{issue.solution}</span>{" "}
                  {issue.detail}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Fixes Code Snippets */}
      <div>
        <h3 className="mb-3 text-sm font-bold text-card-foreground uppercase tracking-wider">
          Quick Fixes
        </h3>
        {quickFixSnippets.map((snippet) => (
          <div key={snippet.title} className="rounded-lg border border-border bg-card overflow-hidden">
            <div className="flex items-center justify-between border-b border-border bg-secondary px-4 py-2.5">
              <p className="text-sm font-medium text-card-foreground">
                {snippet.title}
              </p>
              <button
                onClick={() => handleCopy(snippet.code, snippet.title)}
                className="flex items-center gap-1.5 rounded-md border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary transition-colors hover:bg-primary/20"
              >
                {copiedId === snippet.title ? (
                  <>
                    <Check className="h-3 w-3" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    Copy Code
                  </>
                )}
              </button>
            </div>
            <div className="p-4">
              <pre className="overflow-x-auto text-xs font-mono text-accent leading-relaxed">
                <code>{snippet.code}</code>
              </pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
