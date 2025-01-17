const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Database connection with MongoDB
mongoose.connect("mongodb+srv://bhaveshnegi:kedarnath@cluster0.flnm3.mongodb.net/e-commerce");

// API creation
app.get("/", (req, res) => {
    res.send("Express app is running");
});

// Image storage engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

// Creating upload endpoint for images
app.use('/images', express.static('upload/images'));

app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        img_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

// Schema for creating products
const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },
});

app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        id = products[products.length - 1].id + 1;
    } else {
        id = 1;
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success: true,
        name: req.body.name,
    });
});

// Creating API to delete product
app.post('/removeproduct', async (req, res) => {
    const product = await Product.findOneAndDelete({ id: req.body.id });
    console.log("Removed");
    res.json({
        success: true,
        name: product.name,
    });
});

// Creating API for getting all products
app.get('/allproducts', async (req, res) => {
    let products = await Product.find({});
    console.log("All products fetched");
    res.send(products);
});

// Payment processing API
app.post('/api/payment', (req, res) => {
    const { cardNumber, expiryDate, cvv, amount } = req.body;

    // Validate payment details
    if (!validatePayment(cardNumber, expiryDate, cvv, amount)) {
        return res.status(400).json({ success: false, message: 'Invalid payment details.' });
    }

    // Mock payment processing
    const isSuccess = Math.random() > 0.5; // Randomly simulate success or failure

    if (isSuccess) {
        return res.json({ success: true, message: 'Payment Successful!' });
    } else {
        return res.json({ success: false, message: 'Payment Failed. Please try again.' });
    }
});

function validatePayment(cardNumber, expiryDate, cvv, amount) {
    return (
        cardNumber.length === 16 &&
        /^\d{2}\/\d{2}$/.test(expiryDate) && // Ensure MM/YY format
        cvv.length === 3 &&
        amount > 0
    );
}

app.listen(port, (error) => {
    if (!error) {
        console.log(`Server is running on port ${port}`);
    } else {
        console.log(error);
    }
});
