import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

export default class News extends Component {
  articles = []
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }
  constructor() {
    super()
    console.log("I am a constructor function");
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
    }
  }
  async componentDidMount() {
    // console.log("cdm")
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData)
    this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading:false})
  }
  handlePreviousBtn = async () => {
    console.log("Previous")
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData)
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading:false
    })
  }
  handleNextBtn = async () => {
    console.log("Next")
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
    }
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      let data = await fetch(url);
      let parsedData = await data.json()
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false
      })
    }

  render() {
    return (
      <>
        <div className="container-fluid text-center my-3 text-dark">
          <h1 style={{fontSize:"32px"}}>Top Stories Today: What You Need to Know</h1>
        </div>
        {this.state.loading && <Spinner/>}  
        <div className="container">
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {!(this.state.loading) && this.state.articles.map((element) => {
              return <div className="col" key={element.url}>
                <NewsItem title={element.title ? element.title.slice(0, 42) : element.title = ''} description={element.description ? element.description.slice(0, 92) : element.description = ''} imageUrl={element.urlToImage} url={element.url} />
              </div>
            })}
          </div>
          <div className="container d-flex justify-content-between mt-4">
            <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousBtn}>&larr; Previous</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextBtn}>Next  &rarr;</button>
          </div>
        </div>
        <br />
        <br />
      </>
    )
  }
}