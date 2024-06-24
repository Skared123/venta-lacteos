import Header from "../components/Header"
import SideBar from "../components/SideBar"

export default function DasboardLayout({ children }: { children: React.ReactNode }) {
  return (
      <div className="flex">
        <SideBar />
        <div className="w-full">
          {children}
        </div>
      </div>
  )
}
