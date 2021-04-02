import { api } from "Api/Api";
import Button from "Components/Button";
import Input from "Components/Input";
import { AuthAtom } from "Contexts/AuthContext";
import { useGet, useMutate } from "Hooks/useQuery";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { BsCollectionPlayFill } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { useSnackbar } from "react-simple-snackbar";
import styled from "styled-components";
import { spaceYMixinFactory } from "Styles/mixins";
import { calcDayDifferenceFromNow } from "Utils/dateUtils";
import { parseQuery } from "Utils/queryUtils";
import { checkUserHasSubscribtion } from "Utils/userUtils";

const ProfileInfo: React.FC = () => {
  const [{ user, isLoggedIn }, setAuthAtom] = useAtom(AuthAtom);
  const { isLoading, mutate: updateUserSubscribtion } = useMutate(
    api.postPaymentVerify,
    {
      onSuccess(res) {
        setAuthAtom({
          isLoggedIn,
          user: {
            ...user!,
            subscription: res.data.user_subscription,
          },
        });
      },
    }
  );
  const loc = useLocation();
  const { Authority, Status } = parseQuery(loc.search);
  const [openSnackbar] = useSnackbar({
    position: "top-center",
    style: {
      fontFamily: "inherit",
      textAlign: "right",
      direction: "ltr",
      background: "green",
    },
  });
  useEffect(() => {
    if (Status === "OK") {
      setTimeout(() => {
        openSnackbar("پرداخت با موفقیت انجام شد");
        updateUserSubscribtion({}, { authority: Authority });
      }, 500);
    }
  }, []);
  return (
    <Container>
      <Input
        icon={<h6>نام کاربری</h6>}
        iconColor={{
          bg: "card-bg",
          hasGlow: true,
        }}
        inputColor={{ bg: "card-bg", isGradient: true }}
        disabled
        value={user?.name}
        style={{ textAlign: "left" }}
      />
      <Input
        icon={<h6>شماره موبایل</h6>}
        iconColor={{
          bg: "card-bg",
          hasGlow: true,
        }}
        inputColor={{ bg: "card-bg", isGradient: true }}
        disabled
        value={user?.mobile}
        style={{ textAlign: "left" }}
      />
      <Input
        icon={user?.subscription && <h6>اعتبار</h6>}
        iconColor={{
          bg: "card-bg",
          hasGlow: true,
        }}
        inputColor={{ bg: "card-bg", isGradient: true }}
        style={{ textAlign: "left" }}
        disabled
        value={
          isLoading
            ? "در حال بروزرسانی"
            : user?.subscription && checkUserHasSubscribtion(user)
            ? `${calcDayDifferenceFromNow(
                new Date(user.subscription.end_date)
              )} روز`
            : "اعتبار شما پایان یافته"
        }
      />
      <Button
        bg="secondary"
        isGradient
        hasGlow
        icon={<BsCollectionPlayFill />}
        style={{ marginTop: "1em" }}
      >
        <Link to="/plans">افزایش اعتبار</Link>
      </Button>
    </Container>
  );
};

export default ProfileInfo;

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${spaceYMixinFactory("small")}
`;
