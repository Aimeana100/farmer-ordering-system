import request from 'supertest';
import { expect } from 'chai';
import app from '../dist/index';

describe('server checksum', () => {
  it('should return the server checksum', (done) => {
    request(app).get('/').expect(200, done);
  });
});
