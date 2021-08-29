const router = require('express').Router();
const { User, Thought } = require('../../models/');

router.get('/', (req, res) => {});

router.get('/:id', (req, res) => {});

router.post('/', (req, res) => {});

router.put('/:id', (req, res) => {});

router.delete('/:id', (req, res) => {});

router.post('/:userId/friends/:friendId', (req, res) => {});

router.delete('/:userId/friends/:friendId', (req, res) => {});
