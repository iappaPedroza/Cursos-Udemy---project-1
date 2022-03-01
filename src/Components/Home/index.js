import { useState, useEffect, useCallback } from 'react';

import './styles.css';

import {loadPosts} from '../loadPosts';
import { Posts } from '../Posts';
import User from '../Users';
import { Button } from '../Button';
import { SearchInput } from '../SearchInput';


export default function Home() {
  
    const [posts, setPosts] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    const [page, setPage] = useState(0);
    const [postsPerPage] = useState(10);
    const [searchValue, setSearchValue] = useState('');

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

      const carregaPosts = useCallback(async (page, postsPerPage) => {
          
        const postsAndPhotos = await loadPosts();
        
        setPosts(postsAndPhotos.slice(page, postsPerPage));
        setAllPosts( postsAndPhotos );
      },[])
      

      useEffect(() => {
        console.log(new Date().toLocaleString('pt-br'));
          carregaPosts(0, postsPerPage);
      }, [carregaPosts, postsPerPage]);

        
        const loadMorePosts = async () => {
          
          const nextPage = page + postsPerPage;
          const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage );
          posts.push(...nextPosts);
          
          setPosts(posts);
          setPage(nextPage);
        };
        
        const handleSearch = (e) => {
            const {value} = e.target;
            setSearchValue(value)
        }
        

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
          actionFn={handleSearch} 
        />
      </section>
      <section className='container'>
        {!searchValue && (
          <Button 
          text="Carregar mais Posts..."
          action={loadMorePosts}
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
