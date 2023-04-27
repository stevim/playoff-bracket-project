import { Page } from "../models/page.js"
import { Team } from "../models/team.js"
import { Athlete } from "../models/athlete.js"

function newPage(req, res) {
  res.render('pages/new')
}

function create(req, res) {
  req.body.creator=req.user.profile._id
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  Page.create(req.body)
  .then(page => {
    res.redirect(`/pages/${page._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/pages')
  })
}

function index(req, res) {
  Page.find({})
  .then(pages => {
    res.render('pages/index', {
      pages: pages,
      title: 'Sports'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/pages')
  })
}

function show(req, res) {
  Page.findById(req.params.pageId)
  .populate([
    { 
      path: 'comments',
      populate: {
        path: 'creator',
        model: 'Profile'
      },
    }, 
    'favTeams','favAthletes','creator'])
  .then(page => {
    Team.find({_id: {$nin: page.favTeams}})
    .then(teams => {
      Athlete.find({_id: {$nin: page.favAthletes}})
      .then(athletes => {
        res.render('pages/show', {
          page,
          title: page.title,
          teams,
          athletes,
        })
      })
      .catch(err => {
        console.log(err)
        res.redirect('/pages')
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/pages')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/pages')
  })
}

function deletePage(req, res) {
  Page.findByIdAndDelete(req.params.pageId)
  .then(page => {
    res.redirect('/pages')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/pages')
  })
}

function edit(req, res) {
  Page.findById(req.params.pageId)
  .then(page => {
    res.render('pages/edit', {
      page,
      title: 'Change Page Name'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/pages')
  })
}

function update(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  Page.findByIdAndUpdate(req.params.pageId, req.body, {new: true})
  .then(page => {
    res.redirect(`/pages/${page._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/pages')
  })
}

function createComment(req, res) {
  req.body.creator=req.user.profile._id
  Page.findById(req.params.pageId)
  .then(page => {
    page.comments.push(req.body)
    page.save()
    .then(()=> {
      res.redirect(`/pages/${page._id}`)
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
  Page.findById(req.params.pageId)
  .then(page => {
    page.comments.remove(req.params.commentId)
    page.save()
    .then(() => {
      res.redirect(`/pages/${page._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/pages')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/pages')
  })
}

function addToFavTeams(req, res) {
  Page.findById(req.params.pageId)
  .then(page => {
    page.favTeams.push(req.body.teamId)
    page.save()
    .then(() => {
      res.redirect(`/pages/${page._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/pages')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/pages')
  })
}

function addToFavAthletes(req, res) {
  Page.findById(req.params.pageId)
  .then(page => {
    page.favAthletes.push(req.body.athleteId)
    page.save()
    .then(() => {
      res.redirect(`/pages/${page._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/pages')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/pages')
  })
}

function deleteTeam(req,res) {
  Team.findByIdAndDelete(req.params.teamId)
  .then(page => {
    res.redirect(`/pages/${req.params.pageId}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/pages')
  })
}

function deleteAthlete(req,res) {
  Athlete.findByIdAndDelete(req.params.athleteId)
  .then(page => {
    res.redirect(`/pages/${req.params.pageId}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/pages')
  })
}


export {
  newPage as new,
  create,
  index,
  show,
  deletePage as delete,
  edit,
  update,
  createComment,
  deleteComment,
  addToFavTeams,
  addToFavAthletes,
  deleteTeam,
  deleteAthlete,
}