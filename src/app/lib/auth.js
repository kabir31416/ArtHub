import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";


const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is missing");
}

const client = new MongoClient(uri);

await client.connect();
const db = client.db("ArtHub");

export const auth = betterAuth({
    database: mongodbAdapter(db),


    emailAndPassword: {
        enabled: true,
        minPasswordLength:6,
    },

    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
    },

    user: {
        additionalFields: {
            role: {
                type: "string",
                required: true,
                defaultValue: "user",
            },
        },
    },

    //session config
    session: {
        expiresIn: 60 * 60 * 24 * 7, 
    },

    trustedOrigins: [
        "http://localhost:3000",
    ],
});