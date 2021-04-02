import { api } from "Api/Api";
import Page from "Components/Page";
import { useGet } from "Hooks/useQuery";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import PlanCard from "./components/PlanCard";

const Plans: React.FC = () => {
  const { data } = useGet(api.getSubscriptionPlans);
  return (
    <Page>
      <Container>
        <Swiper
          spaceBetween={10}
          slidesPerView="auto"
          style={{ padding: "0 10px", height: "100%" }}
          centeredSlides
        >
          {data &&
            Array.from(data.data.subscription_plans).map((plan) => (
              <SwiperSlide
                style={{ width: "80vw", height: "100%", display: "flex" }}
              >
                <PlanCard plan={plan} />
              </SwiperSlide>
            ))}
        </Swiper>
      </Container>
    </Page>
  );
};

export default Plans;

const Container = styled.div`
  width: 100%;
  /* height: 200px; */
  /* display: flex; */
  /* flex-wrap: nowrap;
  flex-direction: column; */
  flex: 1;
  /* & > * {
    flex-shrink: 0;
  } */
`;

// const Container = styled.div`
//   width: 100%;
//   margin: 0 auto;
//   flex: 1;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
// `;
