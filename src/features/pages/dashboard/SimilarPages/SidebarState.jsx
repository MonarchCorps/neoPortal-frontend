/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'

import {
    Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubItem, SidebarSeparator,
    SidebarTrigger,
} from '@/components/ui/sidebar'
import { ChevronDown } from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

import usePathAfterSlash from '@/hooks/usePathAfterSlash'
import useScrollTop from '@/hooks/useScrollTop'

import { Fragment } from 'react';
import AsideBottomNav from '@/components/AsideBottomNav'

function SidebarState({ navLinks, extraLinks, excludedIndices, comparePath }) {

    const { scrollTop } = useScrollTop();
    const pathAfterSlash = usePathAfterSlash(-1);

    const isActiveFunc = (path) => {
        const splitPath = path?.split('/')
        const newPath = splitPath && splitPath[splitPath?.length - 1]

        const isAdminPath = pathAfterSlash === comparePath && path === '';
        const isExactPath = pathAfterSlash === newPath;
        return {
            isActive: isAdminPath || isExactPath
        }
    }

    const getActiveStyles = (path) => {
        if (isActiveFunc(path).isActive) {
            return {
                backgroundColor: '#c13a3a',
                color: '#eee',
                fontWeight: '700'
            };
        }
        return {}
    }

    return (
        <Fragment>
            <SidebarTrigger className=" fixed top-0" />
            <Sidebar className='bg-slate-50 z-[800] h-full'>
                <SidebarHeader className='grid grid-cols-[1fr,auto] p-0 mb-3'>
                    <Link
                        to='/'
                        onClick={scrollTop}
                        className='font-500 font-mon text-2xl bg-transparent select-none text-nowrap grid grid-cols-2'
                    >
                        <span className='bg-red-900 p-2 text-[#fff] flex items-center'>Exam</span><span className='bg-[#fff] p-2 text-slate-900 flex items-center'> Portal</span>
                    </Link>
                    <div className='grid items-center justify-end'>
                        <SidebarTrigger className="z-[1000]" />
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {navLinks.map((link, index) => (
                                    excludedIndices.includes(index + 1) ? (
                                        <SidebarMenuItem key={link.id}>
                                            <SidebarMenuButton asChild isActive={isActiveFunc(link.path).isActive} style={getActiveStyles(link.path)} >
                                                <Link to={link.path} className='flex font-poppins' onClick={scrollTop}>
                                                    <span className='w-fit'>
                                                        {link?.icon}
                                                    </span>
                                                    <span>{link.text}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ) : (
                                        <Collapsible
                                            key={link.id}
                                            className='group/collapsible'
                                            defaultOpen={true}
                                        >
                                            <SidebarMenuItem>
                                                <CollapsibleTrigger asChild>
                                                    <SidebarMenuButton asChild>
                                                        <div className='flex font-poppins justify-between cursor-pointer'>
                                                            <span>{link.text}</span>
                                                            <ChevronDown className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180' />
                                                        </div>
                                                    </SidebarMenuButton>
                                                </CollapsibleTrigger>
                                                <CollapsibleContent>
                                                    <SidebarMenuSub>
                                                        <SidebarMenuSubItem>
                                                            {
                                                                link?.children.map(childLink => (
                                                                    <SidebarMenuButton key={childLink.id} asChild isActive={isActiveFunc(link.path).isActive} style={getActiveStyles(childLink.path)} >
                                                                        <Link to={childLink.path} className='flex font-poppins' onClick={scrollTop}>
                                                                            <span className='w-fit'>
                                                                                {childLink.icon}
                                                                            </span>
                                                                            <span>{childLink.text}</span>
                                                                        </Link>
                                                                    </SidebarMenuButton>
                                                                ))
                                                            }
                                                        </SidebarMenuSubItem>
                                                    </SidebarMenuSub>
                                                </CollapsibleContent>
                                            </SidebarMenuItem>
                                        </Collapsible>
                                    )
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                    <SidebarSeparator className='bg-slate-200' />
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {extraLinks.map(link => (
                                    <SidebarMenuItem key={link.id}>
                                        <SidebarMenuButton asChild>
                                            <Link to={link.path} className='flex'>
                                                <span>{link.icon}</span>
                                                <span>{link.text}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <AsideBottomNav />
            </Sidebar>
        </Fragment>
    )
}

export default SidebarState