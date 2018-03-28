const chai = require('chai');
const supertest = require('supertest');

const app = require('../index.js');
const server = require('http').createServer(app)

const expect = chai.expect;

const request = supertest.agent(server)

describe('Abydos Intergration', async () => {

  before(async () => {
    console.log('start server')
    await server.listen(4000)
  })

  after((done) => {
    console.log('close server')
    server.close()
    done()
  })

  it('should 200 ok on index', (done) => {
    request.get('/')
      .then(res => {
        expect(res.statusCode).to.equal(200);
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('return a list of bicing terminals in order of distance', (done) => {
    const long = 41.3756260
    const lat = 2.1579800
    const query = '/search?lat=' + lat + '&long=' + long
    request.post(query)
      .then(res => {
        expect(res.statusCode).to.equal(200);
        done()
      })
      .catch(err => {
        done(err)
      })
  })
});