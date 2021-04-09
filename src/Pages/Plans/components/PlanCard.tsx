import { SubscriptionPlan } from "Api/GeneratedApi";
import styled from "styled-components";
import { colorVariantsProps, colorVariantsPropsType } from "Styles/props";
// import headBg from "Assets/images/head-bg.jpg";
import sea from "Assets/images/sea.jpg";
import Button from "Components/Button";
import { bluryShadowMixin, fullRoundedMixin } from "Styles/mixins";
import { useMutate } from "Hooks/useQuery";
import { api } from "Api/Api";

const PlanCard: React.FC<{ plan: SubscriptionPlan }> = ({ plan }) => {
  const { mutate: payment, isLoading } = useMutate(api.postPayment);
  return (
    <Container>
      <BodyContainer>
        <Title>{plan.title}</Title>
        <Price>{plan.price.toLocaleString()}</Price>
        <Description>{plan.description}</Description>
        <ButtonContainer>
          <Button
            fullWidth
            fullRounded
            bg="primary"
            isLoading={isLoading}
            disabled={isLoading}
            onClick={() =>
              payment(
                {
                  onSuccess(res) {
                    window.location.href = `${process.env.REACT_APP_ZARINPAL_STARTPAY_URL}${res.data.payment.authority}`;
                  },
                },
                { subscription_plan_id: plan.id }
              )
            }
          >
            خرید
          </Button>
        </ButtonContainer>
      </BodyContainer>
    </Container>
  );
};

export default PlanCard;

const Container = styled.div<colorVariantsPropsType>`
  width: 100%;
  height: 80%;
  margin: auto 0;
  display: flex;
  position: relative;
  flex-direction: column;
  padding: 2rem;
  align-items: center;
  border-radius: 1rem;
  background-image: url(${sea});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 0 -10%;
  ${colorVariantsProps}
`;

const OverlayGradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    0deg,
    ${(p) => p.theme.palette.bg.main} 0%,
    rgba(0, 212, 255, 0) 70%
  );
  border-radius: 0.9rem;
`;
const BodyContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h3`
  background-color: ${(p) => p.theme.palette.bg.main};
  padding: 0.7rem 2.5rem;
  color: ${(p) => p.theme.palette.common.white};
  font-weight: bold;
  ${bluryShadowMixin};
  ${fullRoundedMixin};
`;

const Price = styled.h1`
  color: ${(p) => p.theme.palette.common.white};
  font-weight: bold;
  font-size: 3rem;
  position: relative;
  &::after {
    position: absolute;
    content: "تومان";
    bottom: -10px;
    left: 0;
    right: 0;
    font-size: 0.8rem;
    display: flex;
    justify-content: center;
  }
`;

const Description = styled.h5`
  color: ${(p) => p.theme.palette.common.white};
  text-align: center;
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 0;
  transform: translateY(50%);
  left: 25%;
  right: 25%;
`;
