import LeftHero from "./LeftHero"
import RightHero from "./RightHero"

function Hero() {

    return (
        <section>
            <div className="pt-36 flex items-center justify-between hrmd:h-screen hrmd:pt-32 min-h-[32rem] max-w-[88%] mx-auto gap-14">
                <LeftHero />
                <RightHero />
            </div>
        </section>
    )
}

export default Hero