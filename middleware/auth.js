function requireAdmin(req, res, next) {
  if (req.session && req.session.adminAuthenticated === true) {
    return next();
  }
  return res.status(401).json({ error: 'Unauthorized' });
}

function requireDelivery(req, res, next) {
  if (req.session && req.session.deliveryPersonId) {
    return next();
  }
  return res.status(401).json({ error: 'Unauthorized' });
}

module.exports = { requireAdmin, requireDelivery };
