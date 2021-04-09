import {
  motion,
  AnimationProps,
  MotionProps,
  AnimatePresence,
} from "framer-motion";
import { transparentize } from "polished";
import { InputHTMLAttributes } from "react";
import styled, { css } from "styled-components";
import {
  bluryShadowMixin,
  fullRoundedMixin,
  roundedMixin,
  smallShadowMixin,
  smallGlowMixin,
  spaceXMixinFactory,
} from "Styles/mixins";
import { colorVariantsProps, colorVariantsPropsType } from "Styles/props";

type ContainerProps = { hasGlow?: boolean; hasShadow?: boolean };

const Input: React.FC<
  {
    icon?: JSX.Element;
    inputColor?: colorVariantsPropsType;
    iconColor?: colorVariantsPropsType;
    motion?: AnimationProps & MotionProps;
    isLtr?: boolean;
    error?: string | boolean;
  } & ContainerProps &
    InputHTMLAttributes<HTMLInputElement>
> = ({
  icon,
  children,
  iconColor,
  inputColor,
  motion,
  isLtr,
  hasGlow,
  hasShadow,
  error,
  ...inputProps
}) => {
  return (
    <Container {...motion}>
      <InputContainer hasGlow={hasGlow} hasShadow={hasShadow} {...inputColor}>
        {icon && (
          <IconContainer {...iconColor}>
            <Children>{icon}</Children>
          </IconContainer>
        )}
        <div style={{ flex: 1 }}>
          <StyledInput {...inputProps} isLtr={isLtr} />
        </div>
      </InputContainer>
      <AnimatePresence>
        {error && (
          <Error
            exit={{ height: 0 }}
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </Error>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default Input;

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputContainer = styled(motion.div)<
  ContainerProps & colorVariantsPropsType
>`
  display: flex;
  align-items: center;
  padding: 0.4em;
  max-width: 100%;
  background-color: ${(p) => transparentize(0, p.theme.palette.common.white)};
  backdrop-filter: blur(0.07em);
  color: ${(p) => transparentize(0.2, p.theme.palette.common.black)};
  ${fullRoundedMixin}
  ${spaceXMixinFactory("small")}
  ${colorVariantsProps}
  ${(p) => p.hasShadow && bluryShadowMixin}
  ${(p) => p.hasGlow && smallGlowMixin}
`;

const Children = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const StyledInput = styled.input<{ isLtr?: boolean }>`
  background-color: transparent;
  font-size: 1rem;
  border: none;
  max-width: 100%;
  width: 100%;
  ${(p) =>
    p.isLtr &&
    css`
      text-align: left;
      direction: ltr;
    `}
  &::placeholder {
    text-align: right;
    font-size: 0.8em;
  }
`;
const IconContainer = styled.div<colorVariantsPropsType>`
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  padding: 0.3em;
  /* ${smallShadowMixin} */
  ${fullRoundedMixin}
  ${colorVariantsProps}
`;

const Error = styled(motion.p)`
  color: white;
  font-size: x-small;
  text-align: center;
  background-color: red;
  ${fullRoundedMixin};
  overflow: hidden;
  padding: 0.1em 0.4em;
  /* position: relative; */
  text-overflow: hidden;
  white-space: nowrap;
`;
