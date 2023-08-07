import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Autoplay } from "swiper/modules";
import "swiper/scss";
import "swiper/css/effect-coverflow";
import { getMovies } from "../../services/getMovies";
import { getDetailsMovie } from "../../services/getDetailsMovie";
import "./carrusel.scss";
import CardCarrusel from "../cardCarrusel/CardCarrusel";

const Carrusel = () => {
  const [listMovies, setListMovies] = useState([]);

  useEffect(() => {
    movies();
  }, []);

  const movies = async () => {
    const data = await getMovies();
    const list = [];
    for (let i = 0; i < data.length; i++) {
      const listId = await getDetailsMovie(data[i]?.id);
      list.push(listId);
    }
    setListMovies(list);
  };

  return (
    <div className="containerr">
      <div className="swiperContainer">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          loop={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          modules={[EffectCoverflow, Navigation, Autoplay]}
          className="swiper_container"
          loopedSlides={listMovies.length}
        >
          {listMovies?.map((data) => (
            <SwiperSlide key={data.id}>
              <CardCarrusel  movie={data} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Carrusel;
