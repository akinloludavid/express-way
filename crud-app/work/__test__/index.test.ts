import app from "../src/index";
import request from "supertest";
interface data {
 organization: string;
 createdAt?: "2020-08-12T19:04:55.455Z";
 updatedAt?: "2020-08-12T19:04:55.455Z";
 products?: string[];
 marketValue?: string;
 address?: string;
 ceo: string;
 country: string;
 id: number;
 noOfEmployees?: number;
 employees?: string[];
}

let x: data = {
  organization:'luco',
  ceo:'zen',
  country:'NIger',
  id:2,
};

describe("Express crud api testing", () => {

 describe("Testing all GET requests", () => {
  test("Testing for get all organizations at /api/organizations", async () => {
   const res = await request(app).get("/api/organizations");
   expect(res.status).toBe(200);
   expect(Array.isArray(res.body)).toBe(true);
   expect(res.body).toEqual([
    {
     organization: "node ninja",
     createdAt: "2020-08-12T19:04:55.455Z",
     updatedAt: "2020-08-12T19:04:55.455Z",
     products: ["developers", "pizza"],
     marketValue: "90%",
     address: "sangotedo",
     ceo: "cn",
     country: "Taiwan",
     id: 1,
     noOfEmployees: 2,
     employees: ["james bond", "jackie chan"],
    },
   ]);
  });
 });

 describe("get one request at /api/organizatios/:id", () => {

  test("should return 404 response for an invalid id", async () => {
   const res = await request(app).get("/api/organizations/invalid-id");
   expect(res.status).toBe(404);
  });

  test("Testing for get one organizations at /api/organizations", async () => {
   const { body, status } = await request(app).get("/api/organizations");
   expect(status).toBe(200);
   let firstOrg = body[0];
   const res = await request(app).get(`/api/organizations/${firstOrg.id}`);
   expect(res.status).toBe(200);
   let org = res.body;
   expect(firstOrg).toStrictEqual(org);
  });
 });

 describe("Testing for post request at /api/organizations", () => {
  test("Testing for post requests", async () => {
   let newPost = {
    organization: "UAC",
    ceo: "Akin",
    country: "Nigeria",
   };
   const res = await request(app).post("/api/organizations").send(newPost);
   expect(res.status).toBe(200);
  });
 });

 describe("Testing for put request at /api/organizations/:id", () => {
  test("Testing for put requests at a particular id", async () => {
   let newOrg = {
    organization: "SoftWork",
    ceo: "Akin",
    country: "Nigeria",
   };
 

   const res = await request(app).put(`/api/organizations/1`).send(newOrg);
   expect(res.status).toBe(200);
   expect(res.body).toStrictEqual({
    organization: "SoftWork",
    createdAt: "2020-08-12T19:04:55.455Z",
    updatedAt: "2020-08-12T19:04:55.455Z",
    products: ["developers", "pizza"],
    marketValue: "90%",
    address: "sangotedo",
    ceo: "Akin",
    country: "Nigeria",
    id: 1,
    noOfEmployees: 2,
    employees: ["james bond", "jackie chan"],
   });
  });
 });

 describe("Testing for delete request", () => {
  test("Testing for delete request at id=1", async () => {
   const res = await request(app).delete("/api/organizations/1");

   expect(res.body).toEqual({
    newLength: 0,
    removed: "id1",
   });
  });
 });
});
