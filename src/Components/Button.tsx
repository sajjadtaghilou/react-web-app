import { motion, HTMLMotionProps, AnimatePresence } from "framer-motion";
import React from "react";
import { ButtonHTMLAttributes } from "react";
import styled, { css } from "styled-components";
import { fullRoundedMixin, roundedMixin } from "Styles/mixins";
import { colorVariantsProps, colorVariantsPropsType } from "Styles/props";
import { PaletteColorKeysType } from "types/paletteType";
import Spinner from "./Spinner";

type ButtonProps = {
  fullRounded?: boolean;
  hasShadow?: boolean;
  isLoading?: boolean;
  fullWidth?: boolean;
};

const Button: React.FC<
  ButtonProps & { icon?: JSX.Element } & colorVariantsPropsType &
    HTMLMotionProps<"button">
> = ({ children, icon, isLoading, ...props }) => {
  return (
    <ButtonContainer {...props}>
      <AnimatePresence>
        {isLoading && (
          <SpinnerContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Spinner />
          </SpinnerContainer>
        )}
      </AnimatePresence>
      <Children
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ delay: isLoading ? 0 : 0.5 }}
      >
        {icon}
        {children}
      </Children>
    </ButtonContainer>
  );
};

export default Button;

export const ButtonContainer = styled(motion.button)<
  ButtonProps & colorVariantsPropsType
>`
  ${(p) =>
    p.fullWidth &&
    css`
      width: 100%;
    `};
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  padding: 0.3em 1em;
  ${(p) => (p.fullRounded ? fullRoundedMixin : roundedMixin)};
  ${(p) =>
    (p.isLoading || p.disabled) &&
    css`
      cursor: not-allowed;
      opacity: 0.8;
      background-color: ${p.theme.palette["card-bg"].main};
    `};
  ${colorVariantsProps}
`;

const Children = styled(motion.div)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const SpinnerContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
