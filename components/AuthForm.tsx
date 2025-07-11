"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {Form} from "@/components/ui/form"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import FormField from "./FormField"
import { useRouter } from "next/navigation"



const authFormSchema = (type : FormType) =>{
  return z.object({
    name : type === 'sign-up' ? z.string().min(3) : z.string().optional(),
    email : z.string().email(),
    password : z.string().min(3),
  })
}

const AuthForm = ({type}:{type : FormType}) => {

  const router = useRouter();
  const formSchema = authFormSchema(type);
   const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if(type === 'sign-up'){
        toast.success("Account created succesfully . Please Log in");
        router.push('/sign-in')
        console.log('SIGN UP ',values);
        
      }
      else{
        toast.success("Signed In succesfully.");
        router.push('/')
        console.log('SIGN IN ',values);

      }
    } catch (error) {
      console.log(error)
      toast.error(`There was an error ${error}`)
    }
  }

  const isSignIn = type === "sign-in";
  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="Logo" width={32} height={38} />
          <h2 className="text-primary-100">PrepWise</h2>
        </div>
        <h3>Practise Job Interview with AI</h3>
     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
        {!isSignIn && (
          <FormField control={form.control} name="name" label="Name" placeholder="Your Name" />
        )}
          <FormField control={form.control} name="email" label="Email" placeholder="Your Email Address" type="email" />
          <FormField control={form.control} name="password" label="Password" placeholder="Your Password" type="password" />
        <Button className="btn" type="submit">{isSignIn ? "Sign In" : "Create an Account"}</Button>
      </form>
    </Form>
    <p className="text-center">
      {isSignIn ? "Don't have an account?" : "Already have an account?"}
      <Link href={isSignIn ? "/sign-up" : "/sign-in"} className=" font-bold text-user-primary ml-1">
      {isSignIn ? "Sign Up" : " Sign In"}
      </Link>
    </p>
    </div>
    </div>
  )
}

export default AuthForm
