// import modules
const express = require('express')
const app = express()
const router = express.Router()

// Controller 불러와서 exports 메소드 사용
const controller = require('../controllers/todo')

// Main
// http://localhost:3000/todo/
router.get('/', controller.get) 

// Write
// http://localhost:3000/todo/write
router.post('/write', controller.write)

// Edit
router.get('/edit/:id', controller.edit)

// Update
router.post('/update/:id', controller.update)

// Remove
router.get('/remove/:id', controller.remove)

module.exports = router