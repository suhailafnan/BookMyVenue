import LoginForm from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#F7F3EE] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <h1 className="text-center text-3xl font-bold text-[#1E120A] mb-6">
          BookMyVenue
        </h1>

        <LoginForm />
      </div>
    </main>
  );
}