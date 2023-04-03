import request from "supertest";
import app from "../../../../src/api/app";

describe("Health Controller", () => {
    describe("GET /", () => {
        it("should return 200", async () => {
            const res = await request(app)
            .get("/")
            .send();

            expect(res.status).toEqual(200);
        })
    })
});