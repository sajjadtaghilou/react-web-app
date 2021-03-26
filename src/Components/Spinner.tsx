import { BiLoaderAlt } from "react-icons/bi";
import styled, { keyframes } from "styled-components";

const rotationKeyframe = keyframes`
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
`;
export default styled(BiLoaderAlt)`
  animation: ${rotationKeyframe} 1s linear infinite;
`;
