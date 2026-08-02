import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("fable");

export const auth = betterAuth({
    baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
    database: mongodbAdapter(db, {
        client,
    }),

    emailAndPassword: {
        enabled: true,
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
                defaultValue: "reader",
                input: true,
            },
        },
    },

    plugins: [
        jwt({
            jwt: {
                definePayload: ({ user }) => {
                    return {
                        id: user.id,
                        email: user.email,
                        role: user.role,
                    };
                },
            },
        }),
    ],
});
