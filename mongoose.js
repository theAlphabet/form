import mongoose from 'mongoose'

// connect to database 
mongoose.connect('mongodb://localhost/testDB')

// make database document model
const Entry = mongoose.model("Entry", {
  firstName : String, 
  lastName : String, 
  id : Number
})

// adding to database 
export async function CreateEntry(entry) {
  const entryModel = new Entry(entry)
  const result = await entryModel.save();
  console.log(result)
  return result;
}

export async function getEntries() {
  try {
    return await Entry.find().sort({ createdAt: -1 }); // Most recent first
  } catch (error) {
    throw new Error(`Database error: ${error.message}`);
  }
}