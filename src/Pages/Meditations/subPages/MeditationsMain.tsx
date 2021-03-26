import React, { useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";

import Card from "Components/Card";
import { useGet } from "Hooks/useQuery";
import { api } from "Api/Api";
import { meditationIdMaker } from "Animations/layoutIdMaker";
import Chip from "Components/Chip";
import { MeditationCategory } from "Api/GeneratedApi";
import { Link } from "react-router-dom";
import { getImageAbsolutePath } from "Utils/filePathUtils";

const LecturesMain: React.FC = () => {
  const { data: meditations } = useGet(api.getMeditations, {}, 1, 100);
  const { data: categories } = useGet(api.getMeditationCategories);
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  return (
    <Container>
      <CardListTitle>مدیتیشن ها</CardListTitle>
      <div style={{ width: "100%" }}>
        <Swiper
          key={
            categories
              ? Array.from(categories.data.meditation_categories).length
              : 1
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
              bg="tertiary"
              isGradient
              isSelected={selectedCategoryId === 0}
            >
              همه
            </Chip>
          </SwiperSlide>
          {categories &&
            Array.from(categories.data.meditation_categories).map((cat) => (
              <SwiperSlide style={{ width: "10ch" }}>
                <Chip
                  onClick={() => setSelectedCategoryId(cat.id)}
                  bg="tertiary"
                  isGradient
                  isSelected={cat.id === selectedCategoryId}
                >
                  {cat.name}
                </Chip>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>

      <CardsGrid>
        {meditations &&
          Array.from(meditations.data.meditations.data)
            .filter(
              (med) =>
                selectedCategoryId === 0 ||
                med.meditation_category_id === selectedCategoryId
            )
            .map((meditation) => (
              <Link
                to={`/meditations/${
                  meditation?.id
                }?layoutId=${meditationIdMaker(meditation.id)}`}
              >
                <div className="card-item-container">
                  <Card
                    backgroundImage={getImageAbsolutePath(
                      meditation.image.path
                    )}
                    id={meditationIdMaker(meditation.id)}
                    key={meditationIdMaker(meditation.id)}
                    title={meditation.name}
                    duration={
                      meditation.lectures.length > 1
                        ? `${meditation.lectures.length} درس`
                        : `${meditation.lectures[0].duration} دقیقه`
                    }
                  />
                </div>
              </Link>
            ))}
      </CardsGrid>
    </Container>
  );
};

export default LecturesMain;

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
