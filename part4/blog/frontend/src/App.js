import { useEffect, useState } from 'react';
import './App.css';
import blogService from './services/blogService';

function App() {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then((initialBlogs) => setBlogs(initialBlogs))
  }, [])

  return (
    <div className="App">
      <header className="App-header">
      </header>
    </div>
  );
}

export default App;
