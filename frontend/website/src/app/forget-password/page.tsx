import ForgotPasswordForm from "@/features/auth/components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen bg-[#F7F3EE] flex flex-col items-center justify-center p-6">

      {/* BookMyVenue Logo/Title */}
      <h1 className="mb-8 text-3xl font-bold text-[#1E120A]">
        BookMyVenue
      </h1>

      {/* Form Card */}
      <ForgotPasswordForm />

    </main>
  );
}