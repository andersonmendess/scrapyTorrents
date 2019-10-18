const Filme = require('../models/Filme');

module.exports = {
  async Index(req, res) {
    const { page } = req.query || 1
    const filme = await Filme.paginate({}, {
      page,
      limit: 27,
      sort: { ano_lancamento: -1, updated_at: -1 },
      select: 'titulo titulo_slug ano_lancamento image_url imdb'
    })
    res.json(filme)
  },

  async Generos(req, res) {
    const generos = await Filme.find().distinct('genero')
    return res.json(generos)
  },

  async Detail(req, res) {
    const { id } = req.params
    const filme = await Filme.findById(id)
    return res.json(filme)
  },

  async Search(req, res) {
    const { search } = req.params
    const filmes = await Filme.find({
      titulo: { $regex: search.toLowerCase().replace(' ', '_'), $options: 'i' }
    }).select('titulo ano_lancamento image_url trailer imdb')
    return res.json(filmes)
  },
};
