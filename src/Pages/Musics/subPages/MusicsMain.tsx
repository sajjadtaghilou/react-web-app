import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";

import Card from "Components/Card";
import { prefetchQuery, useGet } from "Hooks/useQuery";
import { api } from "Api/Api";
import { musicIdMaker } from "Animations/layoutIdMaker";
import Chip from "Components/Chip";
import { Link } from "react-router-dom";
import { getImageAbsolutePath } from "Utils/filePathUtils";

const MusicsMain: React.FC = () => {
  const { data: musics } = useGet(api.getMusic, {
    onSuccess(res) {
      Array.from(res.data.musics).forEach((music) => {
        prefetchQuery(api.getMusicsId, music.id);
      });
    },
  });
  const { data: categories } = useGet(api.getMusicCategories);
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  return (
    <Container>
      <CardListTitle>موزیک ها</CardListTitle>
      <div style={{ width: "100%" }}>
        <Swiper
          key={
            categories ? Array.from(categories.data.music_categories).length : 1
          }
          spaceBetween={8}
          slidesPerView="auto"
          // style={{ padding: "0 16px" }}
          slidesOffsetAfter={16}
          slidesOffsetBefore={16}
        >
          <SwiperSlide style={{ width: "10ch" }}>
            <Chip
              onClick={() => setSelectedCategoryId(0)}
              bg="primary"
              isSelected={selectedCategoryId === 0}
            >
              همه
            </Chip>
          </SwiperSlide>
          {categories &&
            Array.from(categories.data.music_categories).map((cat) => (
              <SwiperSlide style={{ width: "10ch" }}>
                <Chip
                  onClick={() => setSelectedCategoryId(cat.id)}
                  bg="primary"
                  isSelected={cat.id === selectedCategoryId}
                >
                  {cat.name}
                </Chip>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>

      <CardsGrid>
        {musics &&
          Array.from(musics.data.musics)
            .filter(
              (musicCat) =>
                selectedCategoryId === 0 ||
                musicCat.music_category_id === selectedCategoryId
            )
            .map((music) => (
              <Link
                to={`/musics/${music?.id}?layoutId=${musicIdMaker(music.id)}`}
              >
                <div className="card-item-container">
                  <Card
                    backgroundImage={getImageAbsolutePath(music.image.path)}
                    id={musicIdMaker(music.id)}
                    key={musicIdMaker(music.id)}
                    title={music.title}
                    duration={music.duration + " دقیقه"}
                  />
                </div>
              </Link>
            ))}
      </CardsGrid>
    </Container>
  );
};

export default MusicsMain;

const Container = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const CardsGrid = styled(motion.div)`
  padding: 1em;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  grid-gap: 1em;
  .card-item-container {
    height: 40vw;
  }
`;

const CardListTitle = styled.h3`
  padding: 1em;
`;
