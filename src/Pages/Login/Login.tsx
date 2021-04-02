import styled from "styled-components";
import sea from "Assets/images/sea.jpg";
import { useAtom } from "jotai";
import { LayoutAtom } from "Contexts/LayouContext";
import { useEffect, useState } from "react";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import Input from "Components/Input";
import { ImMobile } from "react-icons/im";
import { RiLockPasswordFill } from "react-icons/ri";
import Button from "Components/Button";
import { spaceYMixinFactory } from "Styles/mixins";
import { useHistory } from "react-router";
import { api } from "Api/Api";
import { useMutate } from "Hooks/useQuery";
import { BsPersonFill } from "react-icons/bs";
import useAuth from "Hooks/useAuth";
import { slideInOutVariant } from "Animations/variants";
import useQueryParams from "Hooks/useQueryParams";

const Login: React.FC = () => {
  const {
    isInCodeStage,
    onChange,
    loginForm,
    sendMobileLogin,
    isSendingMobile,
    sendCode,
    isSendingCode,
    sendRegisterForm,
    isSendingRegisterForm,
    isInRegisterForm,
    setIsInRegisterForm,
    setIsInCodeStage,
    pendingUserId,
    mobileValidate,
    isMobileValdating,
  } = usePageState();
  return (
    <Continer>
      <TitleContainer>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 4, delay: 3, type: "spring" }}
          style={{ letterSpacing: "0.3rem" }}
          className="eng"
        >
          CALM SEA
        </motion.h2>
      </TitleContainer>
      <FormContainer>
        <AnimateSharedLayout>
          <AnimatePresence exitBeforeEnter>
            {!isInCodeStage ? (
              <>
                <AnimatePresence key="name_presence">
                  {isInRegisterForm && (
                    <Input
                      isLtr
                      onChange={onChange}
                      value={loginForm.name}
                      name="name"
                      key="name"
                      motion={{
                        layoutId: "name",
                        initial: { width: 0, opacity: 0 },
                        animate: {
                          width: "100%",
                          opacity: 1,
                          transition: { duration: 1 },
                        },
                        exit: {
                          width: 0,
                          opacity: 0,
                          transition: { duration: 0.5 },
                        },
                      }}
                      icon={<BsPersonFill />}
                      iconColor={{
                        bg: "secondary",
                        hasGlow: false,
                        isGradient: true,
                      }}
                      inputColor={{ bg: "card-bg", isGradient: true }}
                    />
                  )}
                </AnimatePresence>
                <Input
                  isLtr
                  onChange={onChange}
                  value={loginForm.mobile}
                  name="mobile"
                  key="mobile"
                  inputMode="numeric"
                  motion={{
                    layoutId: "mobile",
                    initial: { width: 0, opacity: 0 },
                    animate: {
                      width: "100%",
                      opacity: 1,
                      transition: { delay: 1, duration: 1 },
                    },
                    exit: {
                      width: 0,
                      opacity: 0,
                      transition: { duration: 0.5 },
                    },
                  }}
                  icon={<ImMobile />}
                  iconColor={{
                    bg: "secondary",
                    hasGlow: false,
                    isGradient: true,
                  }}
                  inputColor={{ bg: "card-bg", isGradient: true }}
                />
              </>
            ) : (
              <Input
                isLtr
                onChange={onChange}
                value={loginForm.code || ""}
                name="code"
                key="code"
                inputMode="numeric"
                motion={{
                  layoutId: "code",
                  initial: { width: 0, opacity: 0 },
                  animate: {
                    width: "100%",
                    opacity: 1,
                    transition: { delay: 1, duration: 1 },
                  },
                  exit: { width: 0, opacity: 0, transition: { duration: 0.5 } },
                }}
                icon={<RiLockPasswordFill />}
                iconColor={{
                  bg: "secondary",
                  hasGlow: false,
                  isGradient: true,
                }}
                inputColor={{ bg: "card-bg", isGradient: true }}
              />
            )}
          </AnimatePresence>
          <Button
            layoutId="auth_btn"
            isLoading={
              isSendingMobile ||
              isSendingCode ||
              isSendingRegisterForm ||
              isMobileValdating
            }
            bg="secondary"
            hasGlow
            isGradient
            initial={{ width: 0, opacity: 0 }}
            animate={{
              width: "auto",
              opacity: 1,
              transition: { delay: 1, duration: 1 },
            }}
            onClick={() => {
              if (isInCodeStage && !isInRegisterForm)
                return sendCode(
                  {},
                  { code: +loginForm.code, mobile: loginForm.mobile }
                );
              if (isInCodeStage && isInRegisterForm)
                return mobileValidate(
                  {},
                  { code: +loginForm.code, user_id: pendingUserId }
                );
              if (isInRegisterForm) return sendRegisterForm({}, loginForm);
              sendMobileLogin({}, loginForm);
            }}
          >
            {isInCodeStage
              ? "ارسال کد تایید"
              : isInRegisterForm
              ? "ثبت نام"
              : "ورود"}
          </Button>
        </AnimateSharedLayout>
      </FormContainer>
      <div
        onClick={() => {
          setIsInRegisterForm(!isInRegisterForm);
          setIsInCodeStage(false);
        }}
      >
        <AnimatePresence exitBeforeEnter>
          {isInRegisterForm ? (
            <RegLoginLink key="login_link" {...slideInOutVariant}>
              قبلا ثبت نام کرده اید ؟ ورود
            </RegLoginLink>
          ) : (
            <RegLoginLink key="reg_link" {...slideInOutVariant}>
              ثبت نام نکرده اید ؟ ثبت نام
            </RegLoginLink>
          )}
        </AnimatePresence>
      </div>
    </Continer>
  );
};

