import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server.js'
import User from '../../models/User.js';

chai.use(chaiHttp)

let token;

const register = '/api/v1/auth/register';
const login = '/api/v1/auth/login';
const getUser = '/api/v1/auth/getCurrentUser';
const updateUser = '/api/v1/auth/updateUser';
const loggedIn = '/'


let user = {
    name: "Pryce",
    email: "nuggin@gmail.com",
    password: "123456"
}

let missingDataUser = {
    name: "",
    email: "lily@ross.com",
    password: "123456"
}

let badEmailLogin = {
    email: "notauser@gmail.com",
    password: "123456"
}

let preSaveUser = {
    name: "Patrick",
    email: "patrick@pendergast.com",
    password: "123456"
}

let wrongPassword = {
    name: "Patrick",
    email: "patrick@pendergast.com",
    password: "badPass"
}

let updatedUser = {
    name: "Valerie",
    lastName: "Pearce",
    email: "valerie@gmail.com",
    county: "Down"
}


before(async () => {
    const result = await chai
        .request(app)
        .post(register)
        .send(preSaveUser)
    expect(result.status).to.equal(201);
    const cookie = result.header['set-cookie'];
    token = cookie.map((cookie) => cookie.split(';')[0].split('=')[1]).join(';')

});

after('drop test db', async () => {
    await
        User.remove({});
})

describe('POST - Register user', () => {
    it('Should create a new user if email does not already exist', async () => {
        try {
            const result = await chai
                .request(app)
                .post(register)
                .send(user)
            expect(result.status).to.equal(201);
            expect(result.body).not.to.be.empty;

        } catch (error) {
            console.log(error)
        }
    });

    it('Should return 400 if a name is not submitted', async () => {
        try {
            const result = await chai
                .request(app)
                .post(register)
                .send(missingDataUser)
            expect(result.status).to.equal(400);
            expect(result.body).not.to.be.empty;
            expect(error.response.text).to.equal('{"error":"Please provide all the required details"}');
        } catch (error) {
            console.log(error);
        }
    });

    it('Should return 400 if email is in use', async () => {
        try {
            await chai
                .request(app)
                .post(register)
                .send(preSaveUser)
        } catch (error) {
            expect(error.status).to.equal(400);
            expect(error.response.text).to.equal('{"error":"Email already in use"}');
        }

    });
});


describe('POST - Login User', () => {
    it('should return a status 200', async () => {
        try {
            const result = await chai
                .request(app)
                .post(login)
                .send(preSaveUser)
            const cookie = result.header['set-cookie'];
            token = cookie.map((cookie) => cookie.split(';')[0].split('=')[1]).join(';')
            expect(result.body).not.to.be.empty;
            expect(result.status).to.equal(200);
        } catch (error) {
            throw new Error(error)
        }

    });

    it('should return a status 401 if password is incorrect', async () => {
        try {
            const result = await chai
                .request(app)
                .post(login)
                .send(wrongPassword)
            expect(result.status).to.equal(401);
        } catch (error) {

            expect(error.response.text).to.equal('{"error":"Invalid Credentials"}');
        }

    });

    it('should return a status 401 if no user with email is registered', async () => {
        try {
            const result = await chai
                .request(app)
                .post(login)
                .send(badEmailLogin)
            expect(result.status).to.equal(401);
        } catch (error) {

            expect(error.response.text).to.equal('{"error":"Invalid Credentials"}');
        }

    });
})

describe('GET - User', () => {
    let token;

    before(async () => {
        const result = await chai
            .request(app)
            .post(login)
            .send(preSaveUser)
        const cookie = result.header['set-cookie'];
        token = cookie.map((cookie) => cookie.split(';')[0].split('=')[1]).join(';')
    });


    it('should get the current user details', async () => {
        const result = await chai.request(app)
            .get(getUser)
            .set('Cookie', `token=${token}`);
        console.log(result.body.user)
        expect(result.status).to.equal(200);
        expect(result.body.user.name).to.equal('Patrick');
    });

})

describe('PATCH - Update', () => {
    let token;

    before(async () => {
        const result = await chai
            .request(app)
            .post(login)
            .send(preSaveUser)
        const cookie = result.header['set-cookie'];
        token = cookie.map((cookie) => cookie.split(';')[0].split('=')[1]).join(';')
    });
    it('should update the current user', async () => {
        const res = await chai.request(app)
            .patch(updateUser)
            .set('Cookie', `token=${token}; path=/; httpOnly`)
            .send(updatedUser);
        expect(res.status).to.equal(200);
        expect(res.body.user).to.have.property('name', 'Valerie');
        expect(res.body.user).to.have.property('lastName', 'Pearce');
        expect(res.body.user).to.have.property('email', 'valerie@gmail.com');
    });
});

describe('GET - Logout User', () => {
    it('should logout a user', async () => {
        const res = await chai.request(app)
            .get('/logout');

        expect(res).to.have.status(200);
    });
});

