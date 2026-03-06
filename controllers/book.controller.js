
const Book = require("../models/book.model");

exports.addBook = async(req,res)=>{

 const book = new Book({
  ...req.body,
  user:req.userId
 });

 await book.save();

 res.send({msg:"Book added"});

};

exports.getBooks = async(req,res)=>{

 const books = await Book.find({user:req.userId});

 res.send(books);

};

exports.getBookById = async(req,res)=>{

 const book = await Book.findById(req.params.id);

 res.send(book);

};

exports.updateBook = async(req,res)=>{

 await Book.findByIdAndUpdate(req.params.id,req.body);

 res.send({msg:"Book updated"});

};

exports.deleteBook = async(req,res)=>{

 await Book.findByIdAndDelete(req.params.id);

 res.send({msg:"Book deleted"});

};
