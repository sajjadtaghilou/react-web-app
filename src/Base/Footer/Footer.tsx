import { motion, AnimateSharedLayout } from "framer-motion";
import styled from "styled-components";
import { bluryShadowMixin } from "Styles/mixins";
import { RiHomeLine } from "react-icons/ri";
import { CgList } from "react-icons/cg";
import { BiUser, BiLineChart } from "react-icons/bi";
import NavItem from "./components/NavItem";
import { Link, matchPath, useLocation } from "react-router-dom";

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
    icon: <CgList />,
    title: "دوره ها",
    path: "/lectures",
  },
  {
    icon: <BiUser />,
    title: "پروفایل",
    path: "/profile",
  },
  {
    icon: <BiLineChart />,
    title: "تحلیل",
    path: "/analytics",
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
            <Link to={nav.path}>
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
  border-top-left-radius: 2em;
  border-top-right-radius: 2em;
  padding: 1em 1.3em;
  background-color: ${(p) => p.theme.palette["card-bg"].main};
  ${bluryShadowMixin}
`;

const NavItemUl = styled(motion.ul)`
  display: flex;
  justify-content: space-around;
`;
