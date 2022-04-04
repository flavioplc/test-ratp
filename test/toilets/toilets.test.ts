import app from '../../app';
import supertest from 'supertest';
import { expect } from 'chai';

describe('toilets endpoints', function () {
    let request: supertest.SuperAgentTest;
    before(function () {
        request = supertest.agent(app);
    });

    it('should allow a get /toilets by metro line', async function () {
        const res = await request.get('/toilets?line=14').send();
    
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('array');

        const [toilet] = res.body;

        expect(toilet).to.be.an('object');
    });
    it('should allow a throw error /toilets with no specified metroline', async function () {
        const res = await request.get('/toilets').send();
    
        expect(res.status).to.equal(400);
    });

});