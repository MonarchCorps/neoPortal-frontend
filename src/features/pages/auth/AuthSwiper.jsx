import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/swiper-bundle.css'

// const img1 = 'https://res.cloudinary.com/dh5a8opoe/image/upload/q_auto/f_auto/v1735377912/Exam_Portal/spgya0nusjwyka6zbvsy.jpg'
const img1 = 'https://res.cloudinary.com/dh5a8opoe/image/upload/f_auto,q_auto/v1/Exam_Portal/v3h4vtr5ewutlrexqnrj'

// const img2 = 'https://res.cloudinary.com/dh5a8opoe/image/upload/q_auto/f_auto/v1735377917/Exam_Portal/elmzvtdbw9li6aanqcko.jpg'
const img2 = 'https://res.cloudinary.com/dh5a8opoe/image/upload/f_auto,q_auto/v1/Exam_Portal/suhuwhucaxpd0oaqpqs5'

// const img3 = 'https://res.cloudinary.com/dh5a8opoe/image/upload/q_auto/f_auto/v1735377927/Exam_Portal/o3zt5feniddphap6zt8t.jpg'
const img3 = 'https://res.cloudinary.com/dh5a8opoe/image/upload/f_auto,q_auto/v1/Exam_Portal/nqzlsxlobyflqcw7yrzl'

function AuthSwiper() {

    const swiperContent = [
        {
            id: 1,
            image: img1,
        }, {
            id: 2,
            image: img2
        }, {
            id: 3,
            image: img3
        }, {
            id: 4,
            image: img1
        }, {
            id: 5,
            image: img2
        }
    ]

    return (
        <div className='fixed w-1/2 top-0 bottom-0 right-0'>
            <Swiper
                modules={[Autoplay]}
                spaceBetween={10}
                slidesPerView={1}
                autoplay={{ delay: 3000 }}
                loop
                className='size-full'
            >
                {swiperContent.map((content) => (
                    <SwiperSlide key={content.id} className='size-full'>
                        <figure className='cursor-grab select-none max-w-[95%] ml-auto'>
                            <img
                                src={content.image}
                                className='w-full h-screen min-h-[40rem] object-cover'
                                alt="image"
                                loading="eager"
                            />
                            <div className='absolute bottom-12 px-4'>
                                <h2 className='font-800 font-sans text-black inline-block'>{content.title}:</h2>
                                <p className="inline text-black"> {content.description}</p>
                            </div>
                        </figure>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default AuthSwiper