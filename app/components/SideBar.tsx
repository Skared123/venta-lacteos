"use client"
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AiOutlineProduct } from "react-icons/ai";


export default function SideBar() {

  const router = useRouter();
  const pathname = usePathname()

  return (
    <div className='flex flex-col w-[300px] h-[100vh] p-5 border-r-2'>
      <ul className="w-[90%]">
        <Link href="/dashboard/products" className="flex items-center space-x-1 hover:cursor-pointer p-2 font-medium hover:bg-slate-200 rounded-xl"><AiOutlineProduct /> Productos</Link>
        <Link href="/dashboard/sales-point" className="flex items-center space-x-1 hover:cursor-pointer p-2 font-medium hover:bg-slate-200 rounded-xl">Punto de venta</Link>
        <Link href="/dashboard/sales-history" className="flex items-center space-x-1 hover:cursor-pointer p-2 font-medium hover:bg-slate-200 rounded-xl">Historial de ventas</Link>
      </ul>
    </div>
  )
}
