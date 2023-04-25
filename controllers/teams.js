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

function deleteTeam(req, res) {
  Team.findByIdAndDelete(req.params.teamId)
  .then(team => {
    res.redirect('/teams')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/teams')
  })
}

export {
  create,
  newTeam as new,
  deleteTeam as team,
}