import Page from "Components/Page";
import styled from "styled-components";
import sea from "Assets/images/sea.jpg";
import { useAtom } from "jotai";
import { LayoutAtom } from "Contexts/LayouContext";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Input from "Components/Input";
import { AiOutlineUser } from "react-icons/ai";

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
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 4, delay: 3, type: "spring" }}
        >
          CALM SEA
        </motion.h1>
      </TitleContainer>
      <FormContainer>
        <Input icon={<AiOutlineUser />} />
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
`;
