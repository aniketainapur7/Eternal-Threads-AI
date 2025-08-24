import React from 'react'
import { SidebarDemo } from '../components/ui/SidebarDemo';
import { Outlet } from "react-router-dom";
import { FloatingNavDemo } from '../components/ui/FloatingNavDemo';

function Mainlayout() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-100 dark:bg-neutral-900">
      
      {/* Sidebar */}
      <SidebarDemo />

      {/* Main content area */}
      <div className="flex flex-col flex-1 relative overflow-y-auto">
        
        {/* Floating Navigation */}
        <div className="absolute top-4 left-0 right-0 z-50">
          <FloatingNavDemo />
        </div>

        {/* Page content */}
        <div className=""> {/* mt-16 gives space for floating nav */}
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Mainlayout