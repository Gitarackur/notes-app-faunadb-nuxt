import { client, q } from './db'

export const getAllNotes = async() => {
  try{
    const response= await client.query(q.Paginate(q.Match(q.Ref('indexes/all_notes'))))
    const getAllProductDataQuery = response.data.map((ref) => q.Get(ref))
    const RefsToData= await client.query(getAllProductDataQuery)
    return RefsToData;
  }catch(err){
    console.log(err)
  }
}

export const getSingleNote = async(noteId) => {
  try{
    const response= await client.query(q.Get(q.Ref(q.Collection('notes'), noteId)))
    return response;
  }catch(err){
    console.log(err)
  }
}

export const createNote = async(text) => {
  try{
    const newNote= await client.query(q.Create(q.Collection('notes'),{data: {text},},))
    return newNote;
  }catch(err){
    console.log(err)
  }
}


export const editNote = async(noteId, text) => {
  try{
    const updatedNote = await client.query(q.Update(q.Ref(q.Collection('notes'), noteId),
    { data: { text } },))
    return updatedNote
  }catch(err){
    console.log(err)
  }
}


export const deleteNote = async(noteRef) => {
  try{
    const deletedNote = await client.query(q.Delete(q.Ref(q.Collection('notes'), noteRef)));
    return deletedNote;
  }catch(err){
    console.log(err)
  }
}
