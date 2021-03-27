import React, { useRef, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { spaceXMixinFactory, spaceYMixinFactory } from "Styles/mixins";
import Card from "Components/Card";
import { useHistory, useRouteMatch } from "react-router-dom";
import { LayoutAtom } from "Contexts/LayouContext";
import PlayList from "Components/PlayList";
import { meditationIdMaker } from "Animations/layoutIdMaker";
import { useGet } from "Hooks/useQuery";
import { api } from "Api/Api";
import useQueryParams from "Hooks/useQueryParams";
import Player from "Components/Player";
import {
  getImageAbsolutePath,
  getMusicAbsolutePath,
} from "Utils/filePathUtils";
import { AuthAtom } from "Contexts/AuthContext";
import { useAtom } from "jotai";

const LectureDetails: React.FC = () => {
  const [selectedPath, setSelectedPath] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const queryParams = useQueryParams();
  const match = useRouteMatch<{ id: string }>();
  const { data: music } = useGet(api.getMusicsId, {}, +match.params.id);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const [{ user }] = useAtom(AuthAtom);
  return (
    <Container ref={ref}>
      <CardContainer>
        {music && (
          <Card
            backgroundImage={getImageAbsolutePath(
              music.data.music.image.path || ""
            )}
            id={queryParams.get("layoutId") || ""}
            title={music.data.music.title}
            duration={music.data.music.duration + " دقیقه"}
            isExpanded
          />
        )}
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
          {music?.data.music.description}
        </LectureDesc>
        <motion.div
          initial={{ y: 5, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            transition: { delay: 1.5, bounce: 0, duration: 0.3 },
          }}
          exit={{ y: 35, opacity: 0 }}
          transition={{ duration: 0.5, bounce: 0 }}
          style={{
            flex: 1,
            width: "100%",
            overflow: "hidden",
          }}
        >
          {music && (
            <PlayList
              items={[
                {
                  title: music.data.music.title,
                  isUnlocked: !getMusicAbsolutePath(music.data.music, user!),
                },
              ]}
              onItemClicked={(index) => {
                setIsPlayerVisible(true);
                setSelectedPath(
                  getMusicAbsolutePath(music.data.music, user!) || ""
                );
              }}
            />
          )}
        </motion.div>
      </DescContainer>
      {music && (
        <Player
          isVisible={isPlayerVisible}
          closePlayer={() => setIsPlayerVisible(false)}
          onTrackEnd={() => {}}
          path={selectedPath}
          backgroundImage={getImageAbsolutePath(music.data.music.image.path)}
        />
      )}
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
