import { motion } from "framer-motion";
import { transparentize } from "polished";
import styled from "styled-components";
import { fullRoundedMixin, roundedMixin } from "Styles/mixins";

type CardProps = {
  backgroundImage: string;
  title: string;
  duration?: string;
  isExpanded?: boolean;
  id: string;
};

const Card: React.FC<CardProps> = ({
  backgroundImage,
  title,
  duration,
  isExpanded,
  id,
}) => {
  return (
    <Container transition={{ duration: 0.5 }} layoutId={id} initial={false}>
      <ImageContainer
        transition={{ duration: 0.5 }}
        layoutId={`${id}_image-container`}
        initial={false}
      >
        <CardImage
          transition={{ duration: 0.5 }}
          src={backgroundImage}
          initial={false}
          layoutId={`${id}_img`}
        />
      </ImageContainer>
      <Duration>{duration}</Duration>
      <TitleContainer
        layoutId={`${id}_titleContainer`}
        transition={{ duration: 0.5 }}
      >
        <Title as={isExpanded ? "h3" : "h5"}>{title}</Title>
      </TitleContainer>
    </Container>
  );
};

export default Card;

const Container = styled(motion.div)`
  border-radius: 0.5em;
  display: inline-block;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
`;

const ImageContainer = styled(motion.div)`
  position: absolute;
  display: inline-block;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: inline-block;
`;

const CardImage = styled(motion.img)`
  object-fit: cover;
  display: inline-block;
  width: 100%;
  height: 100%;
`;

const TitleContainer = styled(motion.div)`
  position: absolute;
  display: inline-block;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${(p) => transparentize(0.7, p.theme.palette.common.black)};
  flex-direction: column;
  display: flex;
  align-items: center;
  padding: 0.2em 0;
  backdrop-filter: blur(2px);
`;

const Title = styled(motion.h5)`
  max-width: 100%;
  display: inline-block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  padding: 0.1em 0.3em;
  border-radius: 0.3em;
  font-weight: bolder;
`;

const Duration = styled.p`
  background-color: ${(p) => transparentize(0.7, p.theme.palette.common.black)};
  ${roundedMixin};
  padding: 0 0.4em;
  position: absolute;
  top: 0.2em;
  left: 0.2em;
`;
