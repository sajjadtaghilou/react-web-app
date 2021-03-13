import styled from "styled-components";
import { ifProp } from "styled-tools";

export const SpaceX = styled.div<{ size?: "small" | "large" }>`
  & > * + * {
    margin-right: ${ifProp({ size: "large" }, "1em", "0.5em")};
  }
`;
export const SpaceY = styled.div<{ size?: "small" | "large" }>`
  & > * + * {
    margin-bottom: ${ifProp({ size: "large" }, "1em", "0.5em")};
  }
`;
