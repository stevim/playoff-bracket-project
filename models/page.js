import mongoose from "mongoose"

const Schema = mongoose.Schema

const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId, ref: 'Profile'
  }
}, {
  timestamps: true,
})

const pageSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  comments: [commentSchema],
  favTeams: [{
    type: Schema.Types.ObjectId, ref: 'Team'
  }],
  favAthletes: [{
    type: Schema.Types.ObjectId, ref: 'Athlete'
  }],
  creator: {
    type: Schema.Types.ObjectId, ref: 'Profile'
  }
}, {
  timestamps: true,
})

const Page = mongoose.model('Page', pageSchema)


export {
  Page,
}