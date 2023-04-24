import { Team } from "../models/team.js"

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

export {
  create
}