import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import moment from "moment/moment";
import { generateToken } from "@/src/lib/generateToken";

export default NextAuth({
    providers: [
        CredentialsProvider(
        {
            id: 'credentials',
            name: 'my-projects',
            credentials: {
                email: {
                    label: "Email",
                    type: "email"
                },
                password: {
                    label: 'Password',
                    type: "password"
                }
            }, 
            async authorize(credentials, req){
                console.log('credentials', credentials)
                console.log('request authorize', req)
                let data = {
                    error: false,
                    data: {
                        // id: 1,
                        // email: "example@example.com",
                        // avatars: 'http://domain.com/url-images'
                        ...credentials
                    }
                }

                const token = await generateToken(data?.data, "1d");

                Reflect.set(data, 'token', token)

                return {
                    // error: false,
                    ...data
                }
            },
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        maxAge: 30,
        strategy: 'jwt',
    },
    jwt: {
        maxAge: 30,
        secret: process.env.NEXTAUTH_SECRET
    },
    pages: {
        signin: '/auth/login'
    },
    callbacks: {
        async redirect(url, baseUrl){
            console.log('baseUrl', baseUrl)
            return baseUrl
        },
        async signIn({account, profile, user, credentials}){
            console.log('account', account)
            console.log('user', user)
            switch (account?.provider) {
                case 'credentials':
                    return user?.error === false;
                default:
                    return false;
            }
        },
        async jwt({
            token,
            user,
            profile,
            account
        })
        {
            user && (
                token.user = {
                    ...user,
                    bearer_token: token?.user?.token ?? null,
                    id: token?.user?.id ?? null,
                    email: token?.user?.email ?? null,
                }
            )
            return {...token,}

        },
        async session({
            session,
            token,
            user,
            profile
        }){
            if(Date.next() > moment(session?.expires)) {
                return null};
            
            // Reflect.set(session,)
            session.user = token?.user;
            session.profile = token?.profile ?? null;
            session.account = token?.account ?? null;
            session.data = token ?? null;

            return session;
        }
    },
    debug: false
})