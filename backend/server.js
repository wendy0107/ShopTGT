const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');
const {v4: uuidv4} = require('uuid');

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

function filterListingsAndUsers(data) {
    const listings = [];
    const users = [];
    console.log(data)
    // console.log(data.listings)

    // Iterate through the listings array
    data.forEach((listing) => {
        const listingData = {};
        const userData = {};

        // Iterate through the key-value pairs of each listing
        for (const [key, value] of Object.entries(listing)) {
            // Check if the key starts with "user_"
            if (key.startsWith('user_')) {
                userData[key] = value;
            } else {
                listingData[key] = value;
            }
        }

        listings.push(listingData);
        users.push(userData);
    });

    const uniqueUsers = []
    const userIDs = new Set()

    users.forEach((user) => {
        const userID = user.user_id

        if (!userIDs.has(userID)) {
            uniqueUsers.push(user)
            userIDs.add(userID)
        }
    })

    return { listings, owners: uniqueUsers };
}

function filterOrdersAndBuyers(data) {
    const listings = [];
    const users = [];
    console.log(data)
    // console.log(data.listings)

    // Iterate through the listings array
    data.forEach((listing) => {
        const listingData = {};
        const userData = {};

        // Iterate through the key-value pairs of each listing
        for (const [key, value] of Object.entries(listing)) {
            // Check if the key starts with "user_"
            if (key.startsWith('buyer_')) {
                userData[key] = value;
            } else {
                listingData[key] = value;
            }
        }

        listings.push(listingData);
        users.push(userData);
    });

    const uniqueUsers = []
    const userIDs = new Set()

    users.forEach((user) => {
        const userID = user.buyer_id

        if (!userIDs.has(userID)) {
            uniqueUsers.push(user)
            userIDs.add(userID)
        }
    })

    return { orders: listings, buyers: uniqueUsers };
}
app.get('/', (req, res) => {
  res.send('Hello, this is your backend!');
});

app.post('/login', async (req, res) => {
    console.log(req.body)
    console.log(req.body.email)
    const { email, phone } = req.body

    let {data, error} = await supabase.rpc('add_user_with_phone', {
        email_input : email,
        phone_number : phone
    })
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
        title: title
    })
    
    if (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    } else {
        console.log("listing id created:", data)
        res.status(200).json(data)
    }
});

app.post('/items/:listing_id', async (req, res) => {
    const listing_id = req.params.listing_id
    const { title, price, quantity, remaining_quantity } = req.body;

    let { data, error } = await supabase.rpc('create_item', {
    listing_id : listing_id, 
    name : title, 
    price: price, 
    quantity : quantity, 
    remaining_quantity : remaining_quantity
});
    if (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    } else {
        console.log(data)
        res.status(200).json({message: "Successfully created item", data})
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
        console.log(new_status)
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
        order_listing_id: listing_id
    })

    if (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    } else {
        console.log("Created order", item_quantities)
        res.status(200).json({message: "Successfully created order", item_quantities})
    }
});

app.post('/orders/:listing_id/:user_id/delete', async (req, res) => {
    const listing_id = req.params.listing_id;
    const user_id = req.params.user_id;

    let { error } = await supabase.from('orders').delete().eq('listing_id', listing_id).eq('buyer_id', user_id)

    if (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    } else {
        console.log("Deleted order")
        res.status(200).json({message: "Successfully deleted order"})
    }
});

app.put('/listings/:listing_id/:user_id/finalise-order', async (req, res) => {
    const listing_id = req.params.listing_id;
    const user_id = req.params.user_id;
    const finalised_quantities = req.body.finalised_quantities;

    let { data, error } = await supabase.rpc('update_finalised_quantities', {
        new_finalised_quantities: finalised_quantities,
        order_buyer_id: user_id,
        order_listing_id: listing_id
    })

    if (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error', message: error.message })
    } else {
        console.log("Updated finalised_quantities", finalised_quantities)
        res.status(200).json({message: "Successfully updated order", finalised_quantities})
    }
});

