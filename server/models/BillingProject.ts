import mongoose from 'mongoose'

const billingProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  owner: {
    type: String,
    required: true,
    trim: true
  },
  linkUrl: {
    type: String,
    trim: true,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export const BillingProject = mongoose.models.BillingProject || mongoose.model('BillingProject', billingProjectSchema)
