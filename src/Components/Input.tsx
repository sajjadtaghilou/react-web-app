import { motion, AnimationProps, MotionProps } from "framer-motion";
import { transparentize } from "polished";
import styled from "styled-components";
import {
  bluryShadowMixin,
  roundedMixin,
  smallShadowMixin,
  spaceXMixinFactory,
} from "Styles/mixins";
import { colorVariantsProps, colorVariantsPropsType } from "Styles/props";

const Input: React.FC<
  {
    icon?: JSX.Element;
    inputColor?: colorVariantsPropsType;
    iconColor?: colorVariantsPropsType;
    motion?: AnimationProps & MotionProps;
  } & React.DOMAttributes<HTMLInputElement>
> = ({ icon, children, iconColor, inputColor, motion, ...inputProps }) => {
  return (
    <Container {...motion} {...inputColor}>
      {icon && (
        <IconContainer {...iconColor}>
          <Children>{icon}</Children>
        </IconContainer>
      )}
      <InputContainer>
        <StyledInput {...inputProps} />
      </InputContainer>
    </Container>
  );
};

export default Input;

const Container = styled(motion.div)<colorVariantsPropsType>`
  display: flex;
  align-items: center;
  padding: 0.4em;
  max-width: 100%;
  background-color: ${(p) => transparentize(0, p.theme.palette.common.white)};
  /* border: 1px solid ${(p) =>
    transparentize(0.4, p.theme.palette.common.white)}; */
  backdrop-filter: blur(0.07em);
  color: ${(p) => transparentize(0.2, p.theme.palette.common.black)};
  ${roundedMixin}
  ${spaceXMixinFactory("small")}
  ${colorVariantsProps}
  ${bluryShadowMixin}
`;

const Children = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const InputContainer = styled.div`
  flex: 1;
`;

const StyledInput = styled.input`
  background-color: transparent;
  font-size: 1rem;
  border: none;
  flex: 1;
  max-width: 100%;
  width: 100%;
`;
const IconContainer = styled.div<colorVariantsPropsType>`
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  padding: 0.3em;
  /* ${smallShadowMixin} */
  ${roundedMixin}
  ${colorVariantsProps}
`;
