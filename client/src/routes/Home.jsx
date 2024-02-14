
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Landing from "../components/Landing/Landing";
import FeaturedItems from "../components/Featured/Items/FetauredItems";
import FeaturedCategories from "../components/Featured/Categories/FeaturedCategories";
import { TabTitle } from "../utils/General";
import alanBtn from '@alan-ai/alan-sdk-web';
import { useNavigate } from 'react-router-dom';
//import {NlpManager} from 'node-nlp'


const Home = () => {
    const [featuredItems, setFeaturedItems] = useState();
    const [inputText, setInputText] = useState('Goodbye');
    const [nlpResponse, setNlpResponse] = useState('no res');
    const navigate = useNavigate();

    //nlp.js
    const handleNlpSubmit = () => {
      fetch('http://localhost:5000/api/nlp', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: inputText }),
      })
      .then(response => response.json())
      .then(data => {
          console.log("Received NLP response:", data); // Log the received NLP response
          setNlpResponse(data.response);
          console.log(nlpResponse.intent)
          if (nlpResponse.intent === 'greetings.bye'){
            setNlpResponse("")
            navigate("/wishlist")
          }
      })
      .catch(error => console.error('Error:', error));
  };
  

    useEffect(() => {
        // Call the handleNlpSubmit function once when the component mounts
        console.log("test123")
        handleNlpSubmit();
        console.log(nlpResponse);
 
        // Fetch featured items
        axios.get("https://shema-backend.vercel.app/api/items")
            .then(res => setFeaturedItems(res.data))
            .catch(err => console.log(err));

        // Scroll to top
        window.scrollTo(0, 0);
    }, []); // Empty dependency array ensures this effect runs only once when the component mounts

    TabTitle("shop.io");

    
    return (
        <Fragment>
            <Landing />
            <FeaturedCategories />
           {/* { <button onClick={()=>{ handleNlpSubmit();
        console.log(nlpResponse);}}>test</button>} */}
            <FeaturedItems items={featuredItems}/>
        </Fragment>
    );
}
 
export default Home;





















// useEffect(() => {
    //   console.log("connecting");
    //   const alanInstance = alanBtn({
    //     key: '44e740fd20b5991cf5a972d3af4296782e956eca572e1d8b807a3e2338fdd0dc/stage',
    //     onCommand: (commandData) => {
    //       console.log("Received command:", commandData);
    //       if (commandData.command === 'navigate') {
    //         console.log("going back");
    //         navigate("/");
    //       }
    //     }
    //   });
    
    //   // Cleanup function to disconnect Alan SDK when the component unmount
    // });
    // useEffect(() => {
    //   const alanInstance = alanBtn({
    //     key: "44e740fd20b5991cf5a972d3af4296782e956eca572e1d8b807a3e2338fdd0dc/stage",
       
    //     onCommand: ({ command }) => {
    //       console.log("test")
    //       if (command === 'navigate') {
    //         console.log("going back");
    //         navigate("/wishlist");
    //       }
    //     }
    //   },console.log("jhgfdfghj"));
  
    //   return () => {
    //     alanInstance.deactivate();
    //   };
    // }, [navigate]);
    



// import { Fragment, useEffect, useState } from "react";
// import axios from "axios";
// import Landing from "../components/Landing/Landing";
// import FeaturedItems from "../components/Featured/Items/FetauredItems";
// import FeaturedCategories from "../components/Featured/Categories/FeaturedCategories";
// import { TabTitle } from "../utils/General";
// import alanBtn from '@alan-ai/alan-sdk-web';
// import { useNavigate } from 'react-router-dom';
// //import {NlpManager} from 'node-nlp'


// const Home = () => {
//     const [featuredItems, setFeaturedItems] = useState();

//     //nlp.js
//     const [inputText, setInputText] = useState('Goodbye');
//   const [nlpResponse, setNlpResponse] = useState('');

//   const handleNlpSubmit = () => {
//     fetch('http://localhost:5000/api/nlp', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ text: inputText }),
//     })
//     .then(response => response.json())
//     .then(data => setNlpResponse(data.response))
//     .catch(error => console.error('Error:', error));
//   };
// handleNlpSubmit();
// console.log(nlpResponse);
//     TabTitle("shop.io");
//     const navigate = useNavigate();

//     useEffect(() => {
//         axios.get("https://shema-backend.vercel.app/api/items")
//             .then(res => setFeaturedItems(res.data))
//             .catch(err => console.log(err));

//         window.scrollTo(0, 0);
//     }, []);

//     // useEffect(() => {
//     //   console.log("connecting");
//     //   const alanInstance = alanBtn({
//     //     key: '44e740fd20b5991cf5a972d3af4296782e956eca572e1d8b807a3e2338fdd0dc/stage',
//     //     onCommand: (commandData) => {
//     //       console.log("Received command:", commandData);
//     //       if (commandData.command === 'navigate') {
//     //         console.log("going back");
//     //         navigate("/");
//     //       }
//     //     }
//     //   });
    
//     //   // Cleanup function to disconnect Alan SDK when the component unmount
//     // });
//     // useEffect(() => {
//     //   const alanInstance = alanBtn({
//     //     key: "44e740fd20b5991cf5a972d3af4296782e956eca572e1d8b807a3e2338fdd0dc/stage",
       
//     //     onCommand: ({ command }) => {
//     //       console.log("test")
//     //       if (command === 'navigate') {
//     //         console.log("going back");
//     //         navigate("/wishlist");
//     //       }
//     //     }
//     //   },console.log("jhgfdfghj"));
  
//     //   return () => {
//     //     alanInstance.deactivate();
//     //   };
//     // }, [navigate]);
    

//     return (
//         <Fragment>
//             <Landing />
//             <FeaturedCategories />
//             <FeaturedItems items={featuredItems}/>
//         </Fragment>
//     );
// }
 
// export default Home;
