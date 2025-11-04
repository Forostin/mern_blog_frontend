import React from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import axios from "../../axios"; //  правильный импорт

export const Index = ({ postId, setComments }) => {
  const [comment, setComment] = React.useState("");

  const addComment = async () => {
    try {
      if (!comment.trim()) {
        alert("Комментарий пустой");
        return;
      }

      const { data } = await axios.post(`/posts/${postId}/comments`, {
        text: comment,
      });

      setComments(prev => [...prev, data]); //  добавляем новый комментарий в список
      setComment("");
    } catch (err) {
      console.warn(err);
      alert("Ошибка при добавлении комментария");
    }
  };

  return (
    <div className={styles.root}>
      <Avatar classes={{ root: styles.avatar }} src="https://mui.com/static/images/avatar/5.jpg" />
      <div className={styles.form}>
        <TextField
          label="Написати коментарій"
          variant="outlined"
          maxRows={10}
          multiline
          fullWidth
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button variant="contained" onClick={addComment}>
          Отправить
        </Button>
      </div>
    </div>
  );
};