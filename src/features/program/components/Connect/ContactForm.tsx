import { config } from "@config/config"
import { FormEvent, useForm } from "@formspree/react"
import { Button } from "@shared/components/Button"
import Icon from "@shared/components/Icon"
import { useState } from "react"

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
}

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData)
  const [errors, setErrors] = useState<Partial<ContactFormData>>({})
  const [formState, handleFormspreeSubmit, reset] = useForm(config.formspreeKey)

  function validateForm() {
    const newErrors: Partial<ContactFormData> = {}

    if (!formData.name.trim()) newErrors.name = "Required"
    if (!formData.email.trim()) newErrors.email = "Required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email"
    if (!formData.subject.trim()) newErrors.subject = "Required"
    if (!formData.message.trim()) newErrors.message = "Required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (!validateForm()) return

    await handleFormspreeSubmit(e)

    if (formState.succeeded) {
      setFormData(initialFormData)
      setErrors({})
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  if (formState.succeeded) {
    return (
      <div className="flex flex-col items-center justify-center bg-window border border-border rounded p-12 text-center">
        <div className="w-12 h-12 bg-text/90 rounded-full flex items-center justify-center mb-3">
          <Icon name="MailSendSuccess" className="w-6 h-6 text-green-600" />
        </div>
        <h3 className="text-base font-semibold text-text mb-1">Message sent</h3>
        <p className="text-sm text-muted">
          Thank you! I’ll review your message and respond promptly.
        </p>
      </div>
    )
  }

  if (Object.keys(formState.errors?.getFormErrors() || {}).length > 0) {
    return (
      <div className="flex flex-col items-center justify-center bg-window border border-border rounded p-10 text-center space-y-6">
        <div className="w-12 h-12 bg-text/90 rounded-full flex items-center justify-center">
          <Icon name="Mail" className="w-6 h-6 text-danger" />
        </div>
        <h3 className="text-base font-semibold text-text mb-1">Failed to send</h3>
        <p className="text-sm text-muted">
          Oops! Something went wrong. Please try again later or check your inputs.
        </p>

        <Button
          type="button"
          color="accent"
          className="px-6 py-1 rounded-sm text-stone-200"
          onClick={() => reset()}
        >
          Back to form
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 @md:grid-cols-2 gap-4">
        <FormInput
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="Your name"
        />
        <FormInput
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="your@email.com"
        />
      </div>

      <FormInput
        label="Subject"
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        error={errors.subject}
        placeholder="Role, project, or just to say hello"
      />

      <FormInput
        label="Message"
        name="message"
        value={formData.message}
        onChange={handleChange}
        error={errors.message}
        placeholder="Briefly describe your project, question, or collaboration idea"
        textarea
        rows={6}
      />

      <div className="flex justify-end">
        <Button
          type="submit"
          color="accent"
          disabled={formState.submitting || formData.name.trim() === ""}
          className="px-6 py-1 rounded-sm text-stone-200"
        >
          {formState.submitting ? "Sending..." : "Send Message"}
        </Button>
      </div>
    </form>
  )
}

interface FormInputProps {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  error?: string
  type?: string
  textarea?: boolean
  placeholder?: string
  rows?: number
}

function FormInput({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  textarea = false,
  placeholder,
  rows = 6,
}: FormInputProps) {
  const baseClass = `w-full px-3 py-2 text-sm rounded bg-surface text-text border focus:outline-none focus:ring-1 focus:ring-accent transition-colors ${
    error ? "border-danger" : "border-border"
  }`

  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-text uppercase tracking-wide" htmlFor={name}>
        {label}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          rows={rows}
          placeholder={placeholder}
          className={baseClass + " resize-none"}
        />
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={baseClass}
        />
      )}
      {error && <span className="text-xs text-danger">{error}</span>}
    </div>
  )
}
