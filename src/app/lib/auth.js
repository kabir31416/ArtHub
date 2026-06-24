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
        minPasswordLength: 6,
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

            image: {
                type: "string",
                required: false,
            },

            subscriptionTier: {
                type: "string",
                required: false,
                defaultValue: "free",
            },

            maxPurchases: {
                type: "number",
                required: false,
                defaultValue: 3,
            },

            purchasedCount: {
                type: "number",
                required: false,
                defaultValue: 0,
            },

            subscriptionStatus: {
                type: "string",
                required: false,
                defaultValue: "active",
            },
        },
    },

    //session config
    session: {
        expiresIn: 60 * 60 * 24 * 7,
    },

    trustedOrigins: [
        process.env.BETTER_AUTH_URL,
    ],
});