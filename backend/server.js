// backend/server.js
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Configuration MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const DB_NAME = 'deliveryDB';

let db;

// Connexion à MongoDB
MongoClient.connect(MONGO_URI)
  .then(client => {
    console.log('✅ Connecté à MongoDB');
    db = client.db(DB_NAME);
  })
  .catch(error => console.error('❌ Erreur de connexion MongoDB:', error));

// ==================== ROUTES API ====================

// Route de test
app.get('/api/test', (req, res) => {
  res.json({ message: 'API fonctionne !', timestamp: new Date() });
});

// 1. Récupérer tous les livreurs
app.get('/api/livreurs', async (req, res) => {
  try {
    const livreurs = await db.collection('livreurs').find().toArray();
    res.json(livreurs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Récupérer toutes les livraisons avec détails
app.get('/api/livraisons', async (req, res) => {
  try {
    const livraisons = await db.collection('livraisons').aggregate([
      {
        $lookup: {
          from: 'livreurs',
          localField: 'livreur_id',
          foreignField: '_id',
          as: 'livreur'
        }
      },
      {
        $lookup: {
          from: 'commandes',
          localField: 'commande_id',
          foreignField: '_id',
          as: 'commande'
        }
      },
      {
        $unwind: '$livreur'
      },
      {
        $unwind: '$commande'
      },
      {
        $project: {
          _id: 1,
          statut: 1,
          distance_km: 1,
          temps_estime_minutes: 1,
          temps_reel_minutes: 1,
          retard_minutes: 1,
          evaluation_client: 1,
          date_assignation: 1,
          date_livraison: 1,
          livreur_nom: { $concat: ['$livreur.prenom', ' ', '$livreur.nom'] },
          livreur_vehicule: '$livreur.vehicule',
          livreur_localisation: '$livreur.localisation_actuelle',
          client_nom: '$commande.client.nom',
          adresse: '$commande.adresse_livraison.rue',
          montant: '$commande.montant',
          restaurant: '$commande.restaurant.nom'
        }
      }
    ]).toArray();
    
    res.json(livraisons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Récupérer les statistiques globales (KPI)
app.get('/api/statistiques', async (req, res) => {
  try {
    const stats = await db.collection('livraisons').aggregate([
      {
        $group: {
          _id: null,
          total_livraisons: { $sum: 1 },
          temps_moyen: { $avg: '$temps_reel_minutes' },
          distance_totale: { $sum: '$distance_km' },
          livraisons_reussies: {
            $sum: { $cond: [{ $eq: ['$statut', 'livré'] }, 1, 0] }
          },
          en_cours: {
            $sum: { $cond: [{ $eq: ['$statut', 'en_cours'] }, 1, 0] }
          },
          en_retard: {
            $sum: { $cond: [{ $eq: ['$statut', 'retard'] }, 1, 0] }
          }
        }
      }
    ]).toArray();
    
    const livreurs_actifs = await db.collection('livreurs').countDocuments({
      statut: 'actif',
      disponible: true
    });
    
    res.json({
      ...stats[0],
      livreurs_actifs
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. Récupérer la performance par livreur
app.get('/api/livreurs/performance', async (req, res) => {
  try {
    const performances = await db.collection('livraisons').aggregate([
      {
        $lookup: {
          from: 'livreurs',
          localField: 'livreur_id',
          foreignField: '_id',
          as: 'livreur'
        }
      },
      {
        $unwind: '$livreur'
      },
      {
        $group: {
          _id: '$livreur_id',
          nom: { $first: { $concat: ['$livreur.prenom', ' ', '$livreur.nom'] } },
          zone: { $first: '$livreur.zone_assignee' },
          vehicule: { $first: '$livreur.vehicule' },
          actif: { $first: '$livreur.disponible' },
          total_livraisons: { $sum: 1 },
          livraisons_reussies: {
            $sum: { $cond: [{ $eq: ['$statut', 'livré'] }, 1, 0] }
          },
          temps_moyen: { $avg: '$temps_reel_minutes' },
          distance_totale: { $sum: '$distance_km' },
          retards: {
            $sum: { $cond: [{ $gt: ['$retard_minutes', 0] }, 1, 0] }
          }
        }
      },
      {
        $project: {
          nom: 1,
          zone: 1,
          vehicule: 1,
          actif: 1,
          total_livraisons: 1,
          taux_reussite: {
            $multiply: [
              { $divide: ['$livraisons_reussies', '$total_livraisons'] },
              100
            ]
          },
          temps_moyen: { $round: ['$temps_moyen', 1] },
          distance_totale: { $round: ['$distance_totale', 1] },
          nombre_retards: '$retards'
        }
      },
      {
        $sort: { taux_reussite: -1 }
      }
    ]).toArray();
    
    res.json(performances);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5. Récupérer les zones
app.get('/api/zones', async (req, res) => {
  try {
    const zones = await db.collection('zones').find().toArray();
    res.json(zones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 6. Récupérer les incidents
app.get('/api/incidents', async (req, res) => {
  try {
    const incidents = await db.collection('incidents').aggregate([
      {
        $lookup: {
          from: 'livraisons',
          localField: 'livraison_id',
          foreignField: '_id',
          as: 'livraison'
        }
      },
      {
        $lookup: {
          from: 'livreurs',
          localField: 'livreur_id',
          foreignField: '_id',
          as: 'livreur'
        }
      },
      {
        $unwind: '$livraison'
      },
      {
        $unwind: '$livreur'
      },
      {
        $project: {
          type: 1,
          description: 1,
          date: 1,
          resolu: 1,
          impact_minutes: 1,
          livreur_nom: { $concat: ['$livreur.prenom', ' ', '$livreur.nom'] }
        }
      },
      {
        $sort: { date: -1 }
      }
    ]).toArray();
    
    res.json(incidents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur API démarré sur http://localhost:${PORT}`);
  console.log(`📊 Testez l'API: http://localhost:${PORT}/api/test`);
});