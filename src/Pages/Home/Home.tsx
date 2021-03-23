import Page from "Components/Page";
import React, { useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import sea2 from "Assets/images/sea2.jpg";
import sea3 from "Assets/images/sea3.jpg";
import winter from "Assets/images/winter.jpg";
import sea from "Assets/images/sea.jpg";
import forest from "Assets/images/forest.jpg";
import road from "Assets/images/road.jpg";
import { spaceXMixinFactory } from "Styles/mixins";
import Card from "Components/Card";
import { Link } from "react-router-dom";
import PlayBtn from "Components/Player/components/PlayBtn";

const Home: React.FC = () => {
  const meditationRef = useRef<HTMLDivElement>(null);
  const musicRef = useRef<HTMLDivElement>(null);
  return (
    <Page noPadding>
      <Container ref={meditationRef}>
        <CardListTitle>مدیتیشن ها</CardListTitle>
        <CardList
          drag="x"
          dragConstraints={meditationRef}
          initial={{ opacity: 1 }}
        >
          <div className="card-item-container">
            <Card
              backgroundImage={forest}
              id="forest"
              title="استرس"
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
              backgroundImage={sea3}
              id="sea3"
              title="انرژی"
              footer={<PlayBtn />}
            />
          </div>
        </CardList>
      </Container>
      <Container ref={musicRef}>
        <CardListTitle>موزیک ها</CardListTitle>
        <CardList drag="x" dragConstraints={musicRef} initial={{ opacity: 1 }}>
          <div className="card-item-container">
            <Card
              backgroundImage={winter}
              id="m1"
              title="استرس"
              footer={<PlayBtn />}
            />
          </div>
          <Link to="/lectures/jkhjk">
            <div className="card-item-container">
              <Card
                backgroundImage={sea}
                id="m2"
                title="خواب"
                footer={<PlayBtn />}
              />
            </div>
          </Link>
          <div className="card-item-container">
            <Card
              backgroundImage={road}
              id="m3"
              title="انرژی"
              footer={<PlayBtn />}
            />
          </div>
          <div className="card-item-container">
            <Card
              backgroundImage={sea3}
              id="m4"
              title="انرژی"
              footer={<PlayBtn />}
            />
          </div>
        </CardList>
      </Container>
    </Page>
  );
};

export default Home;

const Container = styled(motion.div)`
  width: 100%;
  /* height: 100%; */
  overflow-x: hidden;
`;

const CardListTitle = styled.h3`
  padding-right: 1em;
`;

const CardList = styled(motion.div)`
  padding-left: inherit;
  padding-right: inherit;
  display: inline-flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 1em;
  & > * {
    flex-shrink: 0;
  }
  .card-item-container {
    width: 40vw;
    height: 40vw;
  }
  ${spaceXMixinFactory("large")}
`;
