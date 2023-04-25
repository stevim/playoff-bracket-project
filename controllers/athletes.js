import { Athlete } from "../models/athlete.js"

function newAthlete(req,res) {
  Athlete.find({})
  .then(athletes => {
    res.render('athletes/new', {
      title: 'Add Athlete',
      athletes
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/athletes/new')
  })
}


function create(req,res) {
  Athlete.create(req.body)
  .then(athlete => {
    res.redirect('/athletes/new')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/athletes/new')
  })
}

export {
  create,
  newAthlete as new,
}