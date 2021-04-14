import logo from './logo.svg';
import './App.css';
import Home from './Components/Home'
import AppBar from '@material-ui/core/AppBar'
import { Typography } from '@material-ui/core';


function App() {
  return (
    <div className="App">
      <AppBar position='static'>
        <Typography>
          User Posts
        </Typography>
      </AppBar>
      <Home />
    </div>
  );
}

export default App;
