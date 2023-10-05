const router = requrie('express').Router()
const thoughtRoutes = require('./thoughtRoutes')
const userRoutes = require('./userRoutes')

router.use('/thoughts', thoughtRoutes)
router.use('/users', userRoutes)

module.exports = router