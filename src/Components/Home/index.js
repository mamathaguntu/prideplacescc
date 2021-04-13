import React, { useState, useEffect } from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const Home = () => {
  // state variable to store user posts
  const [posts, setPosts] = React.useState([])
  const [userData, setUserData] = React.useState([])
  const [authorName, setAuthorName] = React.useState('');
  const [catchPhrase, setCatchPhrase] = React.useState('');
  const [body, setBody] = React.useState('');
  const [title, setTitle] = React.useState('');

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    await fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(result => setPosts(result));
    // console.log(posts);
  }
  const getUserData = async (userId) => {
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts?userId=' + userId;
    await fetch(apiUrl).then(response => response.json())
      .then(result => setUserData(result));
  }

  const handleClick = async (userId) => {
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts?userId=' + userId;
    await fetch(apiUrl).then(response => response.json())
      .then(result => setUserData(result));
  }
  return (
    <div>
      {

        posts.map(userPosts =>

          <ListItem
            button
            // selected={selectedIndex === 3}
            key={userPosts.id}
            onClick={(event) => handleClick(userPosts.userId)}
          >
            <ListItemText primary={userPosts.title} />
          </ListItem>
        )


      }
    </div >

  )
}

export default Home;
