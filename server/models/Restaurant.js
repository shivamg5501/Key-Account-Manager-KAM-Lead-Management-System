import mongoose from 'mongoose';

const pointOfContactSchema = new mongoose.Schema({
  name: String,
  role: String,
  phone: String,
  email: String,
  isPrimary: {
    type: Boolean,
    default: false,
  },
});

const interactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['call', 'order', 'meeting', 'other'],
  },
  date: Date,
  notes: String,
  outcome: String,
  nextFollowUpDate: Date,
});

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false, // Optional, as it's in formData
  },
  status: {
    type: String,
    enum: ['lead', 'prospect', 'customer', 'inactive'],
    default: 'lead', // Matches formData
  },
  address: {
    street: {
      type: String,
      required: false, // Matches formData
    },
    city: {
      type: String,
      required: false, // Matches formData
    },
    state: {
      type: String,
      required: false, // Matches formData
    },
    zipCode: {
      type: String,
      required: false, // Matches formData
    },
  },
  pointsOfContact: [pointOfContactSchema], // Optional as not in formData
  interactions: [interactionSchema], // Optional as not in formData
  assignedKam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false, // Optional as not in formData
  },
  callFrequency: {
    type: String,
    enum: ['daily', 'weekly', 'biweekly', 'monthly'],
    default: 'weekly', // Matches formData
  },
  lastCallDate: Date, // Optional
  nextCallDate: Date, // Optional
  averageOrderValue: {
    type: Number,
    default: 0, // Optional, not in formData
  },
  orderFrequency: {
    type: Number,
    default: 0, // Optional, not in formData
  },
  performanceScore: {
    type: Number,
    default: 0, // Optional, not in formData
  },
});

restaurantSchema.index({ assignedKam: 1, nextCallDate: 1 });
restaurantSchema.index({ performanceScore: -1 });

export default mongoose.model('Restaurant', restaurantSchema);
