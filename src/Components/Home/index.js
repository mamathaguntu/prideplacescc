import React, { useState, useEffect } from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'center',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Home = () => {
  const classes = useStyles();
  const [posts, setPosts] = React.useState([])
  const [authorName, setAuthorName] = React.useState('');
  const [catchPhrase, setCatchPhrase] = React.useState('');
  const [body, setBody] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [openModal, setOpenModal] = React.useState(false);
  // console.log("authorName", authorName);
  // console.log("catchPhrase", catchPhrase)
  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    await fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(result => setPosts(result));
    // console.log(posts);
  }

  const handleClick = async (userId, postTitle, postBody) => {
    const apiUrl = 'https://jsonplaceholder.typicode.com/users?id=' + userId;
    const response = await fetch(apiUrl).then((response) => response.json());
    // const result = await response.json();
    console.log(response[0].company.name)
    // setUserData(result);

    setAuthorName(response[0].company.name);
    setCatchPhrase(response[0].company.catchPhrase);
    setTitle(postTitle);
    setBody(postBody);
    setOpenModal(true);
  }
  const handleClose = () => {
    setOpenModal(false);
  }

  return (
    <div>
      {
        posts.map(userPosts =>
          <ListItem
            button
            key={userPosts.id}
            onClick={(event) => handleClick(userPosts.userId, userPosts.title, userPosts.body)}
          >
            <ListItemText primary={userPosts.title} />
          </ListItem>
        )

      }
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        <div className={classes.paper}>
          <Typography>
            <h4>Title : {title}</h4>
          </Typography>
          <Typography>
            <h5>Author : {authorName}</h5>
          </Typography>
          <Typography>
            <h5>CatchPhrase : {catchPhrase}</h5>
          </Typography>
          <Typography>
            {body}
          </Typography>
          <Button type='submit' variant='contained' color='primary' onClick={handleClose}>Close</Button>
        </div>

      </Modal>
    </div>
  )
}

export default Home;
