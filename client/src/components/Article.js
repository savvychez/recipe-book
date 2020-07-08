import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/App.css'



class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      title: "",
      date: "",
      content: [],
    };
  }

  componentDidMount() {
    const id = this.props.location.search
    this.pullArticle(id.split('=')[1])
  }


  pullArticle(id) {
    const self = this;
    axios.get(`/api/articles/` + id)
      .then(function (response) {
        var article = response.data[0]
        self.setState({
          id: article.id,
          title: article.title,
          date: article.date,
          content: article.content
        })
      });
  }

  renderElement(element) {
    return (
      <div></div>
    )
  }

  render() {
    const article = this.state.content
    console.log(article)

    return (
      <div>
        <h1 className="art-title">{this.state.title}</h1>
        <h2 className="date">{this.state.date.split('T')[0]}</h2>
        <div className="article">
          {
            article.map(element => {
              if (element.type == 'p') {
                return (
                  <p className='article-para'>{element.val}</p>
                )
              }
              else if (element.type == 'img') {
                return (
                  <img className='article-content' src={element.src} />
                )
              }
            })
          }
        </div>
        <div className="spacer"></div>
      </div>
    )
  }
}

export default Article;


