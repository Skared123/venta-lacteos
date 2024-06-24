import { fileTobase64 } from "@/actions/convert-file-to-base64"
import DragAndDropImage from "@/app/components/DragAndDropImage"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
     Sheet,
     SheetContent,
     SheetTrigger,
} from "@/components/ui/sheet"
import useUser from "@/hooks/useUser"
import { ItemImage } from "@/interfaces/products.interface"
import { addDocument, setDocument, uploadBase64 } from "@/lib/firebase"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderCircle } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as z from 'zod'


export default function ProductsForm() {

     const [isLoading, setIsLoading] = useState<boolean>(false)
     const [modal, setModal] = useState<boolean>()
     const user = useUser()

     /* === FORM  === */
     const formSchema = z.object({
          productImage: z.object({
               path: z.string().min(1, {
                    message: 'Este campo es requerido'
               }),
               url: z.string().min(1, {
                    message: 'Este campo es requerido'
               }),
          }),
          productName: z.string().min(1, {
               message: 'Este campo es requerido'
          }),
          price: z.coerce.number().gte(1, "El valor minimo tiene que ser 1")
     })

     const form = useForm<z.infer<typeof formSchema>>({
          resolver: zodResolver(formSchema),
          defaultValues: {
               productImage: {} as ItemImage,
               productName: '',
               price: undefined
          }
     })

     const { register, handleSubmit, formState, setValue } = form
     const { errors } = formState

     const handleImage = (url: string) => {
          let path = `${user?.uid}/${Date.now()}`;
          setValue('productImage', { url, path })
     }

     const createProductInDB = async (item: any) => {
          setIsLoading(true)
          let path = 'products'
          try {
               const base64 = item.productImage.url
               const imagePath = item.productImage.path
               const imageUrl = await uploadBase64(imagePath, base64)

               item.productImage.url = imageUrl

               console.log(item)

               await addDocument(path,item)
               toast.success("El producto ha sido creado exitosamente")
          } catch (error : any) {
               toast.error(error)
          } finally {
               setIsLoading(false)
               setModal(false)
               form.reset()
          }

     }

     /* ==== Submit === */
     const onSubmit = async (item: z.infer<typeof formSchema>) => {
          await createProductInDB(item)
     }
     return (
          <Sheet open={modal} onOpenChange={setModal}>
               <SheetTrigger asChild>
                    <Button>Agregar un Producto</Button>
               </SheetTrigger>
               <SheetContent className="sm:max-w-[425px]">
                    <>
                         <div className='text-center'>
                              <h1 className='text-2xl font-semibold'>
                                   Crear un producto
                              </h1>
                              <p className='text-sm text-muted-foreground'>
                                   Completa los siguientes campos para agregarlo a la lista de productos
                              </p>
                         </div>

                         <form onSubmit={handleSubmit(onSubmit)}>
                              <div className='grid gap-2'>
                                   {/* Product Image */}
                                   <div className='mb-3'>
                                        <Label htmlFor='productName' className='text-left'>Imagen del Producto: </Label>
                                        <DragAndDropImage handleImage={handleImage} />
                                   </div>
                                   <p className='form-error'>{errors.productName?.message}</p>

                                   {/* Product Name */}
                                   <div className='mb-3'>
                                        <Label htmlFor='productName' className='text-left'>Nombre del Producto: </Label>
                                        <Input
                                             {...register('productName')}
                                             id="productName"
                                             placeholder='Queso'
                                             type='text'
                                        />
                                        <p className='form-error'>{errors.productName?.message}</p>
                                   </div>
                                   {/* Price */}
                                   <div className='mb-3'>
                                        <Label htmlFor='price' className='text-left'>Precio: </Label>
                                        <Input
                                             {...register('price')}
                                             id="price"
                                             placeholder='100'
                                             type='number'
                                        />
                                        <p className='form-error'>{errors.price?.message}</p>
                                   </div>

                                   {/* ===Submit button */}
                                   <Button
                                        type='submit'
                                        disabled={isLoading}
                                   >
                                        {isLoading && <LoaderCircle className='mr-2 h-4 w-4 animate-spin ' />}
                                        Crear Producto
                                   </Button>
                              </div>
                         </form>
                    </>
               </SheetContent>
          </Sheet>
     )
}
