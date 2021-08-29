const router = require('express').Router();
const thoughtRoutes = require('./thought-routes');
const userRoutes = require('./user-routes');

router.use('/api/thoughts', thoughtRoutes);
router.use('/api/users', userRoutes);
router.use((req, res) => {
  return res.send('Not here');
});

module.exports = router;
