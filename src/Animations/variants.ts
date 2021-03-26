import { AnimationProps, MotionProps } from "framer-motion";

export const slideInOutVariant: AnimationProps & MotionProps = {
  initial: "initial",
  animate: "animate",
  exit: "exit",
  variants: {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
  },
};
