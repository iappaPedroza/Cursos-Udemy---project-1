import { PostCard } from '../PostCard';

import './styles.css';

export const Posts = ({ posts }) => (
    <div id={posts.id} className='postsWrapper'>
        {posts.map(post => (
            // Aqui vai o componente
            <PostCard 
            // post={post}
            key={post.id}
            id={post.id} 
            title={post.title} 
            body={post.body}
            cover={post.cover}  
            />
        ))}
    </div>
);