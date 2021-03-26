import { motion } from "framer-motion";
import styled from "styled-components";
import { fullRoundedMixin } from "Styles/mixins";
import { colorVariantsProps, colorVariantsPropsType } from "Styles/props";

const Chip = styled(motion.h5)<
  { isSelected?: boolean } & colorVariantsPropsType
>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.1em 0.3em;
  background-color: ${(p) => p.theme.palette["card-bg"].main};
  ${(p) => p.isSelected && colorVariantsProps(p)};
  ${fullRoundedMixin}
`;

export default Chip;
