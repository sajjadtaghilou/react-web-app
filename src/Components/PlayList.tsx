import styled from "styled-components";
import { HiLockClosed } from "react-icons/hi";
import { BsPlayFill } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";

export interface PlayListProps {
  items: { title: string }[]; //TODO add music or meditation
}

const PlayList: React.FC<PlayListProps> = ({ items }) => {
  return (
    <Swiper
      centeredSlides
      direction="vertical"
      style={{ height: "100%", width: "100%" }}
      slidesPerView="auto"
    >
      {items.map((item) => (
        <SwiperSlide style={{ height: "auto" }}>
          <ListItem>
            <BsPlayFill />
            <p className="title">{item.title}</p>
            <HiLockClosed />
          </ListItem>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default PlayList;

const ListContainer = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const ListItem = styled.li`
  display: flex;
  justify-content: center;
  padding: 0.5em;
  & .title {
    flex: 1;
    text-align: center;
  }
`;
