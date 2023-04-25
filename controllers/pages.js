import { Page } from "../models/page.js"
import { Team } from "../models/team.js"

function newPage(req, res) {
  res.render('pages/new', {
    title: 'Add Page'
  })
}

function create(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  Page.create(req.body)
  .then(page => {
    res.redirect(`/pages/${page._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/pages/new')
  })
}

function index(req, res) {
  Page.find({})
  .then(pages => {
    res.render('pages/index', {
      pages: pages,
      title: 'All Movies'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/pages/new')
  })
}

function show(req, res) {
  Page.findById(req.params.pageId)
  .populate('favTeams')
  .then(page => {
    Team.find({_id: {$nin: page.favTeams}})
    .then(teams => {
      console.log(page, '<--- PAGE')
      console.log(teams, '<--- TEAMS NOT IN PAGE')
      res.render('pages/show', {
        page: page,
        title: 'Page Detail',
        teams: teams
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
      page: page,
      title: 'Edit Page'
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
    page.comments.id(req.params.commentId).deleteOne()
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
  // find the page using it's _id
  // push the peformer _id into the favTeams array
  // save the page
  // redirect back to show view
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
  addToFavTeams
}