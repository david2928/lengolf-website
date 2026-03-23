import { MessageCircle, Mail, Phone } from 'lucide-react'

interface MultiChannelContactProps {
  lineLabel: string
  emailLabel: string
  phoneLabel: string
  languageNote: string | null
  lineHandle: string
  email: string
  phone: string
  lineUrl: string
}

export default function MultiChannelContact({
  lineLabel,
  emailLabel,
  phoneLabel,
  languageNote,
  lineHandle,
  email,
  phone,
  lineUrl,
}: MultiChannelContactProps) {
  return (
    <div className="flex flex-col gap-3">
      <a
        href={lineUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 rounded-lg border border-border/60 bg-white px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-muted/30"
      >
        <MessageCircle size={18} style={{ color: '#00B900' }} />
        <span>{lineLabel}</span>
        <span className="ml-auto text-muted-foreground">{lineHandle}</span>
      </a>
      <a
        href={`mailto:${email}`}
        className="flex items-center gap-3 rounded-lg border border-border/60 bg-white px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-muted/30"
      >
        <Mail size={18} className="text-primary" />
        <span>{emailLabel}</span>
        <span className="ml-auto text-muted-foreground">{email}</span>
      </a>
      <a
        href={`tel:${phone}`}
        className="flex items-center gap-3 rounded-lg border border-border/60 bg-white px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-muted/30"
      >
        <Phone size={18} className="text-primary" />
        <span>{phoneLabel}</span>
        <span className="ml-auto text-muted-foreground">{phone}</span>
      </a>
      {languageNote && (
        <p className="rounded-lg bg-primary/5 px-4 py-2.5 text-sm text-primary font-medium text-center">
          {languageNote}
        </p>
      )}
    </div>
  )
}
