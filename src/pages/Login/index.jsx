import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Password } from "@mui/icons-material";

import styles from "./Login.module.scss";
import { fetchAuth, selectIsAuth } from "../../react/slices/auth";

export const Login = () => {
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch();
  const { register, handleSubmit, formState:{errors, isValid} } = useForm({
    defaultValues: {
      email : '',
      password : ''
    },
    mode: 'onChange'
  });

  const onSubmit = async (values)=>{
      const data = await dispatch(fetchAuth(values));
      
      if (!data.payload){
        return alert('Не вдалося авторезуватися!');
      }
      if ('token' in data.payload){
          window.localStorage.setItem('token', data.payload.token);
      }          
  };
 
   
    if (isAuth) {
        return <Navigate to='/' />
    };
  return (
    <Paper classes={{ root: styles.root }}>
          <Typography classes={{ root: styles.title }} variant="h5">    
            Вхід в акаунт
          </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            className={styles.field}
            label="E-Mail"
            error={Boolean(errors.email?.message)}
            helperText={errors.email?.message}
            type="email"
            {...register('email', {required:'Вкажіть E-Mail'})}
            fullWidth
          />
          <TextField 
            className={styles.field} 
            label="Пароль" 
            helperText={errors.password?.message}
            {...register('password', {required:'Введіть пароль'})}
            fullWidth />
          <Button type="submit" size="large" variant="contained" fullWidth>
            Увійти
          </Button>
      </form>
    </Paper>
  );
};
