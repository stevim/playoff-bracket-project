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

function index(req, res) {
  Athlete.find({})
  .then(athletes => {
    res.render('athletes/index', {
      athletes: athletes,
      title: 'Athletes'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/athletes')
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

function show(req, res) {
  Athlete.findById(req.params.athleteId)
  .then(athlete => {
    res.render('athletes/show', {
      athlete,
      title: athlete.name,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/pages')
  })
}


export {
  create,
  index,
  show,
  newAthlete as new,
}