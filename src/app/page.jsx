import HomePage from "@/components/homepage/HomePage";
import AuthProvider from "@/components/context/AuthProvider";

export default function App() {
  return (
    <div className="w-screen bg-white flex items-center justify-center">
      <AuthProvider>
        <HomePage />
      </AuthProvider>
    </div>
  );
}
