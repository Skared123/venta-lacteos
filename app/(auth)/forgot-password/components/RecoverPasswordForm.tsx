"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React, { useState } from "react";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendResetEmail, signIn } from "@/lib/firebase";
import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function RecoverPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  /* === FORM  === */
  const formSchema = z.object({
    email: z
      .string()
      .email(
        "El formato de email no es valido. Un ejemplo valido seria Correo@correo.com"
      )
      .min(1, {
        message: "Este campo es requerido",
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  /* ==== Sign In === */
  const onSubmit = async (user: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    await sendResetEmail(user.email);
    toast.success("El email se ha enviado exitosamente");
    router.push("/");
    try {
    } catch (error: any) {
      toast.error(error.message, { duration: 2500 });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="md:border border-solid border-gray-300 rounded-xl p-10">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Recuperar Contraseña</h1>
        <p className="text-sm text-muted-foreground">
          Se te enviará un correo para recuperar tu cuenta
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          {/* Email */}
          <div className="mb-3">
            <Label htmlFor="email" className="text-left">
              Correo:{" "}
            </Label>
            <Input
              {...register("email")}
              id="email"
              placeholder="correo@correo.com"
              type="email"
              autoComplete="email"
            />
            <p className="form-error">{errors.email?.message}</p>
          </div>

          {/* ===Submit button */}
          <Button type="submit" disabled={isLoading}>
            {isLoading && (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin " />
            )}
            Recuperar
          </Button>
        </div>
      </form>
      <p className="text-center text-sm text-muted-foreground mt-3">
        <Link
          href={"/"}
          className="underline underline-offset-4 hover:text-primary"
        >
          {"<- Atrás"}
        </Link>
      </p>
    </div>
  );
}
