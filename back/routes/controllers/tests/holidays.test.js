
const { app } = require('../../../app');
const { supertest } = require('supertest');
const request = require("supertest")("https://airportgap.dev-tester.com/api");
const { getAllUsersHolidays, getHolidayByIdUser } = require('../holidays');

describe("use a route", () => {
    it("should return an object", async () => {
        await request.get("/holidays/getById/" + 5).then(response => {
            expect(response).toEqual(expect.objectContaining({}));
        });
        
        /*  same results as above
        const response = await request.get("/holidays/getById/" + 5);
        expect(response).toEqual(expect.objectContaining({})); 
        */
    });
});