import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { logout, selectIsAuth } from '../../react/slices/auth';
import { fetchPosts } from '../../react/slices/posts';

export const Header = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const onClickLogout = () => {
        if (window.confirm('Ви дійсно хочете вийти')){    
               dispatch(logout())
               window.localStorage.removeItem('token');
        }  
  };
  const onClickGetPosts = ()=>{
        dispatch(fetchPosts())
  }
  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div onClick={onClickGetPosts}>MY COMEDY BLOG</div>
          </Link>
       
          <div className={styles.box_smile}>
             <img className={styles.smile} src="/smile.png" alt="smile" />
          </div>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/add-post">
                  <Button variant="contained">Написати статтю</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error"> 
                  Вийти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Війти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создати акаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
