import React from "react";
import { PencilLine } from "phosphor-react";

import styles from "./Sidebar.module.css";
import { Avatar } from "../Avatar";

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <img
        className={styles.cover}
        src="https://images.unsplash.com/photo-1511376777868-611b54f68947?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZGV2ZWxvcG1lbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=50"
      />
      <div className={styles.profile}>
        <Avatar src="https://github.com/kleberfreire.png" />
        <strong>Kleber Freire</strong>
        <span>Web Developer</span>
      </div>
      <footer>
        <a href="#">
          <PencilLine size={20} />
          Editar seu perfil
        </a>
      </footer>
    </aside>
  );
}
