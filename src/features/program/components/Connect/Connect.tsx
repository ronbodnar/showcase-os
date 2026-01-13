import Icon from "@shared/components/Icon"
import { IconName } from "@features/theme/types"
import { ContactForm } from "./ContactForm"

export default function Connect() {
  return (
    <div className="flex flex-col h-full">
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col @2xl:flex-row items-start @2xl:items-center justify-between gap-6">
          <div>
            <h2 className="text-lg font-semibold text-text">Let's Connect</h2>
            <p className="text-sm text-muted">
              Always happy to chat about interesting roles or technical challenges.
            </p>
          </div>

            <div className="flex items-center gap-2 text-xs text-muted">
              <span className="w-2 h-2 bg-green-600 rounded-full" />
              Currently exploring new senior-level roles
            </div>
          </div>

        <div className="grid grid-cols-1 @2xl:grid-cols-2 gap-6">
          <div className="bg-window border border-border shadow-2xl shadow-black/40 rounded order-2 @2xl:order-1">
            <div className="p-4 space-y-4">
              <h3 className="text-xs uppercase tracking-wide font-semibold text-text">
                Send a Message
              </div>
              <div className="p-4">
                <ContactForm />
              </div>
            </div>

            <div className="space-y-4 order-1 @2xl:order-2">
              <IdentityPanel />
              <QuickLinks />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function IdentityPanel() {
  return (
    <div className="bg-window border border-border rounded p-4 space-y-4">
      <div>
        <h3 className="text-xs uppercase tracking-wide font-semibold text-text">About Me</h3>
      </div>

      <div className="space-y-3 text-sm">
        <Row icon="Mail">
          <a
            href="mailto:ron.bodnar@outlook.com"
            className="hover:text-accent transition-colors underline decoration-border underline-offset-4"
          >
            ron.bodnar@outlook.com
          </a>
        </Row>

        <Row icon="MapPin">Based in Whittier, CA</Row>

        <Row icon="Settings">Over a decade of experience solving complex problems with code.</Row>
      </div>
    </div>
  )
}

function Row({ icon, children }: { icon: IconName; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 text-text">
      <Icon name={icon} className="size-4 mt-0.5 shrink-0" />
      <span>{children}</span>
    </div>
  )
}

function QuickLinks() {
  const links = [
    { href: "https://linkedin.com/in/ronbodnar", icon: "LinkedIn", label: "LinkedIn" },
    { href: "https://github.com/ronbodnar", icon: "GitHub", label: "GitHub" },
  ]

  return (
    <div className="bg-window border border-border rounded p-4 space-y-5">
      <h3 className="text-xs uppercase tracking-wide font-semibold text-text">Find me elsewhere</h3>

      <div className="flex gap-3">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            title={link.label}
            className="relative w-12 h-12 flex items-center justify-center bg-surface hover:bg-surface-hover border border-border rounded transition-all hover:border-accent group"
          >
            <Icon
              name={link.icon as IconName}
              className="w-8 h-8 text-text group-hover:text-accent transition-colors"
            />
            <Icon
              name="OpenInNew"
              className="absolute -top-2 -right-2 w-4 h-4 text-text opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </a>
        ))}
      </div>
    </div>
  )
}
