const app = require('../src/index');
const request = require('supertest');

describe('POST /login' , ()=> {
    
    test('should return a 200 status code', async ()=>{
        const response = await request(app).post('/login')
                    .send({
                        "user_name":"Omar",
                        "pass":"omarpass"
                    })
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json');

        console.log(response.body);
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
    })
})