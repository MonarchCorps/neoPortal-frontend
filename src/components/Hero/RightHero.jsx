import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/swiper-bundle.css'

// const heroImg1 = 'https://res.cloudinary.com/dh5a8opoe/image/upload/q_auto/f_auto/v1735378104/Exam_Portal/b67xpysoalro17rta9um.jpg'
const heroImg1 = 'https://res.cloudinary.com/dh5a8opoe/image/upload/f_auto,q_auto/v1/Exam_Portal/dhefpqcmwzrum1mcinag'
const heroImg2 = 'https://res.cloudinary.com/dh5a8opoe/image/upload/q_auto/f_auto/v1735378142/Exam_Portal/em3v9eeyxrym85j0grbl.jpg'
// const heroImg3 = 'https://res.cloudinary.com/dh5a8opoe/image/upload/q_auto/f_auto/v1735378207/Exam_Portal/i0hquqivopj1f1nuxicm.jpg'
const heroImg3 = 'https://res.cloudinary.com/dh5a8opoe/image/upload/f_auto,q_auto/v1/Exam_Portal/oev6muqjzcyvxxqlylan'
// const heroImg4 = 'https://res.cloudinary.com/dh5a8opoe/image/upload/q_auto/f_auto/v1735378254/Exam_Portal/zjc6l4h3tehqfrolzmzy.jpg'
const heroImg4 = 'https://res.cloudinary.com/dh5a8opoe/image/upload/f_auto,q_auto/v1/Exam_Portal/isw1m68np15c1skojjlg'

function RightHero() {

    const swiperContent = [
        { id: 1, image: heroImg1 },
        { id: 2, image: heroImg2 },
        { id: 3, image: heroImg3 },
        { id: 4, image: heroImg4 }
    ]

    return (
        <div className='w-1/2 justify-end hrmd:absolute hrmd:top-0 hrmd:left-0 hrmd:size-full hrmd:-z-10'>
            <Swiper
                modules={[Autoplay]}
                spaceBetween={10}
                slidesPerView={1}
                autoplay={{ delay: 5000 }}
                loop
                className='h-full'
            >
                {swiperContent.map((content) => (
                    <SwiperSlide key={content.id}>
                        <img
                            src={content.image}
                            alt="Hero Image"
                            className='size-full object-cover rounded-md h-full min-h-[32rem] max-h-[32rem] hrmd:max-h-full hrmd:h-full'
                            loading='eager'
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default RightHero