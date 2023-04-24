import { Bracket } from "../models/bracket.js"

function index(req,res) {
  Bracket.find({})
  .then(brackets => {
    res.render('brackets/index'), {
      brackets,
      title: 'All Brackets'
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/brackets/new')
  })
}


export {
  index,
}