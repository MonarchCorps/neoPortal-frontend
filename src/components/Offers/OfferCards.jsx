import useGetScreenWidth from '@/hooks/useGetScreenWidth'
import { AutoMarkSvg, CollectSvg, EmpowerSvg, PdfSvg, ProtectionSvg } from './svgs'

function OfferCards() {

	const cards = [
		{ id: 1, title: 'Create Exams Instantly', desc: 'by uploading an existing exam as PDF', svg: <PdfSvg /> },
		{ id: 2, title: 'Empower every student', desc: `by customizing exams to each student's individual needs`, svg: <EmpowerSvg /> },
		{ id: 3, title: 'Prevent cheating', desc: 'with our secure browser lockdown mode', svg: <ProtectionSvg /> },
		{ id: 4, title: 'Collect the exams your way.', desc: 'Stand alone or through an LMS without handwritten attachments.', svg: <CollectSvg /> },
		{ id: 5, title: 'Auto-mark your exams', desc: 'based on the rules you’ve set up or choose to mark manually', svg: <AutoMarkSvg /> }
	]

	const { screenWidth } = useGetScreenWidth()

	return (
		<>
			<div className="grid grid-cols-3 cimd:grid-cols-2 ixsm:grid-cols-1 my-5 place-content-center gap-8">
				{cards.slice(0, `${screenWidth <= 730 ? 4 : 3}`).map((card) => {
					return (
						<div
							key={card.id}
							className={`grid grid-flow-row grid-rows-2 place-items-center h-44 shadow p-4 rounded-md transition-all transform hover:scale-110`}
						>
							{card.svg}
							<p className='text-sm/relaxed max-w-[95%] mx-auto font-sans umd:text-[0.76rem] text-center'>
								<span>
									<strong>{card.title} </strong>
								</span>
								<span>{card.desc}</span>
							</p>
						</div>
					)
				})}
			</div>
			<div className='grid grid-flow-col max-w-[75%] ixsm:max-w-full mb-5 mx-auto items-center gap-8'>
				{cards.slice(`${screenWidth <= 730 ? -1 : -2}`).map(card => {
					return (
						<div
							key={card.id}
							className={`grid grid-flow-row grid-rows-2 place-items-center h-44 shadow p-4 rounded-md transition-all transform hover:scale-110`}
						>
							{card.svg}
							<p className='text-sm/relaxed max-w-[95%] mx-auto font-sans umd:text-[0.76rem] text-center'>
								<span>
									<strong>{card.title} </strong>
								</span>
								<span>{card.desc}</span>
							</p>
						</div>
					)
				})}
			</div>
		</>
	)
}

export default OfferCards