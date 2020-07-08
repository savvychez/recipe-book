import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/App.css'

import cooking from '../assets/pic.png'


function Feed() {
  useEffect(() => {
    pullFeed();
  }, []);

  const [articles, setArticles] = useState([]);

  const pullFeed = () => {
    axios.get('/api/articles')
      .then(function (response) {
        setArticles(response.data)
      });
  }

  return (
    <div>
      <div className="top">
        <h1 className="title">Recipes</h1>
        <img className="cooking" src={cooking} alt=""/>
      </div>
      {articles.map(article => (
        <Link key={article._id} className="card-router" to={'/recipe?id='+article._id}>
          <div className="card" key={article._id}>
            <h2>{article.title}</h2>
            <h3>{article.date.split('T')[0]}</h3>
          </div>
        </Link>
      ))}
      <div className="spacer"></div>
    </div>
  );
}

export default Feed;