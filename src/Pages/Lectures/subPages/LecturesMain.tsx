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
import { transparentize } from "polished";
import { BsPlay } from "react-icons/bs";
import PlayBtn from "../components/PlayBtn";
import Button from "Components/Button";

const LecturesMain: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <Container ref={ref}>
      <CardList drag="x" dragConstraints={ref} initial={{ opacity: 1 }}>
        <div className="card-item-container">
          <Card
            backgroundImage={forest}
            id="forest"
            title="استرس"
            footer={<PlayBtn />}
          />
        </div>
        <div className="card-item-container">
          <Card
            backgroundImage={road}
            id="road"
            title="انرژی"
            footer={<PlayBtn />}
          />
        </div>
        <div className="card-item-container">
          <Card
            backgroundImage={road}
            id="road2"
            title="انرژی"
            footer={<PlayBtn />}
          />
        </div>
        <Link to="/lectures/jkhjk">
          <div className="card-item-container">
            <Card
              backgroundImage={sea2}
              id="sea2"
              title="خواب"
              footer={<PlayBtn />}
            />
          </div>
        </Link>
      </CardList>
      <Button bg="secondary" isGradient hasGlow>
        salam
      </Button>
    </Container>
  );
};

export default LecturesMain;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const CardList = styled(motion.div)`
  padding-left: inherit;
  padding-right: inherit;
  display: inline-flex;
  flex-direction: row;
  flex-wrap: nowrap;
  & > * {
    flex-shrink: 0;
  }
  .card-item-container {
    width: 40vw;
  }
  ${spaceXMixinFactory("large")}
`;
