function validateMessage(req, res, next) {
  const { device_guid, path } = req.body;

  if (!device_guid || typeof device_guid !== 'string' || device_guid.length !== 32) {
    return res.status(400).json({ error: 'Invalid device_guid format' });
  }

  const allowedPaths = ['ethernet', 'wifi', 'gsm'];
  if (!allowedPaths.includes(path)) {
    return res.status(400).json({ error: 'Invalid path' });
  }

  next();
}

module.exports = {
  validateMessage,
};
