import { motion, AnimateSharedLayout } from "framer-motion";
import styled from "styled-components";
import { bluryShadowMixin } from "Styles/mixins";
import { RiHomeLine, RiMusic2Fill } from "react-icons/ri";
import { GiMeditation } from "react-icons/gi";
import { BiUser, BiLineChart } from "react-icons/bi";
import NavItem from "./components/NavItem";
import { Link, matchPath, useLocation } from "react-router-dom";
import { transparentize } from "polished";

const navRoutes: {
  title: string;
  icon: JSX.Element;
  path: string;
  isExact?: boolean;
}[] = [
  {
    icon: <RiHomeLine />,
    title: "خانه",
    path: "/",
    isExact: true,
  },
  {
    icon: <GiMeditation />,
    title: "مدیتیشن",
    path: "/meditations",
  },
  {
    icon: <RiMusic2Fill />,
    title: "موزیک",
    path: "/musics",
  },
  {
    icon: <BiUser />,
    title: "پروفایل",
    path: "/login",
    // path: "/profile",
  },
];

const Footer: React.FC = () => {
  const location = useLocation();
  const checkIsMatch = (path: string, isExact?: boolean) =>
    !!matchPath(location.pathname, {
      exact: !!isExact,
      path,
    });
  return (
    <AnimateSharedLayout>
      <Nav>
        <NavItemUl>
          {navRoutes.map((nav) => (
            <Link to={nav.path} key={nav.path}>
              <NavItem
                icon={nav.icon}
                title={nav.title}
                isActive={checkIsMatch(nav.path, !!nav.isExact)}
              />
            </Link>
          ))}
        </NavItemUl>
      </Nav>
    </AnimateSharedLayout>
  );
};

export default Footer;

const Nav = styled.nav`
  border-radius: 0.7em;
  margin: 0.4em;
  padding: 0.5em;
  background-color: ${(p) =>
    transparentize(0.4, p.theme.palette["card-bg"].main)};
  backdrop-filter: blur(10px);
  /* ${bluryShadowMixin} */
`;

const NavItemUl = styled(motion.ul)`
  display: flex;
  justify-content: space-between;
`;
