import request from "supertest";
import app from "../../../../src/api/app";

describe("Genially Controller", () => {
    describe("POST /genially", () => {
        it("should return 201", async () => {
            const res = await request(app)
                .post("/genially")
                .send({ id: "an_id", name: "a_name", description: "a_description" });

            expect(res.status).toEqual(201);
        })
    })

    describe("PUT /genially", () => {
        it("should return 200", async () => {
            await request(app)
                .post("/genially")
                .send({ id: "an_id", name: "a_name", description: "a_description" });

            const resRename = await request(app)
                .put("/genially/an_id/rename")
                .send({ name: "a_better_name" });

            expect(resRename.status).toEqual(200);
        })
    })

    describe("DELETE /genially", () => {
        it("should return 204", async () => {
            await request(app)
                .post("/genially")
                .send({ id: "an_id", name: "a_name", description: "a_description" });

            const res = await request(app)
                .delete("/genially/an_id")
                .send();

            expect(res.status).toEqual(204);
        })
    })
});