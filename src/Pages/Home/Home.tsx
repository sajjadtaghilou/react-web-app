import Page from "Components/Page";
import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Card from "Components/Card";
import { Link } from "react-router-dom";
import headBg from "Assets/images/head-bg.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { api } from "Api/Api";
import { prefetchQuery, useGet } from "Hooks/useQuery";
import { meditationIdMaker, musicIdMaker } from "Animations/layoutIdMaker";

const Home: React.FC = () => {
  const { data, isLoading } = useGet(api.getHomeLists, {
    onSuccess(res) {
      Array.from(res.data.home_lists).forEach((homeItem) =>
        homeItem.items.forEach((item) => {
          item.meditation &&
            prefetchQuery(api.getMeditationsId, item.meditation.id);
          item.music && prefetchQuery(api.getMusicsId, item.music?.id);
        })
      );
    },
  }); //TODO skeleton loading
  return (
    <Page noPadding>
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        src={headBg}
        style={{ width: "100%", objectFit: "cover" }}
        alt=""
      />
      <PageTitle>CALM SEA</PageTitle>
      <Container>
        {Array.from(data?.data.home_lists || []).map((homeItem, rowIndex) => (
          <>
            <CardListTitle>{homeItem.name}</CardListTitle>
            <Swiper
              spaceBetween={10}
              slidesPerView="auto"
              style={{ padding: "0 10px" }}
            >
              {homeItem.items.map((item) => {
                const layoutId = item.meditation
                  ? meditationIdMaker(item.meditation.id) + "_" + rowIndex
                  : item.music
                  ? musicIdMaker(item.music.id) + "_" + rowIndex
                  : "__";
                return (
                  <SwiperSlide style={{ width: "40vw", height: "40vw" }}>
                    <Link
                      to={`/meditations/${item.meditation?.id}?layoutId=${layoutId}`}
                    >
                      {/*TODO music */}
                      <Card
                        backgroundImage={`${process.env.REACT_APP_PUBLIC_PATH}${
                          item.meditation?.image.path || item.music?.image.path
                        }`}
                        id={layoutId}
                        title={item.music?.title || item.meditation?.name || ""}
                      />
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </>
        ))}
      </Container>
    </Page>
  );
};

export default Home;

const Container = styled(motion.div)`
  width: 100%;
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

const CardListTitle = styled.h4`
  padding-right: 1em;
  margin: 1em 0 0.3em 0;
  font-weight: bold;
`;
