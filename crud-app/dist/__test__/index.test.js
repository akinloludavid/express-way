"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../index"));
const supertest_1 = __importDefault(require("supertest"));
describe("Express crud api testing", () => {
    describe("Testing all GET requests", () => {
        test("Testing for get all organizations at /api/organizations", async () => {
            const res = await supertest_1.default(index_1.default).get("/api/organizations");
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
        test("Testing for get one organizations at /api/organizations", async () => {
            const { body, status } = await supertest_1.default(index_1.default).get("/api/organizations");
            expect(status).toBe(200);
            let firstOrg = body[0];
            const res = await supertest_1.default(index_1.default).get(`/api/organizations/${firstOrg.id}`);
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
            const res = await supertest_1.default(index_1.default).post("/api/organizations").send(newPost);
            expect(res.status).toBe(200);
            const { body } = await supertest_1.default(index_1.default).get("/api/organizations");
            let idx = body.indexOf(newPost);
            expect(idx).not.toBe(-1);
        });
    });
    describe("Testing for put request at /api/organizations/:id", () => {
        test("Testing for put requests at a particular id", async () => {
            let newOrg = {
                organization: "SoftWork",
                ceo: "Akin",
                country: "Nigeria",
            };
            const { body } = supertest_1.default(index_1.default).get(`/api/organizations/`);
            let firstOrg = body[0];
            const res = await supertest_1.default(index_1.default)
                .put(`/api/organizations/${firstOrg.id}`)
                .send(newOrg);
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
            const res = await supertest_1.default(index_1.default).delete("/api/organizations/1");
            expect(res.body).toEqual({
                newLength: 0,
                removed: "id1",
            });
        });
    });
});
//# sourceMappingURL=index.test.js.map