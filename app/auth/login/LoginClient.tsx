"use client";
import React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Form, Formik } from "formik";
import { loginValidationSchema } from "@/helpers/validations";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ApiClient from "@/lib/API";

function LoginClient({ className, ...props }: React.ComponentProps<"div">) {
  //
  const router = useRouter();
  const handleLogin = async (values: any) => {
    console.log("Login values:", values);
    const response: any = await ApiClient.post("login", {
      email: values.email,
      password: values.password,
    })
      .then(function (response) {
        toast.success("Logged in Successfully");
        router.push("/dashboard");
      })
      .catch(function (error) {
        console.log(error?.response?.data?.error);
        toast.error(error?.response?.data?.error);
      });
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0">
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginValidationSchema}
            onSubmit={(values: any) => handleLogin(values)}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isValid,
              isSubmitting,
              /* and other goodies */
            }) => (
              <Form className="p-6 md:p-8">
                <FieldGroup>
                  <div className="flex flex-col items-center gap-2 text-center">
                    <span className="text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      Celes Electronic Store
                    </span>
                    <p className="text-muted-foreground text-balance mb-4">
                      Login to your Celes account
                    </p>
                  </div>
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <div>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        name="email"
                        className="bg-white"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                      />
                      <p className="text-red-500 text-xs">
                        {errors.email && touched.email && String(errors.email)}
                      </p>
                    </div>
                  </Field>
                  <Field>
                    <div className="flex items-center">
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <a
                        href="#"
                        className="ml-auto text-sm underline-offset-2 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <div>
                      <Input
                        name="password"
                        className="bg-white"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        placeholder="Password"
                        id="password"
                        type="password"
                      />

                      <p className="text-red-500 text-xs">
                        {errors.password &&
                          touched.password &&
                          String(errors.password)}
                      </p>
                    </div>
                  </Field>
                  <Field>
                    <button
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all"
                      type="submit"
                      disabled={isSubmitting ? true : false}
                    >
                      {isSubmitting ? "Loading..." : "Log In"}
                    </button>
                  </Field>

                  <FieldDescription className="text-center">
                    Don&apos;t have an account?{" "}
                    <Link href="/auth/register">Register</Link>
                  </FieldDescription>
                </FieldGroup>
              </Form>
            )}
          </Formik>
         
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}

export default LoginClient;
