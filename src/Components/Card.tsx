import { motion, HTMLMotionProps } from "framer-motion";
import { transparentize } from "polished";
import styled from "styled-components";
import { bigShadowMixin } from "Styles/mixins";

type CardProps = {
  backgroundImage: string;
  title: string;
  subtitle?: string;
  footer?: JSX.Element;
  isExpanded?: boolean;
  id: string;
};

const Card: React.FC<CardProps & Omit<HTMLMotionProps<"div">, "title">> = ({
  backgroundImage,
  title,
  subtitle,
  footer,
  children,
  isExpanded,
  id,
  ...motionProps
}) => {
  return (
    <Container
      transition={{ duration: 0.5 }}
      layoutId={id}
      style={{
        display: "inline-block",
      }}
      animate={{
        width: "100%",
        height: "100%",
        // paddingTop: isExpanded ? "50%" : "100%",
      }}
      initial={false}
      exit={{ opacity: 0 }}
    >
      <motion.div
        transition={{ duration: 0.5 }}
        className="image-container"
        layoutId={`${id}_image-container`}
        animate={{
          width: "100%",
          display: "inline-block",
          height: "100%",
        }}
        initial={false}
      >
        <motion.img
          transition={{ duration: 0.5 }}
          src={backgroundImage}
          initial={false}
          layoutId={`${id}_img`}
          style={{
            objectFit: "cover",
            display: "inline-block",
            width: "100%",
            height: "100%",
          }}
        />
      </motion.div>
      <TitleContainer
        layoutId={`${id}_titleContainer`}
        transition={{ duration: 0.5 }}
        style={isExpanded ? { bottom: "0.2em" } : { top: "0.2em" }}
      >
        <Title as={isExpanded ? "h3" : "h5"}>{title}</Title>
        {subtitle && <Title as={motion.h6}>{subtitle}</Title>}
      </TitleContainer>
      <FooterContainer
        layoutId={`${id}_footerContainer`}
        transition={{ duration: 0.5 }}
        style={isExpanded ? { left: "0.5em" } : { right: "0.5em" }}
      >
        {footer}
      </FooterContainer>
    </Container>
  );
};

export default Card;

const Container = styled(motion.div)`
  border-radius: 0.5em;
  display: inline-block;
  /* padding-top: 100%; */
  overflow: hidden;
  position: relative;
  & .image-container {
    position: absolute;
    display: inline-block;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }
  /* ${bigShadowMixin} */
`;

const TitleContainer = styled(motion.div)`
  position: absolute;
  display: inline-block;
  /* top: 0.5em; */
  right: 0.5em;
  /* display: flex; */
  flex-direction: column;
  max-width: 80%;
`;

const Title = styled(motion.h5)`
  max-width: 100%;
  display: inline-block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  padding: 0.1em 0.3em;
  border-radius: 0.3em;
  background-color: ${(p) => transparentize(0.7, p.theme.palette.common.black)};
  font-weight: bolder;
`;

const FooterContainer = styled(motion.div)`
  position: absolute;
  display: inline-block;
  /* top: 0.5em; */
  bottom: 0.5em;
  /* display: flex; */
  flex-direction: column;
`;
