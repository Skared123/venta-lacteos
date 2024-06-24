import { Button } from "@/components/ui/button"
import {
     Dialog,
     DialogContent,
     DialogDescription,
     DialogFooter,
     DialogHeader,
     DialogTitle,
     DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Product } from "@/interfaces/products.interface"
import { db } from "@/lib/firebase"
import { deleteDoc, doc } from "firebase/firestore"
import { LoaderCircle, Trash2 } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"

export function ConfirmationDeleteModal({ product }: { product: Product }) {

     const [deleteModal, setDeleteModal] = useState(false)
     const [isLoading, setIsLoading] = useState(false)

     const deleteProduct = async () => {
          setIsLoading(true)
          try {
               await deleteDoc(doc(db, `products/${product.id}`));
               toast.success('Producto eliminado correctamente')
          } catch (error) {
               console.error(error)
          } finally {
               setIsLoading(false)
               setDeleteModal(false)
          }
     }

     return (
          <Dialog open={deleteModal} onOpenChange={setDeleteModal}  >
               <DialogTrigger asChild>
                    <Button variant={"destructive"}>
                         <Trash2 />
                    </Button>
               </DialogTrigger>
               <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                         <DialogTitle>Modal de confirmarción</DialogTitle>
                         <DialogDescription>
                              ¿Estás seguro de borrar el producto? Una vez borrado el producto no podrá ser recuperado.
                         </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                         <Button type="submit" onClick={() => deleteProduct()}>
                              {isLoading && (
                                   <LoaderCircle className="mr-2 h-4 w-4 animate-spin " />
                              )}
                              Confirmar
                         </Button>
                         <Button type="submit" variant={"secondary"}>Cancelar</Button>
                    </DialogFooter>
               </DialogContent>
          </Dialog>
     )
}
