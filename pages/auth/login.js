import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import * as Yup from 'yup';

import { useRouter } from "next/router";

export default function login(){

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                    .max(30, "Must be 30 characters or less")
                    .email("Invalid email address")
                    .required("Please enter your email"),
            password: Yup.string()
                        .required("Please enter your password")
        }),
        onSubmit: async (value) => {
            console.log("Value form", value)
            // console.log('signin method', await signIn('credential',{}))

            const credentials = await signIn(
                "credentials",
                {
                    email: value?.email,
                    password: value?.password,
                    redirect: false
                }
            )

            /*if(credentials.ok){
                router.push('/')
            }*/

            console.log("credentials", credentials)
            console.log(value,'value')            
        }
    })

    console.log('formik', formik)
    return (
        <div className={"w-full h-screen bg-gray-600 flex items-center justify-center"}>
            <div className={"w-[400px] min-h-[400px] p-4 bg-white rounded-xl"}>
                <form 
                    onSubmit={formik.handleSubmit}
                    className={'flex flex-col space-y-6'}>
                    <label htmlFor="email"
                           className={"w-full my-4 flex flex-col space-y-4"} >
                        <span>Email</span>
                        <input
                            type="email"
                            name={"email"}
                            value={formik.values?.email}
                            onChange={formik.handleChange}
                            placeholder="Input email" />
                        {
                            formik.errors &&
                            formik.touched &&
                            formik.errors?.email &&
                            formik.touched?.email && (
                                <span className={'!text-red-500 !text-sx'}>{formik.errors?.email}</span>
                            )
                        }

                    </label>

                    <label htmlFor="password"
                           className={"w-full my-4 flex flex-col space-y-4"} >
                        <span>Password</span>
                        <input
                            type="password"
                            name={"password"}
                            value={formik.values?.password}
                            onChange={formik.handleChange}
                            placeholder="Input password" />
                        {
                            formik.errors &&
                            formik.touched &&
                            formik.errors?.password &&
                            formik.touched?.password  && (
                                <span className={'!text-red-500 !text-sx'}>{formik.errors?.password}</span>
                            )
                        }
                    </label>


                        <button
                        type="button"
                            onClick={formik.handleSubmit}
                            className={'w-full rounded-xl !bg-blue-500 text-white'}>
                            Submit
                        </button>
                    
                </form>
            </div>

        </div>
    )
}