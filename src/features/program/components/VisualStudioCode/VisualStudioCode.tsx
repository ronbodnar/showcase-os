import { memo } from "react"

export interface VisualStudioCodeProps {
  githubRepoUrl: string
}

/**
 * Renders a Visual Studio Code instance of a GitHub repository in an iframe.
 * Component powered by github1s.
 * @see https://github.com/conwnet/github1s
 */
export const VisualStudioCode = memo(function VisualStudioCode({
  githubRepoUrl,
}: VisualStudioCodeProps) {
  return (
    <iframe
      src={githubRepoUrl?.replace("github.com", "github1s.com")}
      sandbox="allow-scripts allow-same-origin allow-forms"
      title="Visual Studio Code"
      width="100%"
      height="100%"
    />
  )
})

export default VisualStudioCode
