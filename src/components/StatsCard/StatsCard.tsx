import React from "react";

import styles from './style.module.scss'

interface StatsCardProps {
  title: string;
  value: number;
}
export const StatsCard: React.FC<StatsCardProps> = ({title, value}) => {
  return (
    <article className={styles.stats_card}>
      <h2>{title}</h2>
      <span>{value}</span>
    </article>
  )
}