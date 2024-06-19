"use client";
import { Button } from "@/components/ui/button";
import { signOutUser } from "@/lib/firebase";
import { Metadata } from "next";

export default function Dashboard() {
  return (
    <div>
      <Button onClick={() => signOutUser()}>Cerrar Sesión</Button>
    </div>
  );
}
