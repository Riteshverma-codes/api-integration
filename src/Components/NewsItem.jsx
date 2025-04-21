import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, url } = this.props
    return (
      <>
        {/* This is NewsItem Component in News Component */}

        <div className="card h-100">
          <img src={imageUrl ? imageUrl : imageUrl = "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"} alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title} ...</h5>
            <p className="card-text">{description}...</p>
            <a href={url} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </>
    )
  }
}
