import { FC, HTMLAttributes } from "react";
import styles from "./Title.module.css";
type Props = {
  text: string;
} & HTMLAttributes<HTMLHeadingElement>;

export const Title: FC<Props> = ({ text, ...props }) => {
  return (
    <h1 className={styles.title} {...props}>
      {text}
    </h1>
  );
};
