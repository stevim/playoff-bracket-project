import { Team } from "../models/team.js"

function newTeam(req,res) {
  Team.find({})
  .then(teams => {
    res.render('teams/new', {
      title: 'Add Team',
      teams
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/teams/new')
  })
}

function index(req, res) {
  Team.find({})
  .then(teams => {
    res.render('teams/index', {
      teams: teams,
      title: 'Teams'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/teams')
  })
}

function create(req,res) {
  Team.create(req.body)
  .then(team => {
    res.redirect('/teams/new')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/teams/new')
  })
}

function show(req, res) {
  Team.findById(req.params.teamId)
  .populate([
    {
      path: 'comments',
      populate: {
        path: 'creator',
        model: 'Profile'
      }
    }
  ])
  .then(team => {
    res.render('teams/show', {
      team,
      title: team.name,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/teams')
  })
}

function deleteTeam(req, res) {
  Team.findByIdAndDelete(req.params.teamId)
  .then(team => {
    res.redirect('/teams/index')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/teams')
  })
}

function createComment(req, res) {
  req.body.creator=req.user.profile._id
  Team.findById(req.params.teamId)
  .then(team => {
    team.comments.push(req.body)
    team.save()
    .then(()=> {
      res.redirect(`/teams/${team._id}`)
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
  Team.findById(req.params.teamId)
  .then(team => {
    team.comments.remove(req.params.commentId)
    team.save()
    .then(() => {
      res.redirect(`/teams/${team._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/teams')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/teams')
  })
}

export {
  create,
  index,
  show,
  newTeam as new,
  deleteTeam as delete,
  createComment,
  deleteComment,
}