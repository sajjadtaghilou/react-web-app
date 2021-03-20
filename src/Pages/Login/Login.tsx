import Page from "Components/Page";
import styled from "styled-components";
import sea from "Assets/images/sea.jpg";
import { useAtom } from "jotai";
import { LayoutAtom } from "Contexts/LayouContext";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Input from "Components/Input";
import { AiOutlineUser } from "react-icons/ai";
import Button from "Components/Button";
import { spaceYMixinFactory } from "Styles/mixins";

const Login: React.FC = () => {
  const [, setLayoutAtom] = useAtom(LayoutAtom);
  useEffect(() => {
    setLayoutAtom({ isFullscreen: true });
    return () => {
      setLayoutAtom({ isFullscreen: false });
    };
  }, []);
  return (
    <Continer>
      <TitleContainer>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 4, delay: 8, type: "spring" }}
          style={{ letterSpacing: "0.3rem" }}
        >
          CALM SEA
        </motion.h2>
      </TitleContainer>
      <FormContainer>
        <Input
          motion={{
            initial: { width: 0, opacity: 0 },
            animate: { width: "100%", opacity: 1 },
            transition: { delay: 1, duration: 1 },
          }}
          icon={<AiOutlineUser />}
          iconColor={{ bg: "secondary", hasGlow: false, isGradient: true }}
          inputColor={{ bg: "card-bg", isGradient: true }}
        />
        <Button
          bg="secondary"
          hasGlow
          isGradient
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "auto", opacity: 1 }}
          // transition={{ delay: 4 }}
        >
          ورود
        </Button>
      </FormContainer>
    </Continer>
  );
};

export default Login;

const Continer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url(${sea});
  background-size: cover;
`;

const TitleContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const FormContainer = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  ${spaceYMixinFactory("large")}
  width:60%;
`;
