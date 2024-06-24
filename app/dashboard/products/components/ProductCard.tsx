import { Product } from "@/interfaces/products.interface";
import EditProductForm from "./edit-product-form";
import { ConfirmationDeleteModal } from "./ConfirmationDeleteModal";

export function ProductCard({ product }: { product: Product }) {


  return (
    <div className="flex space-x-3 border rounded-lg p-4 hover:cursor-pointer h-[120px] justify-between mt-2 mx-2">
      <div className="flex space-x-2">

        <img src={product.productImage.url} className="w-[80px] h-[80px] rounded-2xl" />
        <div className="flex flex-col">
          <span className="font-medium">{product.productName}</span>
          <span className="text-muted-foreground">$ {product.price}</span>
        </div>
      </div>
      <div className="flex space-x-2">
        <EditProductForm product={product} />
        <ConfirmationDeleteModal product={product} />
      </div>
    </div>
  )
}