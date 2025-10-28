import React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TagIcon from "@mui/icons-material/Tag";
// import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";

import { SideBlock } from "./SideBlock";
import { useDispatch } from "react-redux";
import { sortPostsTag , fetchPosts} from "../react/slices/posts";
import { red, yellow } from "@mui/material/colors";


export const TagsBlock = ({ isLoading = true }) => {

      const [tag, setTag] = React.useState('');

      const dispatch = useDispatch()

      const clickSortTag = (tagName) => {
               setTag(tagName); // сохраним выбранный тег (если нужно для визуала)
               dispatch(sortPostsTag(tagName)); // передаем тег в thunk
            };
      const getAllPosts = (tagName)=>{
               setTag(tagName);
               dispatch(fetchPosts())
            };

  return (
    <SideBlock title="Тэги">
      <List>
          <ListItem  disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <TagIcon />
                </ListItemIcon>
                {isLoading ? (
                  <Skeleton width={100} />
                ) : (
                  <ul>
                     <li
                        onClick={()=> getAllPosts('всі') }
                        style={{
                                textDecoration: "none",
                                color: tag === 'всі' ? "blue" : "black",  //подсветка выбранного тега
                                cursor: 'pointer',
                               }}
                     >
                      всі
                    </li>
                    <li
                        onClick={() => clickSortTag('картинки')}
                        style={{
                                textDecoration: "none",
                                color: tag === 'картинки' ? "blue" : "black",  //подсветка выбранного тега
                                cursor: 'pointer'
                               }}
                     >
                      картинки
                    </li>
                    <li
                        onClick={() => clickSortTag('анекдот')}
                        style={{
                                textDecoration: "none",
                                color: tag === 'анекдот' ? "blue" : "black",  //подсветка выбранного тега
                                cursor: 'pointer'
                               }}
                     >
                      анекдот
                    </li>
                    <li
                        onClick={() => clickSortTag('повідомлення')}
                        style={{
                                textDecoration: "none",
                                color: tag === 'повідомлення' ? "blue" : "black",  //подсветка выбранного тега
                                cursor: 'pointer'
                               }}
                     >
                      повідомлення
                    </li>
                     <li
                        onClick={() => clickSortTag('оповідання')}
                        style={{
                                textDecoration: "none",
                                color: tag === 'оповідання' ? "blue" : "black",  //подсветка выбранного тега
                                cursor: 'pointer'
                               }}
                     >
                      оповідання
                    </li>
                  </ul>
                )}
              </ListItemButton>
            </ListItem>
        </List>
    </SideBlock>
  );
};