import useTitle from '@/hooks/useTitle'
import Header from './partials/Header/Header'
import { useNavigate } from 'react-router-dom';
import Footer from './partials/Footer/Footer';

function Unauthorized() {

    useTitle('Unauthorized');
    const navigate = useNavigate()

    return (
        <div className='flex flex-col min-h-screen'>
            <Header />
            <main className='flex-1 h-full'>
                <section className='h-full pt-20'>
                    <div className="flex flex-col items-center justify-center h-full pt-44 space-y-4 text-center csm:px-6">
                        <div className="space-y-2">
                            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-6xl csm:text-4xl">Unauthorized</h1>
                            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed dark:text-gray-400 csm:text-base/relaxed">
                                You do not have access to this page, please go home
                            </p>
                        </div>
                        <div
                            className="cursor-pointer inline-flex h-10 items-center rounded-md border border-gray-200 bg-white shadow-sm px-8 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                            onClick={() => navigate('/')}
                        >
                            Go Home
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}

export default Unauthorized