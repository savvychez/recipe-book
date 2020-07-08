import React from 'react';

import Selector from './Selector.js'
import ImageUploader from 'react-images-upload';
import { Redirect, useHistory  } from "react-router-dom";

import '../styles/App.css'
import axios from 'axios';


class Writer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showSelector: false,
      blocks: [],
      imgSrc: []
    };
  }

  componentDidMount() {
    const titleBlock = {
      "id": this.state.blocks.length,
      "type": "title",
      "val": ""
    }

    const blocks = [titleBlock]
    this.setState({ blocks: blocks })
  }

  paraClick() {
    const paraBlock = {
      "id": this.state.blocks.length,
      "type": "p",
      "val": ""
    }

    var blocks = this.state.blocks
    this.setState({
      blocks: blocks.concat([paraBlock]),
      showSelector: false
    });
  }

  imgClick() {
    const imgBlock = {
      "id": this.state.blocks.length,
      "type": "img",
    }

    var blocks = this.state.blocks
    this.setState({
      blocks: blocks.concat([imgBlock]),
      showSelector: false
    });
  }

  onUpload(picture, blockID) {
    let blocks = this.state.blocks
    if (picture[0]) {
      // const url = 'https://api.imgbb.com/1/upload?key=487dc3b39cffc8a37edcbac97e422cff';
      const formData = new FormData();
      formData.append('image', picture[0])
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
      var self = this
      axios.post('/api/images', formData, config)
        .then(function (response) {
          blocks[blockID].src = response.data.url
          self.setState({
            blocks: blocks
          })
        })
    }
  }

  fieldChange(event, blockID) {
    let blocks = this.state.blocks
    blocks[blockID].val = event.target.value
    this.setState({ blocks: blocks })
  }

  renderBlock(block) {
    if (block.type == 'p') {
      return (
        <div className="writer-block para-block">
          <textarea onChange={event => this.fieldChange(event, block.id)} className="text-area" rows="14" cols="50"></textarea>
          <label htmlFor="para">Paragraph</label>
        </div>
      )
    } else if (block.type == 'img') {
      const file_style = { "boxShadow": "none", "backgroundColor": "#fefff4" };
      const btn_style = { "backgroundColor": "#04316B" };

      return (
        <div className="writer-block img-block">
          <div className="ctr">
            <ImageUploader
              withIcon={true}
              withPreview={true}
              fileContainerStyle={file_style}
              buttonStyles={btn_style}
              buttonText='Upload image'
              onChange={image => this.onUpload(image, block.id)}
              imgExtension={['.jpg', '.gif', '.png', '.gif']}
              withLabel={false}
              singleImage={true}
              maxFileSize={5242880}
            />
          </div>
          <label htmlFor="img">Image</label>
        </div>
      )
    } else {
      return (
        <div className="writer-block title-block">
          <input onChange={event => this.fieldChange(event, block.id)} type="text" name="title" autoComplete="off" />
          <label htmlFor="title">Title</label>
        </div>
      )
    }
  }

  submitPost() {
    const title = this.state.blocks[0].val
    const content = this.state.blocks.slice(1)
    
    var self = this;
    
    if (title && content) {
      axios.post('/api/articles', {
        "title": title,
        "content": content
      })
        .then(function (response) {
          self.setState({redirect: true})
        })
    } else {
      alert("Your post is missing content or a title!")
    }
  }

  render() {
    const blocks = this.state.blocks
    return (
      <div>
        <h1 className="title art-title composer-title">Compose Article</h1>
        <form action="">
          {
            blocks.map(block => this.renderBlock(block))
          }
          <a className="add_item_link" onClick={() => { this.setState({ showSelector: !this.state.showSelector }) }}>Add Item +</a>
          {this.state.showSelector && <Selector className="selector" paraClick={this.paraClick.bind(this)} imgClick={this.imgClick.bind(this)} />}
        </form>
        <button className="button" onClick={this.submitPost.bind(this)}>Submit</button>
        <div className="spacer"></div>
        {this.state.redirect && <Redirect to="/"/>}
      </div>
    )
  }
}

export default Writer