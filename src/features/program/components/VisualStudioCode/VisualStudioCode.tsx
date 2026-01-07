import { memo } from "react"

export interface VisualStudioCodeProps {
  githubRepoUrl: string
}

export const VisualStudioCode = memo(function VisualStudioCode({
  githubRepoUrl,
}: VisualStudioCodeProps) {
  return (
    <iframe
      src={githubRepoUrl?.replace("github.com", "github1s.com")}
      title="Visual Studio Code"
      width="100%"
      height="100%"
    />
  )
})

export default VisualStudioCode
