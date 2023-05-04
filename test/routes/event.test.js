import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server.js'
import mongoose from 'mongoose';

import Event from '../../models/Event.js';

chai.use(chaiHttp)

const createEvent = '/api/v1/events';
const login = '/api/v1/auth/login';
const register = '/api/v1/auth/register';

let newEvent = {
    eventTitle: "Test Title",
    eventLocation: {
        eventAddress1: "Green Hall",
        eventAddress2: "2 York Road",
        eventCity: "Belfast",
        eventCounty: "Antrim",
        eventPostalCode: "BT15 8FS",
    },
    capacity: 60,
    eventType: "Family Theatre Show",
    targetAudience: "All Ages",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    date: "2023-10-30",
    startTime: "12:00",
    endTime: "13:00",
    admissionPrice: 12,
    theme: "Tech & Innovation",
    status: "approved",
}

let updatedEvent = {
    eventTitle: "Updated Title",
    eventLocation: {
        eventAddress1: "Green Hall",
        eventAddress2: "2 York Road",
        eventCity: "Belfast",
        eventCounty: "Antrim",
        eventPostalCode: "BT15 8FS",
    },
    capacity: 200,
    eventType: "Family Theatre Show",
    targetAudience: "All Ages",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    date: "2023-10-30",
    startTime: "12:00",
    endTime: "13:00",
    admissionPrice: 12,
    theme: "Tech & Innovation",
    status: "pending",
}
let preSaveUser = {
    name: "Sarah",
    email: "jones@scienceevents.com",
    password: "123456"
}
let token;
before(async () =>{
    const result = await chai
    .request(app)
    .post(register)
    .send(preSaveUser)
    expect(result.status).to.equal(201);
    const cookie = result.header['set-cookie'];
    token = cookie.map((cookie) => cookie.split(';')[0].split('=')[1]).join(';')
       
    });

after('drop test db', async () =>{
    await 
    Event.remove({});
 })


describe('POST - Submit a new event', () => {

    let token;
    before(async () => {
        const result = await chai
            .request(app)
            .post(login)
            .send(preSaveUser)
        const cookie = result.header['set-cookie'];
        token = cookie.map((cookie) => cookie.split(';')[0].split('=')[1]).join(';')
    });

    describe('should submit an event', () => {
        it('should reuturn 201 status', async () => {
            try {
                const result = await chai
                    .request(app)
                    .post(createEvent)
                    .set('Cookie', `token=${token}`)
                    .send(newEvent)
                expect(result.status).to.equal(201);
            } catch (error) {
                throw new Error(error)
            }
        })
    })

})

describe('GET - Get all events', () => {

    before(async () => {
        const result = await chai
            .request(app)
            .post(login)
            .send(preSaveUser)
        const cookie = result.header['set-cookie'];
        token = cookie.map((cookie) => cookie.split(';')[0].split('=')[1]).join(';')
    });

    describe('should return all events', () => {
        it('should reuturn 200 status', async () => {
            try {
                const result = await chai
                    .request(app)
                    .get('/api/v1/events')
                    .set('Cookie', `token=${token}`)
                expect(result.status).to.equal(200);
                expect(result.body).to.have.property('events');
                expect(result.body).to.have.property('totalEvents');
                expect(result.body).to.have.property('numOfPages');
            } catch (error) {
                throw new Error(error)
            }
        })
    })

    describe('should return all events with a specific eventType', () => {
        it('should reuturn 200 status', async () => {
            try {
                const result = await chai
                    .request(app)
                    .get('/api/v1/events?eventType=Family%20Theatre%20Show')
                    .set('Cookie', `token=${token}`)
                expect(result.status).to.equal(200);
                expect(result.body).to.have.property('events');
                expect(result.body).to.have.property('totalEvents');
                expect(result.body).to.have.property('numOfPages');
                const events = result.body.events;
                for (let event of events) {
                    expect(event).to.have.property('eventType', 'Family Theatre Show');
                }
            } catch (error) {
                throw new Error(error)
            }
        })
    })
})

describe('PATCH - Update an event', () => {
    let eventId;

    before(async () => {
        const result = await chai
            .request(app)
            .post(createEvent)
            .set('Cookie', `token=${token}`)
            .send(newEvent);
        eventId = result.body.event._id;
    });

    it('should update an existing event', async () => {
        try {
            console.log(eventId)
            const result = await chai
                .request(app)
                .patch(`/api/v1/events/${eventId}`)
                .set('Cookie', `token=${token}`)
                .send(updatedEvent);
            expect(result.status).to.equal(200);
            expect(result.body).to.have.property('updatedEvent');
            expect(result.body.updatedEvent).to.have.property('eventTitle', 'Updated Title');
            expect(result.body.updatedEvent).to.have.property('capacity', 200);
            expect(result.body.updatedEvent).to.have.property('status', 'pending');
        } catch (error) {
            console.log(error)
            throw new Error(error);
            
        }
    });


    it('should return a 400 error if any required fields are missing', async () => {
        try {
            const result = await chai
                .request(app)
                .patch(`/api/v1/events/${eventId}`)
                .set('Cookie', `token=${token}`)
                .send({
                    eventTitle: '',
                    capacity: 50,
                    eventType: 'Updated Type',
                    description: '',
                    date: '2023-11-01',
                    startTime: '13:00',
                    admissionPrice: 10,
                    theme: 'Updated Theme'
                });
                expect(result.status).to.equal(400);
        } catch (error) {
            
            expect(error.response.text).to.equal('{"error": "Please provide all values"}');
        }
    });

})

