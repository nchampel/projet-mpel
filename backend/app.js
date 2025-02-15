const express = require('express');

const app = express();
app.use(express.json());
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://nsangohan:wSuXXdTQI5SAxDzt@clustermpel.l4nxy.mongodb.net/?retryWrites=true&w=majority&appName=ClusterMPEL')
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !')
);

const productRoutes = require('./routes/products');
const userRoutes = require('./routes/user');

app.use('/api/products', productRoutes);
app.use('/api/auth', userRoutes);

// app.use((req, res) => {
//    res.json({ message: 'Votre requête a bien été reçue !' }); 
// });

module.exports = app;