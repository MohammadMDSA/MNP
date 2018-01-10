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

	async newMusic() {
		// throw Boom.notImplemented("SS")
		const p = new Music()
		await p.save()
		return p
	}

}

module.exports = PublicController
