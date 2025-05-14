import RegisterForm from "@/components/auth/register-form";
import { Wallet } from "lucide-react";
import Link from "next/link";
import FeatureSplineComponent from "@/components/feature-spline-component";

export default function RegisterPage() {
  return (
    <div className="min-h-screen py-12 pt-0">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-center mb-8">
          <Link href="/" className="flex items-center space-x-2">
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 flex justify-center items-center">
            <RegisterForm />
          </div>
          <div className="flex-1 auth-feature-section feature-section relative overflow-visible hidden lg:block">
            <FeatureSplineComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
