const Book = require("../model/Book") 

const getAllBooks = async(req,res,next)=>{
    let books;
    try{
        books=await Book.find();
    } catch(err){
        console.log(err);
    }
    if (!books){
        return res.status(404).json({message: "No product found"})
    }
    return res.status(200).json({books})
}

const getById=async(req,res,next)=>{
    const id=req.params.bookId
    let book;
    try{
        book=await Book.findById(id);
    }catch(err){
        console.log(err)
    }
    if(!book){
        return res.status(404).json({message: "No Book Found"})
    }
    return res.status(200).json({book})
    
}

const addBook = async (req,res,next)=>{
    const {name,author,description,price,available} = req.body
    let book;
    try{
        book = new Book({
            name,
            author,
            description,
            price,
            available
        })
        await book.save()
    }catch(err){
        console.log(err)
    }
    if(!book){
        return res.status(500).json({message: "Unable To Add"})
    }
    return res.status(201).json({book})

}

const updateBook = async (req,res,next)=>{
    const id = req.params.id;
    const {name,author,description,price,available}= req.body;
    let book;
    try{
        book=await Book.findByIdAndUpdate(id,{
            name,
            author,
            description,
            price,
            available
        });
        book=await book.save();
    }catch(err){
        console.log(err)
    }
    if(!book){
        return res.status(404).json({message: "Unable To Update by this id"})
    }
    return res.status(200).json({message: "Book updated"})
    
}

const deleteBook = async (req,res,next)=>{
    const id = req.params.id;
    let book;
    try {
        book=await Book.findByIdAndRemove(id)
    } catch (error) {
        console.log(error)
    }
    if(!book){
        return res.status(404).json({message: "Unable To Delete by this id"})
    }
    return res.status(200).json({message: "Book deleted"})
    
    
}

exports.getAllBooks = getAllBooks;
exports.getById = getById;
exports.addBook = addBook;
exports.updateBook = updateBook;
exports.deleteBook=deleteBook;