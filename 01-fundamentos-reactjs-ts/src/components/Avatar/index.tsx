import { ImgHTMLAttributes} from 'react'

import styles from "./avatar.module.css";

interface IAvatar extends ImgHTMLAttributes<HTMLImageElement> {
  hasBorder?: boolean, 
}

export function Avatar({ hasBorder = true, ...props }: IAvatar) {
  return (
    <img
      className={hasBorder ? styles.avatarWithBorder : styles.avatar}
      {...props}
    />
  );
}
