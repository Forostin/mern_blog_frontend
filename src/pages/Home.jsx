import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import styles from './home.module.scss'
import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts, fetchTags, sortTimePosts, sortPopularPosts } from '../react/slices/posts';


export const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state)=>state.auth.data);
  const {posts, tags} = useSelector((state)=>state.posts); 
  const [tag, setTag] = React.useState('');

  const isPostsLoading = posts.status === 'loading'
  const isTagsLoading = tags.status === 'loading'



  React.useEffect(()=>{
        dispatch(fetchPosts())  
        dispatch(fetchTags())
         // axios.get('/posts')
      },[dispatch]
  );
      // console.log(tags)

  const clickSortTime = (tagName) => { 
        setTag(tagName);
        dispatch(sortTimePosts()) 
  };

  const clickSortPopular = (tagName) => {
        setTag(tagName);
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
       <h4>Якщо ви бажаєте додати пост або коментар, будь ласка, зареєструйтесь.</h4>
       <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
              { tag === 'Нові' ?  ( <div className={styles.box_smile}>
                       <img className={styles.smile} src="/smile.png" alt="smile" />
              </div>) : (<></>) }

          <Tab label="Нові" onClick={()=>clickSortTime('Нові')}
              style={ {color: tag === 'Нові' ? "blue" : "black"} }   //подсветка выбранного тега
          />

          <Tab label="Популярні" onClick={()=>clickSortPopular('Популярні')}
              style={ {color: tag === 'Популярні' ? "blue" : "black"} }   //подсветка выбранного тега
          />
              { tag === 'Популярні' ?  ( <div className={styles.box_smile}>
                     <img className={styles.smile} src="/smile.png" alt="smile" />
              </div>) : (<></>) }
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
                  fullName: 'Степан Степанов',
                  avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                },
                text: 'Це тестовий коментар, його не можна видалити.',
              },
              {
                user: {
                  fullName: 'Mark Tven',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'This is a very good website. Thank you!',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
