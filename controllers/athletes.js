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
    res.redirect('/athletes')
  })
}

function deleteAthlete(req, res) {
  Athlete.findByIdAndDelete(req.params.athleteId)
  .then(athlete => {
    res.redirect('/athletes/index')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/athletes')
  })
}

function createComment(req, res) {
  req.body.creator=req.user.profile._id
  Athlete.findById(req.params.athleteid)
  .then(athlete => {
    athlete.comments.push(req.body)
    athlete.save()
    .then(()=> {
      res.redirect(`/athletes/${athlete._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}


export {
  create,
  index,
  show,
  newAthlete as new,
  deleteAthlete as delete,
  createComment,
}