import mongoose from "mongoose"

const Schema = mongoose.Schema

const seriesSchema = new Schema({
  teamA: [{
    type: Schema.Types.ObjectId,
    ref: 'Teams'
  }],
  teamB: [{
    type: Schema.Types.ObjectId,
    ref: 'Teams'
  }],
  winner: [{
    type: Schema.Types.ObjectId,
    ref: 'Teams'
  }],
  round: {
    type: Number,
    min: 1,
    max: 4,
  }
}, {
  timestamps: true,
})

const bracketSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    default: 0,
    min: 0,
  },
  series: [seriesSchema],
  creator: [{
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  }]
}, {
  timestamps: true,
})

const Bracket = mongoose.model('Bracket', bracketSchema)


export {
  Bracket,
}