import React, { ChangeEvent, FormEvent, InvalidEvent } from "react";
import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { Avatar } from "../Avatar";
import { Comment } from "../Comment";

import style from "./Post.module.css";
import { useState } from "react";

interface IAuthor {
  avatarUrl: string,
  name: string,
  role: string,
}

interface IContent {
  type: string, 
  content: string
}


interface IPostProps {
  author: IAuthor
  content: IContent[]
  publishedAt: Date,
}

interface IComments {
  id: number,
  content: string
}


export function Post({ author, content, publishedAt }: IPostProps) {
  const [comments, setComments] = useState<IComments[]>([])
  const [newCommentText, setNewCommentText] = useState<string>('')

  const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR,
  } ) 

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  })

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault();
    setComments([...comments, { id: comments.length + 1, content: newCommentText}])
    setNewCommentText('')

  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("")
    setNewCommentText(event.target.value);
  }

  function handleNewCommentInvalid (event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("Esse campo é obrigatório!")
  }

  function  deleteComment (id: number) {
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
