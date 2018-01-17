const { Controller } = require('bak')
const Boom = require('boom')

const { Music } = require('../models')

class PublicController extends Controller {
	init() {
		this.get('/music', this.music)
		this.post('/music', this.postMusic)
	}

	async music() {
		const all = await Music.find({})
		return all
	}

	async postMusic(req, res) {
		// throw Boom.notImplemented("SS")
		if (req.payload.action === 'add') {
			const p = new Music({ name: req.payload.name })
			await p.save()
			return p
		}
		else if (req.payload.action === 'remove') {
			const re = await Music.remove({ name: req.payload.name })
			return re;
		}
	}

}

module.exports = PublicController
