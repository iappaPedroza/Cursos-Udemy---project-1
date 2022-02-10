import './styles.css'

export const PostCard = ({id, title, cover, body }) => (        
       
       <div className="postCard">
            <img src={cover} alt={title} />
            <div id={id} className="post">
                <h2>{title} </h2>
                <p>{body}</p>
            </div>
        </div>
    );