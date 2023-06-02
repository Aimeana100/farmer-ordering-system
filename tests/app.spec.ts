import request from 'supertest';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../dist/index';

// chai.use(chaiHttp);

import User from '../dist/models/User';

describe('Auth API Tests', () => {
  before(async function (done: any): Promise<void> {
    await User.deleteMany({}, done());
  });

  let token: string;

  describe('POST /api/auth/register', function () {
    // this.timeout(800000);
    it('should return 201 and create a new user', async () => {
      const response = await request(app).post('/api/auth/register').send({
        names: 'Anathole K',
        username: 'Anathole',
        password: '12345678',
        telphone: '123456789',
        email: 'anathole@test.com',
        role: 'store-keeper',
      });

      console.log(response.body);

      expect(response.status).to.eql(201);
      expect(response.body).to.have.property('status', 'Ok');
      expect(response.body.data).to.have.property('user');
      expect(response.body.data).to.have.property('token');

      // Store the token for future use
      token = response.body.data.token;
    });

    it('should return 400 if required fields are missing', async () => {
      const response = await request(app).post('/api/auth/register').send({
        names: 'John Doe',
        // Missing other required fields
      });

      expect(response.status).to.eql(400);
      expect(response.body).to.have.property('status', 'error');
      expect(response.body).to.have.property('message', 'names, username, password,telphone are requiled');
    });

    // Add more test cases as needed
  });

  describe('POST /api/auth/login', () => {
    it('should return 200 and generate a JWT token', async () => {
      const response = await request(app).post('/api/auth/login').send({
        username: 'Anathole',
        password: '12345678',
      });

      expect(response.status).to.eql(200);
      expect(response.body).to.have.property('status', 'success');
      expect(response.body.data).to.have.property('user');
      expect(response.body.data).to.have.property('token');
    });

    it('should return 401 if user is not registered', async () => {
      const response = await request(app).post('/api/auth/login').send({
        username: 'unknownuser',
        password: 'password',
      });

      expect(response.status).to.eql(401);
      expect(response.body).to.have.property('status', 'error');
      expect(response.body).to.have.property('message', 'user not registered');
    });

    it('should return 401 if invalid password is provided', async () => {
      const response = await request(app).post('/api/auth/login').send({
        username: 'johndoe',
        password: 'wrongpassword',
      });

      expect(response.status).to.eql(401);
      expect(response.body).to.have.property('status', 'error');
      expect(response.body).to.have.property('message', 'Invalid password');
    });
  });
  // Clean up after all tests
  after(async () => {
    // Delete the user created during testing or perform any necessary cleanup
  });
});
