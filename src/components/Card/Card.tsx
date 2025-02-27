import { FC, ReactNode } from "react";
import styles from "./Card.module.css";

type Props = {
  children: ReactNode;
  className?: string;
};

export const Card: FC<Props> = ({ children,className }) => {
  return <div className={`${styles.card} ${className}`}>{children}</div>;
};
