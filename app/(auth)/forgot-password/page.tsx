import React from "react";
import { Metadata } from "next";
import RecoverPasswordForm from "./components/RecoverPasswordForm";

export const metadata: Metadata = {
  title: "Olvidaste tu contraseña?",
  description: "We will send you an email so you can recover your password",
};

export default function ForgotPassword() {
  return (
    <div className="pt-10 lg:p-8 flex items-center md:h-[70vh]">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
        <RecoverPasswordForm />
      </div>
    </div>
  );
}
