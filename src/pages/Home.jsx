import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
// import axios from '../axios'
import { fetchPosts, fetchTags, sortTimePosts, sortPopularPosts } from '../react/slices/posts';

export const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state)=>state.auth.data);
  const {posts, tags} = useSelector((state)=>state.posts); 

  const isPostsLoading = posts.status === 'loading'
  const isTagsLoading = tags.status === 'loading'



  React.useEffect(()=>{
        dispatch(fetchPosts())  
        dispatch(fetchTags())
         // axios.get('/posts')
      },[dispatch]);
      console.log(tags)

const clickSortTime = () => { 
  dispatch(sortTimePosts()) 
};

const clickSortPopular = () => {
  dispatch(sortPopularPosts())
};

      // меняем формат даты на более читабельный:
      const formatDate = (isoString) => {
          if (!isoString) return ''; // защита на случай, если даты нет
          const date = new Date(isoString);
          const day = String(date.getDate()).padStart(2, '0');
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const year = date.getFullYear();
          return `Дата: ${day}/${month}/${year}`;
      };

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
          <Tab label="Новые" onClick={clickSortTime}/>
          <Tab label="Популярные" onClick={clickSortPopular}/>
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {( isPostsLoading ? [...Array(5)] : posts.items ).map((obj, index) => 
            isPostsLoading ? (
            <Post key={index} isLoading={true}   />
             ) : (
            <Post 
              key={obj._id}
              id={obj._id}
              title={obj.title}
              imageUrl={obj.imageUrl ? `http://localhost:3002${obj.imageUrl}`: ''}
              // user={{
              //   avatarUrl:
              //     'https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png',
              //   fullName: 'Keff',
              // }}
              user={obj.user}
              createdAt={formatDate(obj.createdAt)}   // ВАЖНО: вызываем функцию
              viewsCount={obj.viewsCount}
              commentsCount={3}
              tags={obj.tags}
              isEditable={userData?._id===obj.user._id} //проверяем по id авторизован пользователь или нет.
            />
          ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
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
          />
        </Grid>
      </Grid>
    </>
  );
};
