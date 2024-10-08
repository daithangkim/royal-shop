import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { bestsellerProducts, homeProducts } from "../../../assets/Product/ProductDataBase";
import AddToCartButton from "./AddToCartButton";
import { Alert, Button, Snackbar } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Import the icon
import { addToCart } from "../../../redux/slices/cartSlice";

// Combine all product arrays into one
const allProducts = [...homeProducts, ...bestsellerProducts];

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const product = allProducts.find(p => p.id === parseInt(id));

    if (!product) {
        return <div>Product not found</div>;
    }

    const handleAddToCart = () => {
        dispatch(addToCart(product));
        setOpenSnackbar(true);
    };

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);  // Close Snackbar
    };

    return (
        <div style={{ padding: '20px' }}>
            <Button
                component={Link}
                to='/'
                variant="outlined"
                startIcon={<ArrowBackIcon />} // Add the icon
                style={{ position: 'absolute', top: '80px', left: '20px' }} // Positioning the button
            >
                Go Back
            </Button>

            <h1>{product.name}</h1>
            <img src={product.image} alt={product.name} style={{ width: '300px' }} />
            <h2>Price: ${product.price}</h2>
            <p>{product.description}</p>
            <AddToCartButton onAddToCart={handleAddToCart} />

            {openSnackbar && (
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={3000}
                    onClose={handleSnackbarClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert onClose={handleSnackbarClose} severity="info">
                        {`${product.name} has been added to your cart!`}
                    </Alert>
                </Snackbar>
            )}
        </div>
    );
};

export default ProductDetails;
