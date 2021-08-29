const router = require('express').Router();
const { User } = require('../../models/');

router.get('/', (req, res) => {
  User.find()
    .select('-__v')
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  User.findOne({ _id: req.params.id })
    .select('-__v')
    .populate('friends')
    .populate('thoughts')
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: 'User does not exist.' });
      }
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  User.create(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: req.body,
    },
    {
      runValidators: true,
      new: true,
    }
  )
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: 'User does not exist.' });
      }
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  User.findOneAndDelete({ _id: req.params.userId })
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: 'User does not exist.' });
      }
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/:userId/friends/:friendId', (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $addToSet: { friends: req.params.friendId } },
    { new: true }
  )
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: 'User does not exist.' });
      }
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:userId/friends/:friendId', (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $pull: { friends: req.params.friendId } },
    { new: true }
  )
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: 'User does not exist.' });
      }
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
