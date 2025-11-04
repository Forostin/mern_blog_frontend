import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "../axios";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";

export const FullPost = () => {
  const { id } = useParams();

  const userData = useSelector((state) => state.auth.data);;//получаем данные авторизации чтобы сравнить id пользователя и дать доступ к редактированию

  const [data, setData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [comments, setComments] = React.useState([]);

  // const handleNewComment = (newComment) => {
  //     setComments(prev => [...prev, newComment]);
  // };

  React.useEffect(() => {
      axios.get(`/posts/${id}/comments`).then((res) => {
      setComments(res.data);
    });
  }, [id]);

  React.useEffect(() => {
    setIsLoading(true);

    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert("Ошибка при получении статьи 😢");
      });
  }, [id]); // ✅ только id

  if (isLoading) {
    return <Post isLoading={true} isFullPost />;
  }
// ---------------------------------------------------------
// 1. Создаем объект Date из timestamp
// const date = new Date(data.createdAt);
// // 2. Получаем компоненты даты и времени
// const year = date.getFullYear(); // Год
// const month = date.getMonth() + 1; // Месяц (0-11, поэтому добавляем 1)
// const day = date.getDate(); // День месяца
// const hours = date.getHours(); // Часы
// const minutes = date.getMinutes(); // Минуты
// // const seconds = date.getSeconds(); // Секунды
// // -------------------------------------------------------------

  // ✅ Форматирование даты (чисто и красиво)
  const date = new Date(data.createdAt);
  const formattedDate = date.toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <Post
        id={data._id} 
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:3002${data.imageUrl}` : ""}
        user={data.user}
        createdAt={`Дата: ${formattedDate}`}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
        isEditable={userData?._id === data.user._id}  //Проверяем может ли пользователь редактировать статью.
      >
        <p>{data.text}</p>
      </Post>
  {/* <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Вася Пупкин',
                  avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Иван Иванов',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          /> */}
     <CommentsBlock items={comments} isLoading={false}>
                   <Index postId={id} setComments={setComments} />
               {/* <Index postId={id} onAddComment={handleNewComment} /> */}

     </CommentsBlock>
    </>
  );
};