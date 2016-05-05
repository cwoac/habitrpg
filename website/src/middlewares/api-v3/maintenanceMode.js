import nconf from 'nconf';

const MAINTENANCE_MODE = nconf.get('MAINTENANCE_MODE');

module.exports = function maintenanceMode (req, res, next) {
  if (!MAINTENANCE_MODE) return next();

  res.format({
    html: function maintenancePage () {
      res.render('../../../views/static/maintenance');
    },
    json: function apiUnavailable () {
      res.status(503).send('Server offline for maintenance.');
    },
  });
}

