import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Form.css'
import { useContext } from 'react';
import { SearchContext } from '../../../Context/SearchContext';

const Form = () => {
    const [ searchInput, setSearchInput] = useState('')
    const searchContext = useContext(SearchContext)
    const [featuredItems, setFeaturedItems] = useState();
    const [inputText, setInputText] = useState('');
    const [nlpResponse, setNlpResponse] = useState('no_res');
    const navigate = useNavigate()

    const handelChange = (e) => {
        setSearchInput(e.target.value)
    }
    const callNlp= async (inp)=>{
        await fetch('http://localhost:5000/api/nlp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: inp }),
        })
        .then(response => response.json())
        .then(data => {
            console.log("Received NLP response:", data); // Log the received NLP response
            setNlpResponse(data.response);
            console.log(nlpResponse.intent)
            if (data.response.intent.startsWith('nav:')) {
                const routePath = data.response.intent.split(':')[1]; // Extract the route path from the intent
                navigate(routePath); // Navigate to the route path
              }
        })
        .catch(error => console.error('Error:', error));
    };
    const handelFormSubmit = (e) => {  
        e.preventDefault();
        if (searchInput.startsWith('`')) {
            callNlp(searchInput.slice(1));
        }
        else {searchContext.setSearchQuery(searchInput);
        navigate('/search');}
    }
    

    return ( 
            <form className="search__form" onSubmit={handelFormSubmit}>
                <input type="text"  placeholder='Search for products or ` for AI commands' className="search__form__input" value={searchInput} onChange={handelChange} required/>
                <button className="search__form__button" type='submit'>
                    <SearchIcon fontSize='medium'/>
                </button>
            </form>
     );
}
 
export default Form;