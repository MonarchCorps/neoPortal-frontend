import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { IoMenu } from 'react-icons/io5'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Link } from "react-router-dom"
import useScrollTop from "@/hooks/useScrollTop"
import { useEffect, useState } from "react"

function MenuDropdown() {
	const { scrollTop } = useScrollTop();

	const [isMobile, setIsMobile] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const checkMobile = () => {
		if (window.innerWidth <= 768) {
			setIsMobile(true);
		} else {
			setIsMobile(false);
		}
	};

	useEffect(() => {
		checkMobile();
		const resizeListener = () => {
			checkMobile();
		};

		window.addEventListener('resize', resizeListener, { passive: false });

		return () => {
			window.removeEventListener('resize', resizeListener);
		};
	}, []);

	const handleClick = (e) => {
		if (isMobile) {
			setIsOpen(!isOpen);
			e.stopPropagation();
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button type="button" className="hidden chsm:block">
					<IoMenu className="text-[#dad9d9] text-3xl w-full" />
				</button>
			</DropdownMenuTrigger>

			<DropdownMenuContent className="w-64 ml-6 rounded-none">
				<DropdownMenuItem asChild>
					<Link to="/home" className="font-500 font-sans text-[#151414] tracking-wide w-full cursor-pointer">
						<span>Home</span>
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link to="/about" className="font-500 font-sans text-[#151414] tracking-wide w-full cursor-pointer">
						<span>About</span>
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link to="/contact" className="font-500 font-sans text-[#151414] tracking-wide w-full cursor-pointer">
						<span>Contact</span>
					</Link>
				</DropdownMenuItem>

				<DropdownMenuItem>
					<HoverCard openDelay={20} closeDelay={20}>
						<HoverCardTrigger asChild onClick={handleClick}>
							<a href="#" className="font-500 font-sans text-[#151414] tracking-wide w-full cursor-pointer">
								<span>Classroom</span>
							</a>
						</HoverCardTrigger>

						{/* The HoverCardContent will be visible on hover for desktop, or when toggled for mobile */}
						{(isMobile ? isOpen : true) && (
							<HoverCardContent className="rounded-none absolute -left-20 top-[3px] shadow-sm p-0">
								<Link
									to="/classroom"
									className="px-2 text-red-600 text-sm font-karla cursor-pointer font-400 hover:bg-[#f2f2f2] py-2 grid grid-flow-col justify-start items-center gap-3 select-none"
									onClick={scrollTop}
								>
									<span className="font-sans">Study now</span>
								</Link>
								<Link
									to="/cbt-practice/live-exam"
									className="px-2 text-red-600 text-sm font-karla cursor-pointer font-400 hover:bg-[#f2f2f2] py-2 grid grid-flow-col justify-start items-center gap-3 select-none"
									onClick={scrollTop}
								>
									<span className="font-sans">Live exam</span>
								</Link>
								<Link
									to="/cbt-practice"
									className="px-2 text-red-600 text-sm font-karla cursor-pointer font-400 hover:bg-[#f2f2f2] py-2 grid grid-flow-col justify-start items-center gap-3 select-none"
									onClick={scrollTop}
								>
									<span className="font-sans">Practice exam</span>
								</Link>
							</HoverCardContent>
						)}
					</HoverCard>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default MenuDropdown