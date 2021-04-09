import { motion, useCycle } from "framer-motion";
import styled, { DefaultTheme, ThemeContext } from "styled-components";
import {
  fullRoundedMixin,
  glowMixinFactory,
  gradientMixinFactory,
  roundedMixin,
} from "Styles/mixins";
import { transparentize, linearGradient } from "polished";
import { useContext, useMemo } from "react";

const titleVariantsFactory = (theme: DefaultTheme) => ({
  open: {
    x: 0,
    maxWidth: 100,
    marginRight: "0.5em",
  },
  closed: {
    x: "-100%",
    maxWidth: 0,
    marginRight: "0em",
  },
});
const navVariantsFactory = (theme: DefaultTheme) => ({
  open: {
    color: theme.palette.secondary.contrast,
    backgroundColor: theme.palette.secondary.main,
  },
  closed: {
    color: theme.palette.secondary.contrast,
    backgroundColor: theme.palette.secondary.main,
  },
});

const NavItem: React.FC<{
  isActive?: boolean;
  icon: JSX.Element;
  title: string;
}> = ({ isActive, icon, title }) => {
  const theme = useContext(ThemeContext);
  const navVariants = useMemo(() => navVariantsFactory(theme), [theme]);
  const titleVariants = useMemo(() => titleVariantsFactory(theme), [theme]);
  return (
    <NavItemLi
      layout
      variants={navVariants}
      animate={isActive ? "open" : "closed"}
    >
      {icon}
      <motion.span
        transition={{ type: "just" }}
        variants={titleVariants}
        animate={isActive ? "open" : "closed"}
        style={{ overflow: "hidden" }}
      >
        {title}
      </motion.span>
    </NavItemLi>
  );
};

export default NavItem;

const NavItemLi = styled(motion.li)`
  /* overflow: hidden; */
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 0.2em 0.8em;
  ${roundedMixin};
  & > span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
