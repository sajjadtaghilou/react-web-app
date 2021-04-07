import styled from "styled-components";
import { HiLockClosed } from "react-icons/hi";
import { BsPlayFill } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import { roundedMixin } from "Styles/mixins";

export interface PlayListProps {
  items: { title: string; isUnlocked: boolean }[]; //TODO add music or meditation
  onItemClicked: (index: number) => void;
}

const PlayList: React.FC<PlayListProps> = ({ items, onItemClicked }) => {
  return (
    <Swiper
      centeredSlides
      direction="vertical"
      style={{ height: "100%", width: "100%" }}
      slidesPerView="auto"
    >
      {items.map((item, i) => (
        <SwiperSlide
          onClick={() => onItemClicked(i)}
          style={{
            height: "auto",
            pointerEvents: !item.isUnlocked ? "all" : "none",
            touchAction: !item.isUnlocked ? "all" : "none",
          }}
        >
          <ListItem>
            <BsPlayFill />
            <p className="title">{item.title}</p>
            <HiLockClosed style={{ opacity: item.isUnlocked ? 1 : 0 }} />
          </ListItem>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default PlayList;

const ListContainer = styled.ul`
  width: 95%;
  display: flex;
  flex-direction: column;
`;
const ListItem = styled.li`
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: center;
  padding: 1em;
  border: 1px solid white;
  height: 90%;
  ${roundedMixin}
  & .title {
    flex: 1;
    text-align: center;
  }
`;
