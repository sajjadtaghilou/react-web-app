import React, { useRef } from "react";
import styled from "styled-components";
import { AnimatePresence, motion, useCycle } from "framer-motion";
import Page from "Components/Page";
import sea2 from "Assets/images/sea2.jpg";
import forest from "Assets/images/forest.jpg";
import road from "Assets/images/road.jpg";
import { spaceXMixinFactory, spaceYMixinFactory } from "Styles/mixins";
import Card from "Components/Card";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { useAtom } from "jotai";
import PlayBtn from "Components/Player/components/PlayBtn";
import Button from "Components/Button";
import { LayoutAtom } from "Contexts/LayouContext";
import PlayList from "Components/PlayList";

const LectureDetails: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [, setLayoutAtom] = useAtom(LayoutAtom);
  const history = useHistory();
  const match = useRouteMatch();
  return (
    <Container ref={ref}>
      <CardContainer>
        <Card
          key="sea2"
          backgroundImage={sea2}
          id="sea2"
          title="خواب"
          isExpanded
        />
      </CardContainer>
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
          مورد استفاده قرار گیرد. لورم ایپسوم متن ساختگی با تولید سادگی
          نامفهومچاپگرها و متون بلکه موجود طراحی اساسا مورد استفاده قرار گیرد.
        </LectureDesc>
        <div
          style={{
            flex: 1,
            width: "100%",
            overflow: "hidden",
          }}
        >
          <PlayList
            items={[
              { title: "salam1" },
              { title: "salam2" },
              { title: "salam3" },
              { title: "salam4" },
              { title: "salam5" },
              { title: "salam6" },
              { title: "salam7" },
              { title: "salam8" },
              { title: "salam9" },
              { title: "salam10" },
            ]}
          />
        </div>
      </DescContainer>
    </Container>
  );
};

export default LectureDetails;

const Container = styled(motion.div)`
  width: 100%;
  /* height: 100%; */
  overflow: hidden;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1em;
`;
const CardContainer = styled.div`
  width: 100%;
  height: 50vw;
`;

const DescContainer = styled.div`
  flex: 1;
  font-size: 0.8rem;
  padding: 2em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  ${spaceYMixinFactory("large")}
`;

const LectureDesc = styled(motion.p)`
  width: 100%;
  text-align: justify;
`;

const ButtonsContainer = styled(motion.div)`
  display: flex;
  ${spaceXMixinFactory("large")}
`;
