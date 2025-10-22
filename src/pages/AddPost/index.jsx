import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { selectIsAuth } from '../../react/slices/auth';
import axios from '../../axios';

import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';

export const AddPost = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const isAuth = useSelector(selectIsAuth);
  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');
  const [isLoading, setIsLoading] = React.useState('');
  const inputFileRef = React.useRef(null); 


  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const {data} = await axios.post('/upload', formData);
      setImageUrl(data.url)
      console.log(data);
    } catch (error) {
      console.log(error);
      alert('Помилка при завантаженні файла!');
    }
  };

  const onClickRemoveImage = ()=> {
    setImageUrl('');
  };

  // сторонний редактор для библиотеки SimpleMDE:
  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const onSubmit = async ()=>{
    try {
      setIsLoading(true);
      const fields = {
        title,
        imageUrl,
        tags: tags.split(','),
        text
      };
      const {data} = isEditing 
                ? await axios.patch(`/posts/${id}`, fields)
                : await axios.post('/posts', fields);

      const _id = isEditing ? id : data._id; 
      navigate(`/posts/${_id}`) 
    } catch (error) {
      console.warn(error);
      alert("Помилка при створенні статті");
    }
  }
const isEditing = Boolean(id)
  React.useEffect(()=>{
    if (id){
      axios.get(`/posts/${id}`)
           .then(({data})=>{
                setImageUrl(data.imageUrl)
                setTitle(data.title)
                setText(data.text)
                setTags(data.tags.join(','))
           }) 
           .catch((err)=>{
            console.warn(err)
           })
    }
  },[id])
  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введіть текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  return (  
    <Paper style={{ padding: 30 }}>
      {!isAuth? (
        <>
           <Link to='/login'>
              <Button variant="outlined" size="large">
                  Увійдіть в акаунт
              </Button>        
           </Link>  
        </>):(
      <>    
      <Button onClick={()=>inputFileRef.current.click()} variant="outlined" size="large">
        Загрузити файл
      </Button>
    
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />

      {imageUrl && (
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Видалити
        </Button>
      )}
      {imageUrl && (
        <img className={styles.image} src={`http://localhost:3002${imageUrl}`} alt="Uploaded" />
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статті..."
        value={title}
        onChange={(e)=>{setTitle(e.target.value)}}
        fullWidth
      />
      <TextField 
        classes={{ root: styles.tags }} 
        variant="standard" 
        placeholder="Теги"
        value={tags}
        onChange={(e)=>setTags(e.target.value)}
        fullWidth 
      />
      {/* Отображаем редактор текста SimpleMDE */}
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={onSubmit}  size="large" variant="contained">
          {isEditing ? 'Зберегти зміни' :'Опублікувати'}
        </Button>
        <a href="/">
          <Button size="large">Скасувати</Button>
        </a>
      </div>
      </>
    )}
    </Paper>
  );
};
