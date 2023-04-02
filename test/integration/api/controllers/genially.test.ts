import request from "supertest";
import app from "../../../../src/api/app";

describe("Genially Controller", () => {
    describe("POST /genially", () => {
        it("should return 200", async () => {
            const res = await request(app).post("/genially").send({ id: "an_id", name: "a_name", description: "a_description" });

            expect(res.status).toEqual(201);
        })
    })
});