const router = require('express').Router();
const { User, Thought } = require('../../models/');

router.get('/', (req, res) => {});

router.get('/:id', (req, res) => {});

router.post('/', (req, res) => {});

router.put('/:id', (req, res) => {});

router.delete('/:id', (req, res) => {});

router.post('/:thoughtId/reactions', (req, res) => {});

router.delete('/:thoughtId/reactions', (req, res) => {});
