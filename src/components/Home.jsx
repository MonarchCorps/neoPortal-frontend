import Header from './partials/Header/Header'
import Hero from './Hero/Hero'
import Offer from './Offers/Offer'
import Achievements from './Achievements/Achievements'
import Faq from './Faq/Faq'
import Solution from './Solution/Solution'
import CertificationBody from './CertificationBody/CertificationBody'
import Footer from './partials/Footer/Footer'

function Home() {
    return (
        <>
            <Header />
            <main>
                <Hero />
                <Offer />
                <Achievements />
                <Solution />
                <Faq />
                <CertificationBody />
            </main>
            <Footer />
        </>
    )
}

export default Home