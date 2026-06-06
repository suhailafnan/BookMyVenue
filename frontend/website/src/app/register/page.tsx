import RegisterForm from "@/features/auth/components/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-[#F7F3EE] flex flex-col items-center justify-center p-6">
      <h1 className="mb-8 text-3xl font-bold text-[#1E120A]">
        BookMyVenue
      </h1>

      <RegisterForm />
    </main>
  );
}