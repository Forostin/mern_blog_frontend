import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "../axios";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { fetchPosts, fetchTags } from "../react/slices/posts";

export const FullPost = () => {
  //  const params = useParams()
    //  console.log(params)
// +++++++++++++++++++
   const dispatch = useDispatch();
   const userData = useSelector((state)=>state.auth.data);//получаем данные авторизации чтобы сравнить id пользователя и дать доступ к редактированию
       console.log(userData)
   const [data, setData] = React.useState(null);
       console.log(data)
   

   const [isLoading, setIsLoading] = React.useState(true);
   const { id } = useParams();
   
 React.useEffect(()=>{
  // -------------------------------------     
        dispatch(fetchPosts())
        dispatch(fetchTags())
        // ------------------------------------------
   setIsLoading(true);
   axios.get(`/posts/${id}`)
        .then(res => {
              setData(res.data)
              setIsLoading(false)
       })
       .catch((err)=>{
        console.warn(err);
        alert('Ошибка получения статьи');
       })
},[dispatch, id]);

if(isLoading){
  return <Post isLoading={isLoading}/>
}
  
// 1. Создаем объект Date из timestamp
const date = new Date(data.createdAt);
// 2. Получаем компоненты даты и времени
const year = date.getFullYear(); // Год
const month = date.getMonth() + 1; // Месяц (0-11, поэтому добавляем 1)
const day = date.getDate(); // День месяца
const hours = date.getHours(); // Часы
const minutes = date.getMinutes(); // Минуты
// const seconds = date.getSeconds(); // Секунды

return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:3002${data.imageUrl}` : ''}
        user={data.user}
        // createdAt={data.createdAt}
        createdAt={ `Дата: ${day}/${month}/${year} ${hours}:${minutes}` }
        // createdAt={"12 июня 2022 г."}
        viewsCount={data.viewsCount} 
        commentsCount={3}
        tags={data.tags}
        isFullPost
        isEditable={userData?._id===data.user._id} //Проверяем может ли пользователь редактировать статью.
       
      >
        <p>
            {data.text}  
        </p>        
      </Post>

      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
