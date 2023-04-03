import request from "supertest";
import app from "../../../../src/api/app";

describe("Genially Controller", () => {
    describe("POST /genially", () => {
        it("should return 201", async () => {
            const res = await request(app)
                .post("/genially")
                .send({ id: "d25bc90b-8b2b-4e18-b6aa-929330b5f6a7", name: "a_name", description: "a_description" });

            expect(res.status).toEqual(201);
        });
    });

    describe("PUT /genially", () => {
        it("should return 200", async () => {
            await request(app)
                .post("/genially")
                .send({ id: "d25bc90b-8b2b-4e18-b6aa-929330b5f6a7", name: "a_name", description: "a_description" });

            const resRename = await request(app)
                .put("/genially/d25bc90b-8b2b-4e18-b6aa-929330b5f6a7/rename")
                .send({ name: "a_better_name" });

            expect(resRename.status).toEqual(200);
        });
    });

    describe("DELETE /genially", () => {
        it("should return 204", async () => {
            await request(app)
                .post("/genially")
                .send({ id: "d25bc90b-8b2b-4e18-b6aa-929330b5f6a7", name: "a_name", description: "a_description" });

            const res = await request(app)
                .delete("/genially/d25bc90b-8b2b-4e18-b6aa-929330b5f6a7")
                .send();

            expect(res.status).toEqual(204);
        });
    });
});