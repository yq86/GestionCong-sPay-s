const request = require("supertest");
const ap = "http://localhost:9090";

// salarie1 and her tests with different scenario
describe("create a user salarie1 who worked for more than 6 months, so holidays available, demande a type 1 congés payés, validate this demande", () => {
    it("POST create a user salarie1", async () => {
        await request(ap)
            .post("/users/create")
            .send({
                "userName": "salarie1",
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
                        userName: "salarie1"
                    })
                );
            });
    }); 

    
    it("make sure salarie1's holidays available is bigger than 0", async () => {
        
        await request(ap)
            .get("/holidays/getByIdUser/" + 1)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body.holidaysAvailable).toBeGreaterThan(0);
                expect(response.body.holidaysTaken).toEqual(0);
            });
    });
    

    it("POST a demande for salarie1", async () => {
        await request(ap)
            .post("/demandes/create")
            .send({
                "UserId": 1,
                "startingDate": "2022-10-20",
                "endingDate": "2022-10-21",
                "TypeId": 1,
                "StatusId": 1
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        StatusId: 1
                    })
                );
            });
    }); 

    it("UPDATE validate demande ", async () => {
        await request(ap)
            .put("/demandes/update")
            .send({
                "id": 1,
                "StatusId": 2
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body.StatusId).toEqual(2);
            });
    }); 

    it("make sure salarie1's holidays taken is 2 days", async () => {
        
        await request(ap)
            .get("/holidays/getByIdUser/" + 1)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body.holidaysTaken).toEqual(2);
            });
    });

});  



describe("salari1, demande a type 1 congés payés, but this salarie1 does not have enough holidays as demande", () => {
    
    it("POST a demande", async () => {
        await request(ap)
            .post("/demandes/create")
            .send({
                "UserId": 1,
                "startingDate": "2022-11-20",
                "endingDate": "2022-12-21",
                "TypeId": 1,
                "StatusId": 1
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual("you dont have enough holidays");
            });
    }); 

}); 





describe("salarie1 demande a type 1 congés payés, this demande  being refused without description", () => {

    it("POST a demande", async () => {
        await request(ap)
            .post("/demandes/create")
            .send({
                "UserId": 1,
                "startingDate": "2022-11-23",
                "endingDate": "2022-11-25",
                "TypeId": 1,
                "StatusId": 1
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        id: 2
                    })
                );
            });
    }); 

    it("UPDATE demande", async () => {
        await request(ap)
            .put("/demandes/update")
            .send({
                "idUser": "1",
                "id": 2,
                "TypeId" : 1,
                "StatusId": 3
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual("please specify the reason of refuse");
            });
    });

});


describe("salarie1's demande id2 being refused with a description", () => {
    it("UPDATE demande", async () => {
        await request(ap)
            .put("/demandes/update")
            .send({
                "idUser": "1",
                "id": 2,
                "description": "to test",
                "TypeId" : 1,
                "StatusId": 3
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body.description).toEqual("to test");
            });
    });

    it("make sure salarie1's holidays taken is 2 days", async () => {
        
        await request(ap)
            .get("/holidays/getByIdUser/" + 1)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body.holidaysTaken).toEqual(2);
            });
    });

});



describe("salarie1 demande a type 3 congés payés(maternité), demande id3, being accepted", () => {
    it("POST a demande", async () => {
        await request(ap)
            .post("/demandes/create")
            .send({
                "UserId": 1,
                "startingDate": "2022-11-23",
                "endingDate": "2023-03-22",
                "TypeId": 3,
                "StatusId": 1
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        id: 3
                    })
                );
            });
    }); 

    it("UPDATE demande", async () => {
        await request(ap)
            .put("/demandes/update")
            .send({
                "idUser": "1",
                "id": 3,
                "TypeId" : 3,
                "StatusId": 2
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        StatusId: 2
                    })
                );
            });
    });

    it("make sure salarie1's holidays taken is 2 days", async () => {       
        await request(ap)
            .get("/holidays/getByIdUser/" + 1)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body.holidaysTaken).toEqual(2);
            });
    });

});



// salarie2 and her tests with different scenario
describe("create a user salarie2, who worked for less than 6 month, so no holiday available, demande a type 1 congés payés, which is not possible", () => {
    it("POST create a salarie", async () => {
        await request(ap)
            .post("/users/create")
            .send({
                "userName": "salarie2",
                "password": "123",
                "firstName": "Lily2",
                "lastName": "Doe2",
                "email": "lily2@gmail.com",
                "role": "3",
                "firstWorkingDay": "2022-08-20"
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        userName: "salarie2"
                    })
                );
            });
    }); 

    
    it("make sure salarie2's holidays available is 0", async () => {
        
        await request(ap)
            .get("/holidays/getByIdUser/" + 2)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body.holidaysAvailable).toEqual(0);
            });
    });
    

    it("POST a demande type1", async () => {
        await request(ap)
            .post("/demandes/create")
            .send({
                "UserId": 2,
                "startingDate": "2022-10-20",
                "endingDate": "2022-10-21",
                "TypeId": 1,
                "StatusId": 1
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual("you dont have enough holidays");
            });
    }); 
});  

describe("salarie2, demande a type 2 congés payés, and valide", () => {
    it("POST a demande", async () => {
        await request(ap)
            .post("/demandes/create")
            .send({
                "UserId": 2,
                "startingDate": "2022-10-20",
                "endingDate": "2022-10-21",
                "TypeId": 2,
                "StatusId": 1
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        id: 4
                    })
                );
            });
    }); 

    it("UPDATE demande", async () => {
        await request(ap)
            .put("/demandes/update")
            .send({
                "idUser": "2",
                "id": 4,
                "StatusId": 2
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        StatusId: 2
                    })
                );
            });
    });

    it("make sure salarie2's holidays taken is 0 days", async () => {       
        await request(ap)
            .get("/holidays/getByIdUser/" + 2)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body.holidaysAvailable).toEqual(0);
                expect(response.body.holidaysTaken).toEqual(0);
            });
    });

}); 


describe("salarie2, demande a type 3 congés payés, and refuse without description", () => {
    it("POST a demande", async () => {
        await request(ap)
            .post("/demandes/create")
            .send({
                "UserId": 2,
                "startingDate": "2023-01-20",
                "endingDate": "2022-02-21",
                "TypeId": 3,
                "StatusId": 1
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        id: 5
                    })
                );
            });
    });

    it("UPDATE demande", async () => {
        await request(ap)
            .put("/demandes/update")
            .send({
                "idUser": "2",
                "id": 5,
                "StatusId": 3
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual("please specify the reason of refuse");
            });
    });

})

describe("salarie2, demande id5, and refuse with a description", () => {

    it("UPDATE demande", async () => {
        await request(ap)
            .put("/demandes/update")
            .send({
                "idUser": "2",
                "id": 5,
                "description": "you are not sick",
                "StatusId": 3
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        StatusId: 3
                    })
                );
            });
    });

    it("make sure salarie2's holidays taken is 0 days", async () => {       
        await request(ap)
            .get("/holidays/getByIdUser/" + 2)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body.holidaysAvailable).toEqual(0);
                expect(response.body.holidaysTaken).toEqual(0);
            });
    });

})