import React from "react";
import { useParams } from "react-router-dom";
import axios from "../axios";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";

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
  
  return (
    <>
      <Post
        id={data.id}
        title={data.title}
        imageUrl={`http://localhost:3002${data.imageUrl}`}
        user={data.user}
        // user={{
        //   avatarUrl:
        //     "https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png",
        //   fullName: "Keff",
        // }}
        createdAt={data.createdAt}
        // createdAt={"12 июня 2022 г."}
        viewsCount={data.viewsCount} 
        // viewsCount={150}
        commentsCount={3}
        tags={data.tags}
        isFullPost
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
