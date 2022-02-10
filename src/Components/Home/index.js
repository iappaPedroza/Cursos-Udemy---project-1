import { Component } from 'react';

import './styles.css';

import {loadPosts} from '../loadPosts';
import { Posts } from '../Posts';
import User from '../Users';
import { Button } from '../Button';
import { SearchInput } from '../SearchInput';

export default class Home extends Component {
  state = {       
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 10,
    searchValue: ''
  };

  async componentDidMount() {
    await this.carregaPosts();  
  }
  
  carregaPosts = async () => {
    const {page, postsPerPage} = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({ 
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos
    });
  }
  
  loadMorePosts = async () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage );
    posts.push(...nextPosts);
    
    this.setState({ posts, page: nextPage});
  };
  
  handleSearch = (e) => {
      const {value} = e.target;
      this.setState({ searchValue: value });
  }

  render() {
    const {  posts, page, postsPerPage, allPosts, searchValue  } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;
    
    const filteredPosts = !!searchValue ? 
      allPosts.filter(post => {
        return (
          post.title.toLowerCase().includes(
            searchValue.toLocaleLowerCase()
          ),
          post.body.toLowerCase().includes(
            searchValue.toLocaleLowerCase()
          )
        )
      })
      :
      posts;

    return (
      <div className="App">
        <User />
        <section className='container'>
          
          {!!searchValue &&(
            
              <div>
                <h2>Sua busca:</h2> 
                <p>{ searchValue }</p>
              </div>
            
          )}
          
          <SearchInput 
            inputValue={searchValue} 
            actionFn={this.handleSearch} 
          />
        </section>
        <section className='container'>
          {!searchValue && (
            <Button 
            text="Load more Posts..."
            action={this.loadMorePosts}
            disabled={noMorePosts}
            />
          )}
          {filteredPosts.length > 0 && (
            <Posts posts={ filteredPosts } />
          )}
          {filteredPosts.length === 0 && (
            <h3>Não existem Posts para sua busca.</h3>
          )}
            
          <div className='btnContainer'>
            
          </div>
        </section>
      </div>
    );
  }
}