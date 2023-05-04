import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js'

chai.use(chaiHttp)

describe.skip('User register and login test', () => {
    it('should register & login a user', ()=> {

        //register a new user
        let user = {
            name: "Patrick",
            email: "patrick@pendergast.com",
            password: "123456"
        }
        chai.request(app)
        .post('/api/v1/auth/register')
        .send(user)
        .end((err, res) => {
            //Asserts
            expect(res.status).to.be.equal(201);
            expect(res.body).to.be.a('object');
           

            chai.request(app)
            .post('/api/v1/auth/login')
            .send({
                email: "patrick@pendergast.com",
                password: "123456"
            })
            .end((err, res) => {
                //Asserts
                expect(res.status).to.be.equal(200);
                expect(res.body).to.be.a('object');
         
            })

        })


    })
})