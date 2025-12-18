import mongoose from 'mongoose'

const ticketProjectSchema = new mongoose.Schema({
  linkUrl: {
    type: String,
    required: true,
    trim: true
  },
  owner: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    trim: true,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export const TicketProject = mongoose.models.TicketProject || mongoose.model('TicketProject', ticketProjectSchema)

