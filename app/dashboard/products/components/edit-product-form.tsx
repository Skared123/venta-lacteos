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
import { ItemImage, Product } from "@/interfaces/products.interface"
import { updateDocument, uploadBase64 } from "@/lib/firebase"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderCircle, SquarePen } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as z from 'zod'


export default function EditProductForm({ product }: { product: Product }) {

     const [isLoading, setIsLoading] = useState<boolean>(false)
     const [modal, setModal] = useState<boolean>()
     const [image, setImage] = useState(product.productImage.url)
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
               productImage: product.productImage as ItemImage,
               productName: product.productName,
               price: product.price
          }
     })

     const { register, handleSubmit, formState, setValue } = form
     const { errors } = formState

     const handleImage = (url: string) => {
          console.log(url)
          let path = product ? product.productImage.path : `${user?.uid}/${Date.now()}`
          setValue('productImage', { url, path })
          setImage(url)
     }

     const updateProduct = async (item: any) => {
          setIsLoading(true)
          let path = `products/${product.id}`
          try {
               const base64 = item.productImage.url
               const imagePath = item.productImage.path
               const imageUrl = await uploadBase64(imagePath, base64)

               item.productImage.url = imageUrl

               console.log(item)

               await updateDocument(path, item)
               toast.success("El producto ha sido actualizado exitosamente")
          } catch (error: any) {
               toast.error(error)
          } finally {
               setIsLoading(false)
               setModal(false)
               form.reset()
          }

     }

     /* ==== Submit === */
     const onSubmit = async (item: z.infer<typeof formSchema>) => {
          await updateProduct(item)
     }
     return (
          <Sheet open={modal} onOpenChange={setModal}>
               <SheetTrigger asChild>
                    <Button>
                         <SquarePen />
                    </Button>
               </SheetTrigger>
               <SheetContent className="sm:max-w-[425px]">
                    <>
                         <div className='text-center'>
                              <h1 className='text-2xl font-semibold'>
                                   Editar un producto
                              </h1>
                              <p className='text-sm text-muted-foreground'>
                                   Completa los siguientes campos para modificarlo de la lista de productos
                              </p>
                         </div>

                         <form onSubmit={handleSubmit(onSubmit)}>
                              <div className='grid gap-2'>
                                   {/* Product Image */}
                                   <div className='mb-3'>
                                        <Label htmlFor='productName' className='text-left'>Imagen del Producto: </Label>
                                        {image ? (     
                                             <div className="text-center">
                                                  <img
                                                       src={image}
                                                       className="mx-auto rounded-lg h-[200px] w-[200px]"
                                                       alt="Imagen del producto"
                                                  />
                                                  <Button
                                                       onClick={() => handleImage('')}
                                                       disabled={isLoading}
                                                       className="mt-6 mx-auto"
                                                  >
                                                       Remover Imagen
                                                  </Button>
                                             </div>
                                        ) : (
                                             <>
                                                  <DragAndDropImage handleImage={handleImage} />
                                             </>
                                        )}
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
                                        Actualizar Producto
                                   </Button>
                              </div>
                         </form>
                    </>
               </SheetContent>
          </Sheet>
     )
}
