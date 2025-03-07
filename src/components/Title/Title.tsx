import { FC } from "react";
import styles from "./Title.module.css";
type Props = {
  text: string;
};

export const Title: FC<Props> = ({ text }) => {
  return <h1 className={styles.title}>{text}</h1>;
};
