import Page from "Components/Page";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import sea2 from "Assets/images/sea2.jpg";
import sea3 from "Assets/images/sea3.jpg";
import winter from "Assets/images/winter.jpg";
import sea from "Assets/images/sea.jpg";
import forest from "Assets/images/forest.jpg";
import road from "Assets/images/road.jpg";
import Card from "Components/Card";
import { Link } from "react-router-dom";
import PlayBtn from "Components/Player/components/PlayBtn";
import headBg from "Assets/images/head-bg.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { api } from "Api/Api";

const Home: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    api.getHomeLists().then(console.log);
  }, []);
  return (
    <Page noPadding ref={pageRef}>
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        src={headBg}
        style={{ width: "100%", objectFit: "cover" }}
        alt=""
      />
      <PageTitle>CALM SEA</PageTitle>
      <Container>
        <CardListTitle>مدیتیشن ها</CardListTitle>
        <Swiper
          spaceBetween={10}
          slidesPerView="auto"
          style={{ padding: "0 10px" }}
        >
          <SwiperSlide style={{ width: "40vw", height: "40vw" }}>
            <Card backgroundImage={forest} id="forest" title="استرس" />
          </SwiperSlide>
          <SwiperSlide style={{ width: "40vw", height: "40vw" }}>
            <Link to="/lectures/jkhjk">
              <Card backgroundImage={sea2} id="sea2" title="خواب" />
            </Link>
          </SwiperSlide>
          <SwiperSlide style={{ width: "40vw", height: "40vw" }}>
            <Card backgroundImage={road} id="road" title="انرژی" />
          </SwiperSlide>
          <SwiperSlide style={{ width: "40vw", height: "40vw" }}>
            <Card backgroundImage={sea3} id="sea3" title="انرژی" />
          </SwiperSlide>
        </Swiper>
        <CardListTitle>مدیتیشن ها</CardListTitle>
        <Swiper
          spaceBetween={10}
          slidesPerView="auto"
          style={{ padding: "0 10px" }}
        >
          <SwiperSlide style={{ width: "40vw", height: "40vw" }}>
            <Card
              backgroundImage={forest}
              id="1"
              title="استرس"
              duration="03:45"
            />
          </SwiperSlide>
          <SwiperSlide style={{ width: "40vw", height: "40vw" }}>
            <Link to="/lectures/jkhjk">
              <Card backgroundImage={sea2} id="2" title="خواب" />
            </Link>
          </SwiperSlide>
          <SwiperSlide style={{ width: "40vw", height: "40vw" }}>
            <Card backgroundImage={road} id="3" title="انرژی" />
          </SwiperSlide>
          <SwiperSlide style={{ width: "40vw", height: "40vw" }}>
            <Card backgroundImage={sea3} id="4" title="انرژی" />
          </SwiperSlide>
        </Swiper>
      </Container>
    </Page>
  );
};

export default Home;

const Container = styled(motion.div)`
  width: 100%;
  /* height: 100%; */
  /* overflow-x: hidden; */
`;

const PageTitle = styled(motion.h1)`
  position: absolute;
  font-size: 2.5rem;
  font-weight: bold;
  top: 0.3em;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  mix-blend-mode: overlay;
  letter-spacing: 0.4em;
`;

const CardListTitle = styled.h3`
  padding-right: 1em;
`;
