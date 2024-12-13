
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fvwozyawtwcbjmfrvtud.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const insertData = async () => {
    const { data, error } = await supabase
      .from('fitness')  // The table you want to insert data into
      .insert([
        { column1: 'value1', column2: 'value2' }  // Data to insert
      ]);
  
    if (error) {
      console.error('Error inserting data:', error);
    } else {
      console.log('Inserted data:', data);
    }
  };
  


  const updateData = async () => {
    const { data, error } = await supabase
      .from('fitness')
      .update({ column1: 'new_value' })  // The data to update
      .eq('id', 1);  // Where condition (e.g., where id = 1)
  
    if (error) {
      console.error('Error updating data:', error);
    } else {
      console.log('Updated data:', data);
    }
  };
  

  const deleteData = async () => {
    const { data, error } = await supabase
      .from('fitness')
      .delete()
      .eq('id', 1); 
  
    if (error) {
      console.error('Error deleting data:', error);
    } else {
      console.log('Deleted data:', data);
    }
  };
  
 
  
async function fetchData() {
    const { data, error } = await supabase
      .from('fitness') // Replace with your table name
      .select('*');
  
    if (error) {
      console.error(error);
      return;
    }
  
    console.log(data);
  }


  insertData();
  updateData();
  deleteData();
  fetchData();