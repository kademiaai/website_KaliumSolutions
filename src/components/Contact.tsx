import React, { useState } from 'react';
import { ArrowRightIcon, CheckIcon, EnvelopeSimpleIcon, ShieldCheckIcon } from '@phosphor-icons/react';
import { CONTACT_EMAIL, CONTROLLER_OPTIONS, DEMO_AGENDA } from '../content';
import { Container, Eyebrow, Reveal, primaryButton } from './ui';

type Fields = { name: string; email: string; company: string; controllers: string; notes: string };
type Errors = Partial<Record<keyof Fields, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = 'Enter your name.';
  if (!f.email.trim()) e.email = 'Enter your work email.';
  else if (!EMAIL_RE.test(f.email.trim())) e.email = 'This email address is not valid. Check for typos, for example name@company.com.';
  if (!f.company.trim()) e.company = 'Enter your company and plant.';
  return e;
}

const inputBase =
  'w-full rounded-lg border bg-canvas px-3 py-2 body-6 text-fg placeholder:text-fg-faint transition-colors ' +
  'hover:border-line-strong focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

const Field: React.FC<{
  id: keyof Fields;
  label: string;
  error?: string;
  optional?: boolean;
  children: (props: { id: string; 'aria-invalid': boolean; 'aria-describedby'?: string; className: string }) => React.ReactNode;
}> = ({ id, label, error, optional, children }) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={id} className="title-4 text-fg">
      {label} {optional && <span className="caption-5 text-fg-faint">optional</span>}
    </label>
    {children({
      id,
      'aria-invalid': !!error,
      'aria-describedby': error ? `${id}-error` : undefined,
      className: `${inputBase} ${error ? 'border-critical' : 'border-line'}`,
    })}
    {error && (
      <p id={`${id}-error`} className="caption-2 text-critical">
        {error}
      </p>
    )}
  </div>
);

export const Contact: React.FC = () => {
  const [fields, setFields] = useState<Fields>({
    name: '',
    email: '',
    company: '',
    controllers: CONTROLLER_OPTIONS[0],
    notes: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const set = (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFields((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  // No form backend yet: the request opens in the visitor's email app, addressed to the engineering desk.
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(fields);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(first)?.focus();
      return;
    }
    const subject = `Technical demo request: ${fields.company}`;
    const body = [
      `Name: ${fields.name}`,
      `Work email: ${fields.email}`,
      `Company and plant: ${fields.company}`,
      `Controllers: ${fields.controllers}`,
      '',
      fields.notes || '(no notes)',
    ].join('\n');
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-24">
      <Container>
        <Reveal>
          <div className="grid gap-12 rounded-2xl border border-line bg-panel p-6 sm:p-12 lg:grid-cols-2">
            <div className="flex flex-col gap-6">
              <Eyebrow>Book a technical demo</Eyebrow>
              <h2 id="contact-heading" className="heading-4 sm:heading-3 text-fg">
                Show us one line. We will show you its data.
              </h2>
              <p className="body-3 text-fg-muted">
                Tell us which line and controllers you want to start with. We reply by email to arrange a session with
                an engineer.
              </p>
              <div className="flex flex-col gap-3">
                <p className="title-4 text-fg">In the demo</p>
                <ul className="flex flex-col gap-3">
                  {DEMO_AGENDA.map((item) => (
                    <li key={item} className="flex items-start gap-2 body-6 text-fg-muted">
                      <CheckIcon size={16} weight="bold" className="mt-0.5 shrink-0 text-ok" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto flex flex-col gap-2 border-t border-line pt-6">
                <p className="flex items-center gap-2 caption-2 text-fg-muted">
                  <ShieldCheckIcon size={16} className="shrink-0 text-ok" aria-hidden="true" />
                  NDA signed before any plant data is shared.
                </p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="flex w-fit items-center gap-2 rounded-md caption-2 text-fg-muted transition-colors hover:text-fg"
                >
                  <EnvelopeSimpleIcon size={16} className="shrink-0" aria-hidden="true" />
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>

            {sent ? (
              <div className="flex flex-col justify-center gap-4 rounded-xl border border-line bg-canvas p-6" role="status">
                <CheckIcon size={24} weight="bold" className="text-ok" aria-hidden="true" />
                <h3 className="heading-6 text-fg">Your request is ready in your email app</h3>
                <p className="body-6 text-fg-muted">
                  Send the drafted email to {CONTACT_EMAIL} to complete the request. If your email app did not open, write
                  to that address directly and include your controllers and the line you want to start with.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="w-fit rounded-md button-sm text-accent transition-colors hover:text-accent-hover"
                >
                  Edit the request
                </button>
              </div>
            ) : (
              <form noValidate onSubmit={onSubmit} className="flex flex-col gap-4" aria-label="Technical demo request">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id="name" label="Name" error={errors.name}>
                    {(p) => <input {...p} type="text" autoComplete="name" value={fields.name} onChange={set('name')} />}
                  </Field>
                  <Field id="email" label="Work email" error={errors.email}>
                    {(p) => (
                      <input
                        {...p}
                        type="email"
                        autoComplete="email"
                        placeholder="name@company.com"
                        value={fields.email}
                        onChange={set('email')}
                      />
                    )}
                  </Field>
                </div>
                <Field id="company" label="Company and plant" error={errors.company}>
                  {(p) => (
                    <input
                      {...p}
                      type="text"
                      autoComplete="organization"
                      placeholder="Company, plant location"
                      value={fields.company}
                      onChange={set('company')}
                    />
                  )}
                </Field>
                <Field id="controllers" label="Main controllers on the line">
                  {(p) => (
                    <select {...p} value={fields.controllers} onChange={set('controllers')}>
                      {CONTROLLER_OPTIONS.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  )}
                </Field>
                <Field id="notes" label="What should we look at first" optional>
                  {(p) => (
                    <textarea
                      {...p}
                      rows={4}
                      placeholder="For example: OEE per shift on line 3, energy per batch on the dryer, and early warning on the palletizer gearbox."
                      value={fields.notes}
                      onChange={set('notes')}
                    />
                  )}
                </Field>
                <div className="flex flex-col items-start gap-3 pt-2">
                  <button type="submit" className={`${primaryButton} group`}>
                    Book a technical demo
                    <ArrowRightIcon
                      size={16}
                      weight="bold"
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </button>
                  <p className="caption-5 text-fg-faint">Opens your email app with the request filled in.</p>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
};
