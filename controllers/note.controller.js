const NoteModel = require('../models/note.model.js');
const { noteSchema, UpdatenoteSchema } = require("../validators/note.validators.js");


//POST NOTE
const postNote = async (req, res, next) => {
 const { error, value } = noteSchema.validate(req.body);
  if(error) { 
  return res.status(400).json({ error: error.details[0].message });
 }
try {
   const newNote = new NoteModel({
    title: req.body.title,
    content: req.body.content,
    category: req.body.category,
    tags: req.body.tags,
   });
  await newNote.save();

return res.status(201).json({ 
    message: 'Note created',
    data: newNote }) 
  
  } catch(error) {
    console.error(error)
    next(error) 
    } 
}


//GET NOTES
const getNotes = async (req, res, next) => {
try { 
 const page = parseInt(req.query.page) || 1;
 const limit = parseInt(req.query.limit) || 10;
 const sort = req.query.sort || "-createdAt";
 const search = req.query.q || req.query.search;
 const skip = (page - 1) * limit;  
 
 let filter = {};


  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i"} }
    ];
  }
 
  const notes = await NoteModel.find(filter)
    .sort(sort)
    .limit(limit)
    .skip(skip);

   if (notes.length === 0) { 
    return res.status(200).json({ message: "No Note found" });
   }

   return res.status(200).json({
   message: 'Notes fetched',
   data: notes
 })


} catch(error) {
   console.error(error)
   next(error)
    }
}


//GET A NOTE
const getNoteById = async (req, res, next) => {
try {
  const id = req.params.id
  const note = await NoteModel.findById(id)
 if(!note) {
  return res.status(404).json({ message: `Note not found`});
 }
  return res.status(200).json({
   message: 'Note found',
   data: note
 })
   } catch(error) {
console.error(error)
   next(error)
    }
}


//EDIT A NOTE
const updateNoteById = async (req, res, next) => {
 
const { error, value } = UpdatenoteSchema.validate(req.body);
 if(error) {
 return res.status(400).json({ error: error.details[0].message });
}
try {
  const id = req.params.id;
  const updatedNote = await NoteModel.findByIdAndUpdate(
    id, value,
  {
   new: true,
   runValidators: true 
   }
 );

if (!updateNote) {
return res.status(404).json({ message: `Note not found` });
    }
 return res.status(200).json({
 message:`Note updated`,
 data: updatedNote })
 
  } catch(error) {
   console.error(error)
   next(error)
  }
}


//DELETE NOTE
const deleteNoteById = async (req, res, next) => {
try {
  const id = req.params.id;
 const note = await NoteModel.findByIdAndDelete(id)
  if(!note) { 
    return res.status(404).json({
    message: `Note not found`});
   }
  return res.status(200).json({
   message: 'Note deleted'
  })

} catch(error) {
console.error(error)
   next(error)
}
}




module.exports = {
  postNote,
  getNotes,
  getNoteById,
  updateNoteById,
  deleteNoteById,
};
