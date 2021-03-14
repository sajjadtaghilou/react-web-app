import React from "react";
import { ButtonHTMLAttributes } from "react";
import styled, { css } from "styled-components";
import { fullRoundedMixin, roundedMixin } from "Styles/mixins";
import { colorVariantsProps, colorVariantsPropsType } from "Styles/props";
import { PaletteColorKeysType } from "types/paletteType";

type ButtonProps = {
  fullRounded?: boolean;
  hasShadow?: boolean;
  isLoading?: boolean;
  fullWidth?: boolean;
};

const Button: React.FC<
  ButtonProps & { icon?: JSX.Element } & colorVariantsPropsType &
    React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, icon, isLoading, ...props }) => {
  return (
    <ButtonContainer {...props}>
      <Children>
        {icon}
        {children}
      </Children>
    </ButtonContainer>
  );
};

export default Button;

export const ButtonContainer = styled.button<
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

const Children = styled.div`
  position: relative;
  /* top:0;left:0;right:0;bottom:0; */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;
