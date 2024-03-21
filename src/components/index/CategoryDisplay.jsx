import React, { useState, useEffect } from 'react';
import { Button, Typography, Grid, Paper, Snackbar, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios'; 
import CategoryList from './CategoryList';
import ProductList from './ProductList';
import Cart from './Cart';
import TicketPrinter from './TicketPrinter'; 
import '../../styles/CategoryProductDisplay.css';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CategoryIcon from '@mui/icons-material/Category';

function CategoryDisplay() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [productsVisible, setProductsVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [paymentAmount, setPaymentAmount] = useState(0);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const [paymentMethods, setPaymentMethods] = useState(['Espèce', 'Chèque', 'Carte']);

    useEffect(() => {
        
        fetch('http://127.0.0.1:8000/categories')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Erreur lors de la récupération des catégories :', error));

        
        fetch('http://127.0.0.1:8000/produits')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Erreur lors de la récupération des produits :', error));

        
        fetch('http://127.0.0.1:8000/payment-methods')
            .then(response => response.json())
            .then(data => setPaymentMethods(data))
            .catch(error => console.error('Erreur lors de la récupération des moyens de paiement :', error));
    }, []);

    
    const createNotification = async (message) => {
        try {
            await axios.post('http://127.0.0.1:8000/notifications', { message, type: 'info' });
        } catch (error) {
            console.error('Error creating notification:', error);
        }
    };

    const handleCategoryClick = (categoryId) => {
        setSelectedCategory(categoryId);
        setProductsVisible(true);
    };

    const handleProductSelect = (productId) => {
        setSelectedProduct(productId);
    };

    const handleAddToCart = () => {
        if (selectedProduct) {
            const productToAdd = products.find(product => product.id === selectedProduct);
            if (productToAdd) {
                const existingCartItem = cart.find(item => item.id === productToAdd.id);
                if (existingCartItem) {
                    existingCartItem.quantity += 1;
                    setCart([...cart]);
                } else {
                    setCart([...cart, { ...productToAdd, quantity: 1 }]);
                }
                setTotalPrice(totalPrice + parseFloat(productToAdd.prix_unitaire));
            }
        }
    };

    const handleRemoveFromCart = (productId) => {
        const removedItem = cart.find(item => item.id === productId);
        if (removedItem) {
            setTotalPrice(totalPrice - (parseFloat(removedItem.prix_unitaire) * removedItem.quantity));
            const updatedCart = cart.filter(item => item.id !== productId);
            setCart(updatedCart);
        }
    };

    const handleClosePaymentSuccess = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setPaymentSuccess(false);
    };

    const savePayment = () => {
        if (selectedPaymentMethod === '') {
            console.error('Veuillez sélectionner un moyen de paiement');
            alert('Veuillez sélectionner un moyen de paiement');
            return;
        }

        let totalAmount = 0;
        cart.forEach(item => {
            totalAmount += parseFloat(item.prix_unitaire) * item.quantity;
        });
    
        setPaymentAmount(totalAmount);
    
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' '); 
    
        const paymentData = {
            montant: totalAmount,
            date_paiement: formattedDate,
            produit_id: cart.map(product => product.id),
            moyen_paiement: selectedPaymentMethod 
        };
    
        fetch('http://127.0.0.1:8000/paiements', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('La requête a échoué');
            }
            return response.json();
        })
        .then(data => {
            console.log('Paiement enregistré avec succès:', data);
            setPaymentAmount(0);
            setCart([]);
            setTotalPrice(0);
            setPaymentSuccess(true); 
            createNotification('Paiement enregistré !');
        })
        .catch(error => console.error('Erreur lors de l\'enregistrement du paiement:', error));
    };

    return (
        <div className="container">
            <Snackbar 
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={paymentSuccess} 
                autoHideDuration={6000} 
                onClose={handleClosePaymentSuccess}
            >
                <MuiAlert elevation={6} variant="filled" onClose={handleClosePaymentSuccess} severity="success">
                    Paiement enregistré avec succès !
                </MuiAlert>
            </Snackbar>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <Paper elevation={3} style={{ padding: '20px' }}>
                    

                <Typography variant="h5" gutterBottom style={{ marginBottom: '20px', color: '#333', fontWeight: 'bold', textAlign: 'center' }}>
                    <CategoryIcon style={{ marginRight: '10px', verticalAlign: 'middle' }} />
                    Catégories
                </Typography>
                <CategoryList categories={categories} handleCategoryClick={handleCategoryClick} />
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                
                <Typography variant="h5" gutterBottom style={{ marginBottom: '20px', color: '#333', fontWeight: 'bold', textAlign: 'center' }}>
                    <StorefrontIcon style={{ marginRight: '10px', verticalAlign: 'middle' }} />
                    Produits
                </Typography>


                    <ProductList
                        products={products}
                        selectedCategory={selectedCategory}
                        productsVisible={productsVisible}
                        selectedProduct={selectedProduct}
                        handleProductSelect={handleProductSelect}
                        handleAddToCart={handleAddToCart}

                    />
                </Grid>
                <Grid item xs={4}>
                    <Cart
                        cart={cart}
                        totalPrice={totalPrice}
                        handleRemoveFromCart={handleRemoveFromCart}
                        savePayment={savePayment}
                        paymentMethods ={paymentMethods}
                    />
                    <Grid container justifyContent="flex-end" alignItems="center" style={{ marginTop: '20px' }}>
    <Grid item>
    <FormControl style={{ marginTop: '20px', position: 'absolute', top: '120px', right: '120px', minWidth: '150px', backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>            <InputLabel id="payment-method-label">Moyen de paiement</InputLabel>
            <Select
                labelId="payment-method-label"
                id="payment-method-select"
                value={selectedPaymentMethod}
                onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                style={{ width: '100%' }}
            >
                <MenuItem value="">
                    
                </MenuItem>
                {paymentMethods.map((method, index) => (
                    <MenuItem key={index} value={method}>{method}</MenuItem>
                ))}
            </Select>
        </FormControl>
    </Grid>
</Grid>
                </Grid>
            </Grid>
            {}
            <TicketPrinter />
        </div>
    );
}

export default CategoryDisplay;
