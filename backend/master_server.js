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
    } else {
        console.log(data)
        res.status(200).json(data);
    }
});



app.listen(port, () => {
    console.log(`Server is running at this link http://localhost:${port}`);
  });