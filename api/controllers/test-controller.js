const { Controller } = require('bak')
const Boom = require('boom')

const { Music } = require('../models')

class PublicController extends Controller {
	init() {
		this.get('/music', this.music)
		this.post('/music', this.newMusic)
	}

	async music() {
		const all = await Music.find({})
		return all
	}

	async newMusic(req, res) {
		// throw Boom.notImplemented("SS")
		console.log('i')
		const p = new Music({name: req.payload.name})
		await p.save()
		return p
	}

}

module.exports = PublicController
