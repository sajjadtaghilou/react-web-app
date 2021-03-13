import { motion, useCycle } from "framer-motion";
import styled, { DefaultTheme, ThemeContext } from "styled-components";
import {
  fullRoundedMixin,
  glowMixinFactory,
  gradientMixinFactory,
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
    color: theme.palette.common.white,
    ...linearGradient({
      colorStops: [
        transparentize(0.7, theme.palette.tertiary.main),
        transparentize(0.7, theme.palette.tertiary.gradient),
      ],
      toDirection: "to top right",
    }),
  },
  closed: {
    color: theme.palette.common.light,
    ...linearGradient({
      colorStops: [
        transparentize(1, theme.palette.tertiary.main),
        transparentize(1, theme.palette.tertiary.gradient),
      ],
      toDirection: "to top right",
    }),
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
  ${fullRoundedMixin};
  & > span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
