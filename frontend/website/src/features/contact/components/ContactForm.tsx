"use client";

import { FormEvent, useState } from "react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitted(false);
  };

  const validate = () => {
    const nextErrors: Partial<FormState> = {};

    if (!form.name.trim()) nextErrors.name = "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email";
    }
    if (!/^[0-9+\-\s()]{7,}$/.test(form.phone)) {
      nextErrors.phone = "Enter a valid phone number";
    }
    if (!form.subject.trim()) nextErrors.subject = "Subject is required";
    if (form.message.trim().length < 20) {
      nextErrors.message = "Message must be at least 20 characters";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) return;

    setSubmitted(true);
    setForm(initialState);
  };

  const inputClass =
    "mt-2 h-12 w-full rounded-md border border-[#C8B49A] bg-white px-4 text-sm outline-none transition focus:border-[#C8481A] focus:ring-2 focus:ring-[#C8481A]/15";

  return (
    <form onSubmit={submitForm} className="rounded-lg border border-[#C8B49A]/70 bg-[#FDFAF6] p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" error={errors.name}>
          <input
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            className={inputClass}
            placeholder="Your name"
          />
        </Field>

        <Field label="Email" error={errors.email}>
          <input
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            className={inputClass}
            placeholder="you@example.com"
          />
        </Field>

        <Field label="Phone" error={errors.phone}>
          <input
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            className={inputClass}
            placeholder="+91 98765 43210"
          />
        </Field>

        <Field label="Subject" error={errors.subject}>
          <input
            value={form.subject}
            onChange={(event) => updateField("subject", event.target.value)}
            className={inputClass}
            placeholder="Venue booking enquiry"
          />
        </Field>
      </div>

      <Field label="Message" error={errors.message} className="mt-5">
        <textarea
          value={form.message}
          onChange={(event) => updateField("message", event.target.value)}
          className="mt-2 min-h-36 w-full rounded-md border border-[#C8B49A] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#C8481A] focus:ring-2 focus:ring-[#C8481A]/15"
          placeholder="Tell us about your date, guest count, budget, and preferred city."
        />
      </Field>

      {submitted && (
        <p className="mt-4 rounded-md border border-[#3A5088]/20 bg-white px-4 py-3 text-sm font-medium text-[#1C2860]">
          Thanks. Your enquiry is ready for backend submission.
        </p>
      )}

      <button
        type="submit"
        className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-md bg-[#C8481A] px-6 text-sm font-bold text-white transition hover:bg-[#8A5C10] sm:w-auto"
      >
        Send Message
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  className = "",
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`block text-sm font-semibold text-[#1E120A] ${className}`}>
      {label}
      {children}
      {error && <span className="mt-1 block text-xs text-[#C8481A]">{error}</span>}
    </label>
  );
}
