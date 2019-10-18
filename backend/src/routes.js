const { Router } = require('express')
const FilmesController = require('./controllers/FilmesController')

const router = Router()

router.get('/filmes', FilmesController.Index)
router.get('/filmes/:id', FilmesController.Detail)
router.get('/generos', FilmesController.Generos)
router.get('/search/:search', FilmesController.Search)

module.exports = router
