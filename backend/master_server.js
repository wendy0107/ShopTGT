const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_PROJ_URL;
const SUPABASE_API_KEY = process.env.SUPABASE_SECRET_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);

function getCurrentTimestamp() {
    const currentDate = new Date();
    const formattedTimestamp = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} 
            ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;
    console.log(formattedTimestamp)
    return formattedTimestamp
}

app.get('/', (req, res) => {
  res.send('Hello, this is your backend!');
});

app.post('/login', async (req, res) => {
    console.log(req.body)
    console.log(req.body.email)
    const email = req.body.email;

    let {data, error} = await supabase.rpc('add_user', {email_input : email})
    if (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    } else {
        console.log(data)
        res.status(200).json(data);
    }
});

app.post('/listings/:user_id/create', async (req, res) => {
    console.log("api url called")
    const user_id = req.params.user_id;
    console.log("user id", user_id);
    const {title, description, collection_point} = req.body;
    const currentDate = new Date();
    const formattedTimestamp = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;
    console.log(formattedTimestamp);
    const status = "OPEN";
    console.log("Type of user_id:", typeof user_id);
    console.log("Type of title:", typeof title);
    console.log("Type of description:", typeof description);
    console.log("Type of collection_point:", typeof collection_point);


    let {data, error} = await supabase.rpc('create_listing', {
        collection_point: collection_point,
        creation_date: formattedTimestamp,
        description: description,
        last_updated: formattedTimestamp,
        owner_id: user_id,
        status: status,
        title: title})
    
    if (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    } else {
        console.log("listing id created:", data)
        res.status(200).json(data)
    }
});

app.post('/listings/:listing_id/delete', async (req, res) => {
    const listing_id = req.params.listing_id;
    console.log(listing_id)
    let { data, error } = await supabase.rpc('delete_listing', { listing_id })
    if (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    } else {
        console.log(data)
        res.status(200).json({message: "Successfully delete", listing_id})
    }
});

app.post('/listings/:listing_id/update-status', async (req, res) => {
    const listing_id = req.params.listing_id;
    const new_status = req.body.status;
    console.log(listing_id)
    console.log(new_status)
    let { data, error } = await supabase.rpc('update_listing_status', {listing_id, new_status})
    if (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    } else {
        console.log(data)
        res.status(200).json({message: "Successfully updated status to", new_status})
    }
});

app.post('/orders/:listing_id/:user_id', async (req, res) => {
    const listing_id = req.params.listing_id;
    const user_id = req.params.user_id;
    console.log(listing_id)
    console.log(user_id)
    const item_quantities = req.body.item_quantities
    console.log(item_quantities)
    console.log(typeof item_quantities)
    const currentTimestamp = getCurrentTimestamp()
    
    let { data, error } = await supabase.rpc('create_order', {
        finalised_quantities: null, 
        has_collected: false, 
        item_quantities: item_quantities, 
        last_modified: currentTimestamp, 
        order_buyer_id: user_id, 
        order_listing_id: listing_id})

    if (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    } else {
        console.log(data)
        res.status(200).json({message: "Successfully created order", item_quantities})
    }
});

app.listen(port, () => {
    console.log(`Server is running at this link http://localhost:${port}`);
});