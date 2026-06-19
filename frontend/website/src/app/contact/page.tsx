import ContactForm from "@/features/contact/components/ContactForm";

const faqs = [
  ["How quickly do you respond?", "Most venue enquiries receive a response within one business day."],
  ["Can I shortlist multiple venues?", "Yes. Share your city, date, capacity, and budget and we will help compare options."],
  ["Do prices include catering?", "Each venue defines pricing differently. We clarify inclusions during the enquiry process."],
];

export default function ContactPage() {
  return (
    <main>
      <section className="bg-[#1E120A] px-4 py-16 text-white sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#C8B49A]">
            Contact
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Tell us what you are planning.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-[#F7F3EE] sm:text-lg">
            Share your date, guest count, city, and budget. We will help you
            move from enquiry to shortlist with less back-and-forth.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8 lg:py-20">
        <aside className="space-y-4">
          <InfoCard title="Email" text="support@bookmyvenue.com" />
          <InfoCard title="Phone" text="+91 98765 43210" />
          <InfoCard title="Hours" text="Mon to Sat, 9:30 AM to 7:00 PM" />
          <div className="min-h-72 rounded-lg border border-[#C8B49A] bg-[#FDFAF6] p-6">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#A07020]">
              Map
            </p>
            <div className="mt-5 flex min-h-48 items-center justify-center rounded-md bg-white text-center text-sm text-[#7A6050]">
              Google Map placeholder
              <br />
              Bangalore, India
            </div>
          </div>
        </aside>

        <ContactForm />
      </section>

      <section className="bg-[#FDFAF6] py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#A07020]">
            FAQ
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[#1E120A]">
            Common questions
          </h2>
          <div className="mt-8 space-y-4">
            {faqs.map(([question, answer]) => (
              <details key={question} className="rounded-lg border border-[#C8B49A] bg-white p-5">
                <summary className="cursor-pointer font-bold text-[#1E120A]">
                  {question}
                </summary>
                <p className="mt-3 text-sm leading-6 text-[#7A6050]">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function InfoCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-lg border border-[#C8B49A] bg-white p-5 shadow-sm">
      <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-[#A07020]">
        {title}
      </h2>
      <p className="mt-2 font-semibold text-[#1E120A]">{text}</p>
    </div>
  );
}