app.put('/listings/:listing_id/:user_id/order', async (req, res) => {
    const listing_id = req.params.listing_id;
    const user_id = req.params.user_id;
    const item_quantities = req.body.item_quantities;

    let { data, error } = await supabase.rpc('update_item_quantities', {
        new_item_quantities: item_quantities,
        order_buyer_id: user_id,
        order_listing_id: listing_id
    })

    if (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error', message: error.message })
    } else {
        console.log("Updated item_quantities", data)
        res.status(200).json({message: "Successfully updated order", data})
    }
});

app.put('/user/:user_id/update-user', async (req, res) => {
    const user_id = req.params.user_id
    const phone = req.body.phone

    let { data, error } = await supabase.rpc('update_user', {
        phone_number: phone,
        user_id: user_id
    })

    if (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error', message: error.message })
    } else {
        console.log("Updated number", phone)
        res.status(200).json({message: "Successfully updated number", phone})
    }
});

app.put('/orders/:listing_id/:user_id/update-payment', async (req, res) => {
    const listing_id = req.params.listing_id
    const user_id = req.params.user_id
    const has_payed = req.body.payed

    let { data, error } = await supabase.rpc('set_payment', {
        order_buyer_id: user_id,
        order_listing_id: listing_id,
        payment_status: has_payed
    })
    
    if (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error', message: error.message })
    } else {
        console.log("Updated payment status", has_payed)
        res.status(200).json({message: "Successfully updated payment status", has_payed})
    }
});

app.put('/items/:item_id/update_remaining_quantity', async (req, res) => {
    const item_id = req.params.item_id
    const remaining_quantity = req.body

    let { data, error } = await supabase.rpc('update_remaining_quantities', {
        item_id: item_id, 
        remaining_quantities_input: remaining_quantity
    })

    if (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error', message: error.message })
    } else {
        console.log(data)
        res.status(200).json({message: "Successfully updated remaining quantity", remaining_quantity})
    }
});

app.get('/listings/:user_id/all-listings', async (req, res) => {
    // get all listings created by user
    const user_id = req.params.user_id
    const { data, error } = await supabase.from('listings').select().eq('owner_id', user_id)
    console.log(data)
    if (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error', message: error.message })
    } else {
        console.log("Retrieved listings of ${user_id}", data)
        res.status(200).json({listings: data})
    }
});

app.get('/listings/:listing_id', async (req, res) => {
    // get listing details and items of a listing created by user
    const listing_id = req.params.listing_id
    const { data, error } = await supabase.from('listings').select().eq('id', listing_id)
    const listing_details = data
    console.log(data)
    if (listing_details != null) {
        const {data, error} = await supabase.from('items').select().eq('listing_id', listing_id)
        if (error) {
            console.log(error)
            res.status(500).json({ error: 'Internal Server Error', message: error.message })
        } else {
            const items = data
            console.log(listing_details)
            console.log(items)
            res.status(200).json({listing: listing_details, items: items})
        }
    } else {
        console.log("No such listing exists")
        res.status(200).json("No such listing exists")
    }
});

app.get('/orders/:user_id', async (req, res) => {
    // get all listings a user joined
    const user_id = req.params.user_id
    
    let { data, error } = await supabase.rpc('get_listings_joined_by_user', {user_id})

    console.log(data)
    if (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error', message: error.message })
    } else {
        console.log("Retrieved listings joined by", user_id)
        res.status(200).json({listings: data})
    }
});



app.get('/orders/:listing_id/buyers-details', async (req, res) => {
    const listing_id = req.params.listing_id

    let { data, error } = await supabase.rpc('get_buyers_details_orders_for_listing', {
        listing_id_input: listing_id
    })
  
    // console.log(data)
    if (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error', message: error.message })
    } else {
        console.log("Retrieved listing's buyers' orders only and buyer details")
        res.status(200).json(filterOrdersAndBuyers(data))
    }
})

