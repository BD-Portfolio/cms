import { PrismaClient } from "@prisma/client";

export class DBConnection {

    private static prisma: PrismaClient;

    static connectDB() {
        try {
            DBConnection.prisma = new PrismaClient({
                datasources: {
                    db: {
                        url: process.env.DATABASE_URL
                    }
                },
            });
            console.log("Connected to MYSQL...");
        } catch (error) {
            console.log(`Connection with MYSQL failed : ${error}`);
        }
    }

    public static getDbConnection() {
        if (!DBConnection.prisma) {
            DBConnection.connectDB();
        }
        return DBConnection.prisma;
    }
}
