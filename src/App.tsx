import { OperatingSystemRoot } from "@features/os/components/OperatingSystemRoot"

// Send a message to the parent window to update the title
window.parent.postMessage(
  {
    type: "nav_change",
    url: window.location.href,
    title: document.title,
  },
  "https://ronbodnar.com/",
)

function App() {
  return <OperatingSystemRoot />
}

export default App
