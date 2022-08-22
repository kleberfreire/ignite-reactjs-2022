import React from "react";
import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { Avatar } from "../Avatar";
import { Comment } from "../Comment";

import style from "./Post.module.css";
import { useState } from "react";


export function Post({ author, content, publishedAt }) {
  const [comments, setComments] = useState([])
  const [newCommentText, setNewCommentText] = useState('')

  const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR,
  } ) 

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  })

  function handleCreateNewComment(event) {
    event.preventDefault();
    setComments([...comments, { id: comments.length + 1, content: newCommentText}])
    setNewCommentText('')

  }

  function handleNewCommentChange(event) {
    event.target.setCustomValidity("")
    setNewCommentText(event.target.value);
  }

  function handleNewCommentInvalid () {
    event.target.setCustomValidity("Esse campo é obrigatório!")
  }

  function  deleteComment (id) {
    const commentsWithoutDeletedOne = comments.filter(comment => comment.id !== id)
    setComments(commentsWithoutDeletedOne)
  }

  const isNewCommentEmpty = newCommentText.length === 0

  return (
    <article className={style.post}>
      <header>
        <div className={style.author}>
          <Avatar src={author.avatarUrl} />
          <div className={style.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time>
      </header>
      <div className={style.content}>
        {content.map(line => {
          if(line.type === 'paragraph') {
            return (
              <p key={line.content + (Math.random() * (10000 - 1) + 1)}>
                {line.content}
              </p>
            )
          }
          if(line.type === 'link') {
            return (
              <p key={line.content}><a href="/" >👉 {line.content + (Math.random() * (1000 - 1) + 1)}</a></p>
            )
          }

          return null
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={style.commentForm}>
        <strong>Deixe seu comentário</strong>
        <textarea 
          name="comment" value={newCommentText} 
          onChange={handleNewCommentChange} 
          placeholder="Deixe seu comentário" 
          onInvalid={handleNewCommentInvalid}
          required
        />
        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>Publicar</button>
        </footer>
      </form>

      <div className={style.commentList}>
        { comments.map(comment => {
          return (
            <Comment 
              key={comment.id + (Math.random() * (10000 - 1) + 1)} 
              id={comment.id} 
              content={comment.content}
              onDeleteComment={deleteComment} 
            />
          )
        })}
      </div>
    </article>
  );
}
