import React from "react";
import SignInForm from "../components/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iniciar Sesión",
  description: "Inicia sesión para tener acceso a la aplicación",
};

export default function index() {
  return (
    <div className="flex p-4 justify-center items-center md:h-[95vh] md:px-10 ;g:px-26">
      <div className="container h-[85vh] flex-col justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        {/* ===Imagen de la izquierda === */}
        <div className="relative hidden h-full  flex-col p-10 text-white lg:flex">
          <div className="bg-auth absolute inset-0"></div>
        </div>
        {/* ==formulario de la derecha== */}
        <div className="pt-10 lg:p-8 flex items-center md:h-[70vh]">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
            <SignInForm />
          </div>
        </div>
      </div>
    </div>
  );
}
