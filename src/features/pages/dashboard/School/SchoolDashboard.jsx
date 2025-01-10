import { SidebarProvider } from '@/components/ui/sidebar'
import { Outlet } from 'react-router-dom'
import SideBar from './SideBar'

function SchoolDashboard() {
    return (
        <main>
            <SidebarProvider className="grid grid-cols-[auto_1fr] ">
                <SideBar />
                <Outlet />
            </SidebarProvider>
        </main>
    )
}

export default SchoolDashboard