app.get('/orders/:user_id/listing_owner', async (req, res) => {
    // get all listings a user joined
    const user_id = req.params.user_id
    
    let { data, error } = await supabase.rpc('get_listings_and_owner_joined_by_user', {user_id_input:user_id})

    // console.log(data)
    if (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error', message: error.message })
    } else {
        // console.log(data)

        console.log(filterListingsAndUsers(data))

        console.log("Retrieved listings joined and listings' owner's detials")
        res.status(200).json(filterListingsAndUsers(data))
    }
});

app.get('/orders/:listing_id/:user_id/owner', async (req, res) => {
    // get orders made by the owner
    const listing_id = req.params.listing_id
    const owner_id = req.params.user_id
    
    let { data, error } = await supabase.from('orders').select().eq('listing_id', listing_id).eq('buyer_id', owner_id)

    console.log(data)
    if (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error', message: error.message })
    } else {
        console.log("Retrieved owner's order for %s", listing_id)
        res.status(200).json({order: data})
    }
});

app.get('/orders/:listing_id/buyers', async (req, res) => {
    // get orders made by buyers only (excluding the owner)
    const listing_id = req.params.listing_id

    let { data, error } = await supabase.rpc('get_buyers_orders_for_listing', {
        listing_id_input: listing_id
    })
  
    console.log(data)
    if (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error', message: error.message })
    } else {
        console.log("Retrieved listing's buyers' orders only")
        res.status(200).json({orders: data})
    }
});

app.get('/orders/:listing_id/:user_id', async (req, res) => {
    // get order made by specific buyer for a listing
    const listing_id = req.params.listing_id
    const user_id = req.params.user_id

    let { data, error } = await supabase.from('orders').select().eq('listing_id', listing_id).eq('buyer_id', user_id)
  
    console.log(data)
    if (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error', message: error.message })
    } else {
        console.log("Retrieved %s's order", user_id)
        res.status(200).json({order: data})
    }
});

app.get('/user/:user_id', async (req, res) => {
    const user_id = req.params.user_id

    let { data, error } = await supabase.from('users').select().eq('id', user_id)

    console.log(data)
    if (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error', message: error.message })
    } else {
        console.log("Retrieved %s's details", user_id)
        res.status(200).json({user_details: data})
    }
});

// app.post('/listings/:listing_id/upload-image', async (req, res) => {
//     const listing_id = req.params.listing_id
//     const newUUID = uuidv4()
//     const file = req.body

//     const { data, error } = await supabase.storage.from('images').upload(listing_id + "/" + newUUID, file)

//     if (error) {
//         console.log(error)
//         res.status(500).json({ error: 'Internal Server Error', message: error.message })
//     } else {
//         console.log(data)
//         res.status(200).json("done");
//     }
// });

// app.get('/listings/:listing_id/get-image-urls', async (req, res) => {
//     const listing_id = req.params.listing_id
//     const CDN = "https://ebdhnbzfjvzhdxashhrw.supabase.co/storage/v1/object/public/images/"

//     const { data, error } = await supabase.storage.from('images').list(listing_id + "/", {sortBy: {column: "name", order: "asc"}});

//     // data is an array of all the images
//     // each image is a key value pair name and name of image
//     // CDN: https://ebdhnbzfjvzhdxashhrw.supabase.co/storage/v1/object/sign/images/
//     // image url header CDN + listing_id
//     if (error) {
//         console.log(error)
//         res.status(500).json({ error: 'Internal Server Error', message: error.message })
//     } else {

//         console.log(data)
//         const image_urls = []
//         const download_urls = []

//         for (const image in data) {
//             console.log(image)
//             const image_name = data[image].name.replace(/ /g, '%')
//             const image_url = CDN + image_name
//             const {download_url} = supabase.storage.from('images').getPublicUrl(listing_id + image_name, {download: true,})
//             download_urls.push(download_url)
//             image_urls.push(image_url)
//         }
//         console.log(image_urls)
//         console.log(download_urls)
//         res.status(200).json({image_urls : image_urls});
//     }
// });

app.listen(port, () => {
    console.log(`Server is running at this link http://localhost:${port}`);
});