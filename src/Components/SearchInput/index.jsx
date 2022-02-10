
import "./styles.css";

export const SearchInput = ({inputValue, actionFn}) => {
    return (
        <input 
          className="searchInput"
          onChange={ actionFn }
          value={ inputValue }
          type="search" 
          placeholder="Procure por posts aqui..."
        />
    )
}