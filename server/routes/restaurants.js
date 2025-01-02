import express from 'express';
import Restaurant from '../models/Restaurant.js';

const router = express.Router();

// Get all restaurants for KAM
router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.find({ assignedKam: req.user.userId });
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching restaurants', error: error.message });
  }
});

// Get today's calls
router.get('/today-calls', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const restaurants = await Restaurant.find({
      assignedKam: req.user.userId,
      nextCallDate: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
      }
    });
    
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching today\'s calls', error: error.message });
  }
});

// Add new restaurant
router.post('/', async (req, res) => {
  try {
    const restaurant = new Restaurant({
      ...req.body,
      assignedKam: req.user.userId
    });
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: 'Error creating restaurant', error: error.message });
  }
});

// Add interaction
router.post('/:id/interactions', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    restaurant.interactions.push(req.body);
    
    if (req.body.type === 'call') {
      restaurant.lastCallDate = req.body.date;
      // Calculate next call date based on frequency
      const nextCallDate = new Date(req.body.date);
      switch (restaurant.callFrequency) {
        case 'daily':
          nextCallDate.setDate(nextCallDate.getDate() + 1);
          break;
        case 'weekly':
          nextCallDate.setDate(nextCallDate.getDate() + 7);
          break;
        case 'biweekly':
          nextCallDate.setDate(nextCallDate.getDate() + 14);
          break;
        case 'monthly':
          nextCallDate.setMonth(nextCallDate.getMonth() + 1);
          break;
      }
      restaurant.nextCallDate = nextCallDate;
    }

    await restaurant.save();
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: 'Error adding interaction', error: error.message });
  }
});

// Update restaurant
router.put('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findOneAndUpdate(
      { _id: req.params.id, assignedKam: req.user.userId },
      req.body,
      { new: true }
    );
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: 'Error updating restaurant', error: error.message });
  }
});

export default router;