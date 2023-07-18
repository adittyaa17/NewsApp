import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

constructor(){
  super();
  console.log("Hello from news component");
  this.state = {
    articles : this.articles,
    loading: false,
    page: 1,
    totalResults: this.totalResults
  }
}

async componentDidMount(){
  // let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=eb792a3d607245ca95155695dead7508"
  // let data = await fetch(url);
  // let parsedData = await data.json();
  // console.log(parsedData);
  // this.setState({articles: parsedData.articles});
       
    let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=eb792a3d607245ca95155695dead7508&page=1&pageSize=10"
    let data = await fetch(url);
    const parsedData = await data.json();
    this.setState({
        articles: parsedData.articles
    });
  
   
}
handlePrevClick = async ()=>{
  let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=eb792a3d607245ca95155695dead7508&page=${this.state.page-1}&pageSize=10`
    let data = await fetch(url);
    const parsedData = await data.json();
    console.log("prev");
    this.setState({
        articles: parsedData.articles,
        page: this.state.page - 1
    });
}

handleNextClick = async ()=>{
  if(Math.ceil(this.state.totalResults/this.state.page)+1 > this.state.page){

  }
  else{
  let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=eb792a3d607245ca95155695dead7508&page=${this.state.page+1}&pageSize=10`
    let data = await fetch(url);
    const parsedData = await data.json();
    console.log("prev");
    this.setState({
        articles: parsedData.articles,
        page: this.state.page + 1
    });
  }
}


  render() {
    return (
      <>
      <div className='container my-3'>
        <h2>NewsLelo - Top Headlines</h2>
        <div className="row">
        {this.state.articles && this.state.articles.map((element)=>{
          return <div className="col-md-4 my-3" key= {element.url}>
          <NewsItem  title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,69):""} imageUrl={element.urlToImage} newsUrl={element.url}/>
        </div>
        })}
        
        </div>
      </div>
      <div className="container d-flex justify-content-between">
      <button type="button" disabled={this.state.page<=1}  class="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
      <button type="button" class="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
      </div>
      </>
    )
  }
}

export default News