import React from "react";
import SignUpForm from "./components/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iniciar Sesión",
  description: "Inicia sesión para tener acceso a la aplicación",
};

export default function SignUp() {
  return (
    <div className="flex p-4 justify-center items-center md:h-[95vh] md:px-10 ;g:px-26">
      <div className="container h-[85vh] flex-col justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        {/* === Formulario de la izquierda === */}
        <div className="pt-10 lg:p-8 flex items-center md:h-[70vh]">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
            <SignUpForm />
          </div>
        </div>
        {/* == Imagen de la derecha == */}
        <div className="relative hidden h-full flex-col p-10 text-white lg:flex">
          <div className="bg-auth absolute inset-0"></div>
        </div>
      </div>
    </div>
  );
}
