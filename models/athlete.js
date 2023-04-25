import mongoose from "mongoose"

const Schema = mongoose.Schema

const athleteSchema = new Schema({
  name: {
    type: String,
    required: true
  }
}, {
    timestamps: true
})


const Athlete = mongoose.model('Athlete', athleteSchema)

export {
  Athlete
}