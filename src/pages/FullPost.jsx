import React from "react";
import { useParams } from "react-router-dom";
import axios from "../axios";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";


import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';

export const FullPost = () => {
   const params = useParams()
     console.log(params)
  
// +++++++++++++++++++
   const [data, setData] = React.useState(null);
 console.log(setData)


   const [isLoading, setIsLoading] = React.useState(true);
   const { id } = useParams();

 React.useEffect(()=>{
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
},[id]);

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
const seconds = date.getSeconds(); // Секунды

return (
    <>
      <Post
      
        id={data.id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:3002${data.imageUrl}` : ''}
        user={data.user}
        // user={{
        //   avatarUrl:
        //     "https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png",
        //   fullName: "Keff",
        // }}
        // createdAt={data.createdAt}
       createdAt={ `Дата: ${day}/${month}/${year} ${hours}:${minutes}` }
        // createdAt={"12 июня 2022 г."}
        viewsCount={data.viewsCount} 
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
        <p>
            {data.text}  
        </p>    
        {Post.isEditable && (
        <ButtonGroup variant="contained" aria-label="Basic button group">
            <Button>Редагувати</Button>
            <Button>Видалити<DeleteForeverSharpIcon /></Button>
        </ButtonGroup>
        )}
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
