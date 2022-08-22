import { useState } from "react";
import { Header } from "./components/Header";

import style from "./App.module.css";

import "./globals.css";
import { Sidebar } from "./components/Sidebar";
import { Post } from "./components/Post";

const posts = [
  {
    id: 1,
    author: {
      avatarUrl: "https://github.com/kleberfreire.png",
      name: "Kleber Freire",
      role: "Web Developer",
    },
    content: [
      { type: "paragraph", content: `Fala galeraa 👋` },
      {
        type: "paragraph",
        content: ` Acabei de subir mais um projeto no meu portifa. É um projeto que fiz
          no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀`,
      },
      { type: "link", content: `jane.design/doctorcare` },
    ],
    publishedAt: new Date('2022-05-03 20:00:00'),
  },
  {
    id: 2,
    author: {
      avatarUrl: "https://github.com/diego3g.png",
      name: "Kleber Freire",
      role: "CTO @Rocketseat",
    },
    content: [
      { type: "paragraph", content: `Fala galeraa 👋` },
      {
        type: "paragraph",
        content: ` Acabei de subir mais um projeto no meu portifa. É um projeto que fiz
          no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀`,
      },
      { type: "link", content: `jane.design/doctorcare` },
    ],
    publishedAt: new Date('2022-05-10 20:00:00'),
  },
];

function App() {

  return (
    <div>
      <Header />

      <div className={style.wrapper}>
        <Sidebar />
        <main>
          { posts.map(function (post) {
            return (
              <Post key={post.id} 
                author={post.author}	
                content={post.content} 
                publishedAt={post.publishedAt} 
            />);
          })}
        </main>
      </div>
    </div>
  );
}

export default App;
