import { SidebarProvider } from '@/components/ui/sidebar'
import { Outlet } from 'react-router-dom'
import SideBar from './Sidebar'

function SchoolDashboard() {
    return (
        <main>
            <SidebarProvider className="grid grid-cols-[auto_1fr] md:grid-cols-1">
                <SideBar />
                <Outlet />
            </SidebarProvider>
        </main>
    )
}

export default SchoolDashboard