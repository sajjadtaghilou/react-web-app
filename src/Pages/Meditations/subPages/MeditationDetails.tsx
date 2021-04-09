import React, { useRef, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { spaceXMixinFactory, spaceYMixinFactory } from "Styles/mixins";
import Card from "Components/Card";
import { useRouteMatch } from "react-router-dom";
import { useAtom } from "jotai";
import PlayList from "Components/PlayList";
import { useGet } from "Hooks/useQuery";
import { api } from "Api/Api";
import useQueryParams from "Hooks/useQueryParams";
import Player from "Components/Player";
import {
  getImageAbsolutePath,
  getMeditationLectureAbsolutePath,
} from "Utils/filePathUtils";
import { AuthAtom } from "Contexts/AuthContext";
import PlayBtn from "Components/Player/components/PlayBtn";

const LectureDetails: React.FC = () => {
  const [selectedPath, setSelectedPath] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const queryParams = useQueryParams();
  const match = useRouteMatch<{ id: string }>();
  const { data: meditation } = useGet(
    api.getMeditationsId,
    {},
    +match.params.id
  );
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const [{ user }] = useAtom(AuthAtom);
  return (
    <Container ref={ref}>
      <CardContainer>
        {meditation && (
          <Card
            backgroundImage={getImageAbsolutePath(
              meditation.data.meditation.image.path || ""
            )}
            id={queryParams.get("layoutId") || ""}
            title={meditation.data.meditation.name}
            duration={
              meditation.data.meditation.lectures.length > 1
                ? `${meditation.data.meditation.lectures.length} درس`
                : `${meditation.data.meditation.lectures[0].duration} دقیقه`
            }
            isExpanded
            playBtn={
              meditation.data.meditation.lectures.length === 1 ? (
                <PlayBtn
                  big
                  handleClick={() => {
                    //TODO refactor
                    if (
                      meditation.data.meditation.lectures.length === 1 &&
                      !!getMeditationLectureAbsolutePath(
                        meditation.data.meditation.lectures[0],
                        user!
                      )
                    ) {
                      setIsPlayerVisible(true);
                      setSelectedPath(
                        getMeditationLectureAbsolutePath(
                          meditation.data.meditation.lectures[0],
                          user!
                        ) || ""
                      );
                    }
                  }}
                />
              ) : undefined
            }
            onClick={() => {
              //TODO refactor
              if (meditation.data.meditation.lectures.length === 1) {
                setIsPlayerVisible(true);
                setSelectedPath(
                  getMeditationLectureAbsolutePath(
                    meditation.data.meditation.lectures[0],
                    user!
                  ) || ""
                );
              }
            }}
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
          {meditation?.data.meditation.description}
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
          {meditation && (
            <PlayList
              items={meditation.data.meditation.lectures.map((lec, i) => ({
                title: lec.name,
                isUnlocked: !getMeditationLectureAbsolutePath(
                  meditation.data.meditation.lectures[i],
                  user!
                ),
              }))}
              onItemClicked={(index) => {
                setIsPlayerVisible(true);
                setSelectedPath(
                  getMeditationLectureAbsolutePath(
                    meditation.data.meditation.lectures[index],
                    user!
                  ) || ""
                );
              }}
            />
          )}
        </motion.div>
      </DescContainer>
      {meditation && (
        <Player
          isVisible={isPlayerVisible}
          closePlayer={() => setIsPlayerVisible(false)}
          onTrackEnd={() => {}}
          path={selectedPath}
          backgroundImage={getImageAbsolutePath(
            meditation.data.meditation.image.path
          )}
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
