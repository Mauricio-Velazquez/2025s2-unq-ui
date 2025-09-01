import express from 'express'
import SearchController from '../controllers/search.controller.js'
import { instagramSystem } from '../services/instagramSystem.js'

const router = express.Router()
const searchController = new SearchController(instagramSystem)

router.get('/', (req, res) => searchController.search(req, res))

export default router