export default Login;

const usePageState = function () {
  const [, setLayoutAtom] = useAtom(LayoutAtom);
  const [isInCodeStage, setIsInCodeStage] = useState(false);
  const [isInRegisterForm, setIsInRegisterForm] = useState(false);
  const history = useHistory();
  const [pendingUserId, setPendingUserId] = useState(0);
  const [loginForm, setLoginForm] = useState({
    code: 0,
    mobile: "",
    name: "",
  });
  const { isLoggedIn, loggedIn } = useAuth();
  const queryParams = useQueryParams();
  useEffect(() => {
    const from = queryParams.get("from");
    if (isLoggedIn) {
      return history.push(from || "/");
    }
  }, [isLoggedIn]);
  useEffect(() => {
    setLayoutAtom({ isFullscreen: true });
    return () => {
      setLayoutAtom({ isFullscreen: false });
    };
  }, []);
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value, //TODO typescript issue - should show error because code could be overriten to string value
    });
  };
  const { mutate: sendMobileLogin, isLoading: isSendingMobile } = useMutate(
    api.postAuthAppSendPassword,
    {
      onSuccess: () => {
        setIsInCodeStage((s) => !s); //TODO react issue - findout why ? is use like this not work => setIsInCodeStage(true) // whyyyy?
      },
    }
  );
  const {
    mutate: sendRegisterForm,
    isLoading: isSendingRegisterForm,
  } = useMutate(api.postAuthAppRegister, {
    onSuccess: (res) => {
      setIsInCodeStage((s) => !s);
      setPendingUserId(res.data.user_id);
    },
  });
  const { mutate: sendCode, isLoading: isSendingCode } = useMutate(
    api.postAuthAppLogin,
    {
      onSuccess(res) {
        loggedIn(res.data.token, res.data.user);
      },
    }
  );
  const { mutate: mobileValidate, isLoading: isMobileValdating } = useMutate(
    api.postAuthMobileValidation,
    {
      onSuccess(res) {
        loggedIn(res.data.token, res.data.user);
      },
    }
  );

  return {
    isInCodeStage,
    onChange,
    loginForm,
    sendMobileLogin,
    isSendingMobile,
    sendCode,
    isSendingCode,
    sendRegisterForm,
    isSendingRegisterForm,
    isInRegisterForm,
    setIsInRegisterForm,
    setIsInCodeStage,
    pendingUserId,
    mobileValidate,
    isMobileValdating,
  };
};

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

const RegLoginLink = styled(motion.h5)`
  width: 100%;
  text-align: center;
  padding: 0.3em;
`;
