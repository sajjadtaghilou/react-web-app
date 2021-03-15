import { transparentize } from "polished";
import styled from "styled-components";
import { fullRoundedMixin, spaceXMixinFactory } from "Styles/mixins";

const Input: React.FC<
  { icon?: JSX.Element } & React.DOMAttributes<HTMLInputElement>
> = ({ icon, children, ...inputProps }) => {
  return (
    <Container>
      {icon && <IconContainer>{icon}</IconContainer>}
      <StyledInput {...inputProps} />
    </Container>
  );
};

export default Input;

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 0.2em 1em;
  max-width: 100%;
  background-color: transparent;
  border: 1px solid ${(p) => transparentize(0.5, p.theme.palette.common.white)};
  color: ${(p) => transparentize(0.2, p.theme.palette.common.white)};
  ${fullRoundedMixin}
  ${spaceXMixinFactory("small")}
`;
const StyledInput = styled.input`
  background-color: transparent;
  font-size: 1rem;
  border: none;
  flex: 1;
`;
const IconContainer = styled.div`
  border-radius: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: ${(p) =>
    transparentize(0.85, p.theme.palette.common.white)};
  backdrop-filter: blur(0.07em); */
`;
