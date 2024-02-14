// const express = require("express")
// //////////////////////
// const { NlpManager } = require('node-nlp');

// ///////////////////////
// const app = express()
// const cors = require("cors")
// require("dotenv").config()
// const connectDB = require("./config/db")
// const PORT = process.env.PORT || 5000

// // middlewares
// app.use(express.json())
// app.use(express.urlencoded({extended: false}))
// app.use(express.static("public"));

// // connect to the mongodb database
// /* connectDB() */

// //node nlp
// const manager = new NlpManager({ languages: ['en'] });

// // Add training data
// manager.addDocument('en', 'Goodbye', 'greetings.bye');
// manager.addDocument('en', 'Exit', 'greetings.bye');
// manager.addDocument('en', 'Thank you', 'greetings.thanks');
// manager.addDocument('en', 'Thanks', 'greetings.thanks');

// // Train the model
// manager.train();

// app.post('/api/nlp', (req, res) => {
//     const { text } = req.body;
//     const response = manager.process('en', text);
//     res.json({ response });
//   });
  

// app.use('/api/items', require("./routes/items"))
// app.use('/api/payment', cors(), require("./routes/payment"))
// app.use(cors());
// app.listen(PORT, console.log("Server is running on port ", PORT))










const express = require("express");
const cors = require("cors");
const { NlpManager } = require('node-nlp');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS middleware
app.use(cors());

// Other middleware and routes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// NLP manager initialization
// const manager = new NlpManager({ languages: ['en'] });
// manager.addDocument('en', 'Goodbye', 'greetings.bye');
// manager.addDocument('en', 'Exit', 'greetings.bye');
// manager.addDocument('en', 'Thank you', 'greetings.thanks');
// manager.addDocument('en', 'Thanks', 'greetings.thanks');
// manager.train();
//NLP training
const manager = new NlpManager({ languages: ['en'] });

// Define the navigation intents and their corresponding route paths
const navigationIntents = {
  'move to wishlist': '/wishlist',
  'go to wishlist': '/wishlist',
  'move to account': '/account',
  'go to account': '/account',
  'move to shop': '/shop',
  'go to shop': '/shop',
  'move to category': '/category',
  'go to category': '/category',
  'move to item': '/item',
  'go to item': '/item',
  'move to search': '/search',
  'go to search': '/search',
};

// Add navigation intents to the NLP manager
for (const [intent, routePath] of Object.entries(navigationIntents)) {
  manager.addDocument('en', intent, `nav:${routePath}`);
}

// Train the NLP manager
manager.train();


///////////
// NLP endpoint
app.post('/api/nlp', async (req, res) => {
    console.log("nlp request received");
    const { text } = req.body;
    console.log("Received text:", text);
    
    try {
        const response = await manager.process('en', text);
        console.log("NLP Response:", response); // Log the NLP response
        res.json({ response });
    } catch (error) {
        console.error("Error processing NLP:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});



// Other routes
app.use('/api/items', require("./routes/items"));
app.use('/api/payment', cors(), require("./routes/payment"));

// Start server
app.listen(PORT, console.log("Server is running on port ", PORT));
