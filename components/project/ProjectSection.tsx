// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import Link from 'next/link';
import {A11y, Autoplay, EffectCoverflow, Navigation, Pagination} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import resolveConfig from 'tailwindcss/resolveConfig';

import {FileMeta} from '@/models';

import CarouselCard from '../share/CarouselCard';
import SectionLayout from '../share/SectionLayout';

const tailwindConfig = require('/tailwind.config');
const fullConfig = resolveConfig(tailwindConfig);
const kingColor = (fullConfig.theme.colors as any).king;

export default function ProjectSection({projects}: {projects: FileMeta[]}) {
  return (
    <SectionLayout id="project" title="Projects">
      <div>
        <Swiper
          style={
            {
              '--swiper-navigation-color': kingColor[500],
              '--swiper-pagination-color': kingColor[500],
            } as any
          }
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          spaceBetween={30}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation={true}
          modules={[A11y, Pagination, Autoplay, EffectCoverflow, Navigation]}
          className="mySwiper"
        >
          {projects.map((p) => (
            <SwiperSlide key={p.title}>
              <CarouselCard
                imgSrc={p.cover_image}
                title={p.title}
                description={p.excerpt}
                link={`/projects/${p.slug}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <style jsx global>
          {`
            .swiper {
              width: 100%;
              padding-top: 50px;
              padding-bottom: 50px;
            }

            .swiper-slide {
              background-position: center;
              background-size: cover;
              width: clamp(40%, 300px, 90%);
              /* height: 200px; */
            }

            .swiper-slide img {
              display: block;
              width: 100%;
            }

            // tailwind small
            @media (max-width: 640px) {
              .swiper-button-prev,
              .swiper-button-next {
                display: none;
              }
            }

            // overwrite navigation dot background color for dark mode
            .dark :not(.swiper-pagination-bullet-active).swiper-pagination-bullet {
              background: #fff;
            }
          `}
        </style>
      </div>
      <div className="flex justify-center">
        <Link href="/projects">
          <a className="btn-secondary group">
            View more
            <svg
              className="w-5 -rotate-90 duration-200 group-hover:translate-x-2"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.101 5.5V23.1094L9.40108 17.4095L8.14807 18.6619L15.9862 26.5L23.852 18.6342L22.5996 17.3817L16.8725 23.1094V5.5H15.101Z"
                fill="currentColor"
              ></path>
            </svg>
          </a>
        </Link>
      </div>
    </SectionLayout>
  );
}
