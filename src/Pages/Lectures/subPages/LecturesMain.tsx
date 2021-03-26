import React, { useRef } from "react";
import styled from "styled-components";
import { AnimatePresence, motion, useCycle } from "framer-motion";
import sea2 from "Assets/images/sea2.jpg";
import sea3 from "Assets/images/sea3.jpg";
import forest from "Assets/images/forest.jpg";
import road from "Assets/images/road.jpg";
import { spaceXMixinFactory } from "Styles/mixins";
import Card from "Components/Card";
import { Link } from "react-router-dom";
import { transparentize } from "polished";
import { BsPlay } from "react-icons/bs";
import PlayBtn from "Components/Player/components/PlayBtn";
import Button from "Components/Button";

const LecturesMain: React.FC = () => {
  return (
    <Container>
      <CardListTitle>مدیتیشن ها</CardListTitle>
      <CardsGrid>
        <div className="card-item-container">
          <Card backgroundImage={forest} id="forest" title="استرس" />
        </div>
        <Link to="/lectures/jkhjk">
          <div className="card-item-container">
            <Card backgroundImage={sea2} id="sea2" title="خواب" />
          </div>
        </Link>
        <div className="card-item-container">
          <Card backgroundImage={road} id="road" title="انرژی" />
        </div>
        <div className="card-item-container">
          <Card backgroundImage={sea3} id="sea3" title="انرژی" />
        </div>
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
  padding-left: inherit;
  padding-right: inherit;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  grid-gap: 0.5em;
  padding: 0.5em;
  .card-item-container {
    /* width: 40vw; */
    height: 40vw;
  }
`;

const CardListTitle = styled.h3`
  padding-right: 1em;
`;
