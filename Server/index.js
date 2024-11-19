const express = require ("express")
const mongoose = require ("mongoose")
const cors = require ("cors")
const bodyParser = require ("body-parser")

const app = express()

const port = 3000

// to connect with mongoose
mongoose.connect("mongodb+srv://lmipo861:wBtEYe4RAjbPAVLw@cluster0.09dy4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(
    ()=>{
        console.log("mongodb connected");
    }
)

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    genre: String,
    genre: String,
    quantity: String,
    price: Number
})

app.use(cors())
app.use(bodyParser.json())

const Book  = mongoose.model("Book", bookSchema)

// get all books from database
app.get("/books", async (req, res)=>{
    try {
        const books = await Book.find()
        res.json(books)
    } catch (error) {
        console.error(error)
        res.status(500).jsom("could not get books from database")
    }
})

// add a new book
app.post("/books", async (req, res)=>{
    try {
        const book = new Book(req.body)
        const savedBook = await book.save()
        res.json(savedBook)
    } catch (error) {
        console.error(error)
        res.status(500).jsom("could not save books to database")
    }
})

// delete an expense
app.delete("/book/:id", async (req, res)=>{
    try {
        await Book.findByIdAndDelete(req.params.id)
    res.json({message:"book has been deleted successfully"})
    } catch (error) {
        console.error(error)
        res.status(404).jsom("could not delete books from database")
    }
})

// start server and listen for connection
app.listen(port, ()=>{
    console.log("server is running on port 3000")
});