"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import React, { useState } from 'react'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from '@/lib/firebase'

export default function SignInForm() {

  const [isLoading, setIsLoading] = useState(false)

  /* === FORM  === */
  const formSchema = z.object({
    email: z.string().email('El formato de email no es valido. Un ejemplo valido seria Correo@correo.com').min(1,{
      message:'Este campo es requerido'
    }),
    password: z.string().min(6,{
      message:'La contraseña debe de tener al menos 6 caracteres'
    })
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const { register, handleSubmit, formState } = form
  const { errors } = formState

  /* ==== Sign In === */
  const onSubmit = async (user: z.infer<typeof formSchema>) => {
    try {
      let res = await signIn(user)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <>
      <div className='text-center'>
        <h1 className='text-2xl font-semibold'>
          Inicia sesión
        </h1>
        <p className='text-sm text-muted-foreground'>
          Ingresa tu correo y tu contraseña para iniciar sesión
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid gap-2'>
          {/* Email */}
          <div className='mb-3'>
            <Label htmlFor='email' className='text-left'>Correo: </Label>
            <Input
            {...register('email')}
              id="email"
              placeholder='correo@correo.com'
              type='email'
              autoComplete='email'
            />
            <p className='form-error'>{errors.email?.message}</p>
          </div>
          {/* PASSWORD */}
          <div className='mb-3'>
            <Label htmlFor='password' className='text-left'>Contraseña: </Label>
            <Input
            {...register('password')}
              id="password"
              placeholder='*******'
              type='password'
            />
            <p className='form-error'>{errors.password?.message}</p>
          </div>


          <Link
            href={'/forgot-password'}
            className='underline text-muted-foreground underline-offset-4 hover:text-primary mb-6 text-sm text-end'
          >Olvidaste tu contraseña?</Link>



          {/* ===Submit button */}
          <Button
          type='submit'
          >Ingresar</Button>
        </div>
      </form>
      <p className='text-center text-sm text-muted-foreground'>
        Aún no tienes una cuenta?
      <Link
            href={'/sign-up'}
            className='underline underline-offset-4 hover:text-primary'
          > Regístrate</Link>
        </p>
    </>
  )
}

