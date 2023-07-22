import React, { useEffect, useState } from "react";
import { getMovies } from "../../services/getMovies";
import { getDetailsMovie } from "../../services/getDetailsMovie";
import "./carrusel.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import { EffectCoverflow } from "swiper/modules";
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
      const listId = await getDetailsMovie(data[i].id);
      list.push(listId);
    }
    setListMovies(list);
  };

  const detailMovie = () => {
    console.log(listMovies);
  };

  return (
    <div className="container">
      <div className="swiperContainer">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          modules={[EffectCoverflow]}
          className="swiper_container"
        >
          {listMovies.map((data) => (
            <SwiperSlide key={data.id}>
              <CardCarrusel movie={data} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Carrusel;
