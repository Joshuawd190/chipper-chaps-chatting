const router = require('express').Router();
const { Thought } = require('../../models/');

router.get('/', (req, res) => {
  Thought.find()
    .sort({ createdAt: -1 })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Thought.findOne({ _id: req.params.id })
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: 'No such thought exists' });
      }
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  Thought.create(req.body)
    .then((data) => {
      return User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: data._id } },
        { new: true }
      );
    })
    .then((dbUserData) => {
      if (!dbUserData) {
        return res
          .status(404)
          .json({ message: 'Thought created but no one to think it!' });
      }

      res.json({ message: 'Thought thunk' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  Thought.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { runValidators: true, new: true }
  )
    .then((data) => {
      if (!data) {
        return res
          .status(404)
          .json({ message: 'Empty head, no Thought exist' });
      }
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  Thought.findOneAndRemove({ _id: req.params.id })
    .then((dbThoughtData) => {
      if (!dbThoughtData) {
        return res.status(404).json({ message: 'Empty like my brain' });
      }
      return User.findOneAndUpdate(
        { thoughts: req.params.id },
        { $pull: { thoughts: req.params.id } },
        { new: true }
      );
    })
    .then((data) => {
      if (!data) {
        return res
          .status(404)
          .json({ message: 'You cannot Think what does not exist' });
      }
      res.json({ message: 'Yeeted Thought from User' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/:thoughtId/reactions', (req, res) => {
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $addToSet: { reactions: req.body } },
    { runValidators: true, new: true }
  )
    .then((data) => {
      if (!data) {
        return res
          .status(404)
          .json({ message: '0 Thoughts here, unexpectedly.' });
      }
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:thoughtId/reactions', (req, res) => {
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $pull: { reactions: { reactionId: req.params.reactionId } } },
    { runValidators: true, new: true }
  )
    .then((data) => {
      if (!data) {
        return res
          .status(404)
          .json({ message: 'There can be no Reaction without an action' });
      }
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
