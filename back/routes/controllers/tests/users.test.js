const request = require("supertest");
const ap = "http://localhost:9090"; 
const { calculateCongesPayes } = require("../users");

describe("users crud", () => {
    it("POST create a user", async () => {
        await request(ap)
            .post("/users/create")
            .send({
                "userName": "salarie110",
                "password": "123",
                "firstName": "Lily",
                "lastName": "Doe",
                "email": "lily@gmail.com",
                "role": "3",
                "firstWorkingDay": "2022-01-20"
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        password: "123"
                    })
                );
            });
    }); 


    it("GET list of users", async () => {
        await request(ap)
            .get("/users/")
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            userName: expect.any(String)                           
                        })
                    ])
                );
            });
    });


    it("GET user by id", async () => {
        await request(ap)
            .get("/users/getById/" + 1)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        password: expect.any(String)
                    })
                );
            });
    });

    it("GET user by id which do not exist", async () => {
        await request(ap)
            .get("/users/getById/" + 1800)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual("user does not exist");
            });
    });

    it("GET user by userName", async () => {
        await request(ap)
            .get("/users/getByUserName")
            .send({"userName": "salarie110"})
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        userName: "salarie110"
                    })
                );
            });
    });

    it("DELETE user by id", async () => {
        await request(ap)
            .delete("/users/deleteById/" + 38)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.any(String)
                );
            });
    });

    it("Update user", async () => {
        await request(ap)
            .put("/users/update")
            .send({
                "id": 1,
                "userName": "salarie110",
                "password": "123",
                "firstName": "Lily",
                "lastName": "Doee",
                "email": "lily@gmail.com",
                "role": 3,
                "firstWorkingDay": "2022-01-20T00:00:00.000Z"
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        lastName: "Doee"
                    })
                );
            });
    });

    it("UPDATE user holiday", async () => {
        await request(ap)
            .put("/users/updateHoliday/" + 1)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        holidaysTaken: expect.any(Number)
                    })
                );
            });
    });



});