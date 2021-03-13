import React, { useRef } from "react";
import styled from "styled-components";
import { AnimateSharedLayout, motion, useCycle } from "framer-motion";
import Page from "Components/Page";
import sea2 from "Assets/images/sea2.jpg";
import forest from "Assets/images/forest.jpg";
import road from "Assets/images/road.jpg";
import { spaceXMixinFactory } from "Styles/mixins";
import Card from "Components/Card";
import { Link } from "react-router-dom";
import PlayBtn from "../components/PlayBtn";

const LectureDetails: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <Container ref={ref}>
      <Card
        backgroundImage={sea2}
        id="sea2"
        title="خواب"
        isExpanded
        footer={<PlayBtn />}
      />
      <DescContainer>
        <LectureDesc
          initial={{ y: 5, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            transition: { delay: 1, bounce: 0, duration: 0.3 },
          }}
          exit={{ y: 35, opacity: 0 }}
          transition={{ duration: 0.5, bounce: 0 }}
        >
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
          استفاده از طراحان گرافیک است، چاپگرها و متون بلکه موجود طراحی اساسا
          مورد استفاده قرار گیرد.
        </LectureDesc>
      </DescContainer>
    </Container>
  );
};

export default LectureDetails;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const DescContainer = styled.div`
  flex: 1;
  padding: 2em;
`;

const LectureDesc = styled(motion.p)`
  width: 100%;
  text-align: justify;
  font-size: 0.8rem;
`;
