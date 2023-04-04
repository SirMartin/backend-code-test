import { MongoClient, Db } from "mongodb";

export default class MongoDbClient {
    private static connection: MongoClient;

    private async getConnection(): Promise<MongoClient> {
        if (MongoDbClient.connection == undefined) {
            MongoDbClient.connection = await MongoClient.connect(this.getConnectionUrl());
        }
        return MongoDbClient.connection;
    }

    public async getDb(): Promise<Db> {
        return await (await this.getConnection()).db(process.env.MONGODB_DATABASE);
    }

    private getConnectionUrl(): string {
        const host = process.env.MONGODB_HOST;
        const port = process.env.MONGODB_PORT;
        const username = process.env.MONGODB_USERNAME;
        const password = process.env.MONGODB_PASSWORD;

        return `mongodb://${username}:${password}@${host}:${port}`;
    }
}