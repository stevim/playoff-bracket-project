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
    res.redirect('/athletes/index')
  })
}

function index(req, res) {
  Athlete.find({})
  .populate('creator')
  .then(athletes => {
    res.render('athletes/index', {
      athletes,
      title: 'Athletes'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/athletes')
  })
}

function create(req,res) {
  req.body.creator=req.user.profile._id
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
  .populate([
    {
      path: 'comments',
      populate: {
        path: 'creator',
        model: 'Profile'
      }
    } 
  ])
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
  Athlete.findById(req.params.athleteId)
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

function deleteComment(req, res) {
  Athlete.findById(req.params.athleteId)
  .then(athlete => {
    athlete.comments.remove(req.params.commentId)
    athlete.save()
    .then(() => {
      res.redirect(`/athletes/${athlete._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/athletes')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/athletes')
  })
}


export {
  create,
  index,
  show,
  newAthlete as new,
  deleteAthlete as delete,
  createComment,
  deleteComment,
}