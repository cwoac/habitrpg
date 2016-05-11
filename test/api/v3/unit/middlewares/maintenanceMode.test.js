import {
  generateRes,
  generateReq,
  generateNext,
} from '../../../../helpers/api-unit.helper';
import nconf from 'nconf';
import requireAgain from 'require-again';

describe('maintenance mode middleware', () => {
  let res, req, next;
  let pathToMaintenanceModeMiddleware = '../../../../../website/src/middlewares/api-v3/maintenanceMode';

  beforeEach(() => {
    res = generateRes();
    req = generateReq();
    next = generateNext();
  });

  it('does not return 503 error when maintenance mode is off', () => {
    sandbox.stub(nconf, 'get').withArgs('MAINTENANCE_MODE').returns(false);
    let attachMaintenanceMode = requireAgain(pathToMaintenanceModeMiddleware);

    attachMaintenanceMode(req, res, next);

    expect(next).to.have.been.called.once;
    expect(res.status).to.not.have.been.called;
  });

  it('returns 503 error when maintenance mode is on', () => {
    sandbox.stub(nconf, 'get').withArgs('MAINTENANCE_MODE').returns(true);
    let attachMaintenanceMode = requireAgain(pathToMaintenanceModeMiddleware);

    attachMaintenanceMode(req, res, next);

    expect(next).to.not.have.been.called;
    expect(res.status).to.have.been.calledWith(503);
  });
});
