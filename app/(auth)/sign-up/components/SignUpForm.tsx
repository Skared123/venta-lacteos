"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React, { useState } from "react";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUser, setDocument, updateUser } from "@/lib/firebase";
import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";
import { User } from "@/interfaces/user";

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);

  /* === FORM  === */
  const formSchema = z.object({
    uid: z.string(),
    name: z.string().min(4, {
      message: "El campo del nombre debe de tener al menos 4 caracteres",
    }),
    email: z
      .string()
      .email(
        "El formato de email no es valido. Un ejemplo valido seria Correo@correo.com"
      )
      .min(1, {
        message: "Este campo es requerido",
      }),
    password: z.string().min(6, {
      message: "La contraseña debe de tener al menos 6 caracteres",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      uid: "",
      name: "",
      email: "",
      password: "",
    },
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  /* ==== Sign Up === */
  const onSubmit = async (user: z.infer<typeof formSchema>) => {
    console.log(user);
    setIsLoading(true);
    try {
      let res = await createUser(user);
      await updateUser({ displayName: user.name });
      user.uid = res.user.uid;
      await createUserInDb(user as User);
    } catch (error: any) {
      toast.error(error.message, { duration: 2500 });
    } finally {
      setIsLoading(false);
    }
  };

  const createUserInDb = async (user: User) => {
    let path = `users/${user.uid}`;
    setIsLoading(true);
    try {
      delete user.password;
      await setDocument(path, user);
      toast.success(`Bienvenido ${user.name} !!`);
    } catch (error: any) {
      toast.error(error.message, { duration: 2500 });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Crea una cuenta</h1>
        <p className="text-sm text-muted-foreground">
          Registrate para tener acceso a nuestra plataforma
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          {/* Name */}
          <div className="mb-3">
            <Label htmlFor="name" className="text-left">
              Nombre:{" "}
            </Label>
            <Input
              {...register("name")}
              id="name"
              placeholder="Norma Aguilar"
              type="name"
            />
            <p className="form-error">{errors.name?.message}</p>
          </div>
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
          {/* PASSWORD */}
          <div className="mb-3">
            <Label htmlFor="password" className="text-left">
              Contraseña:{" "}
            </Label>
            <Input
              {...register("password")}
              id="password"
              placeholder="*******"
              type="password"
            />
            <p className="form-error">{errors.password?.message}</p>
          </div>

          {/* ===Submit button */}
          <Button type="submit" disabled={isLoading}>
            {isLoading && (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin " />
            )}
            Registrar
          </Button>
        </div>
      </form>
      <p className="text-center text-sm text-muted-foreground">
        Ya tienes cuenta?
        <Link
          href={"/"}
          className="underline underline-offset-4 hover:text-primary"
        >
          {" "}
          Inicia Sesión
        </Link>
      </p>
    </>
  );
}
