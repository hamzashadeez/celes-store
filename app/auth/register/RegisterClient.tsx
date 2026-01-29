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
import {
  loginValidationSchema,
  registerValidationSchema,
} from "@/helpers/validations";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ApiClient from "@/lib/API";

function RegisterClient({ className, ...props }: React.ComponentProps<"div">) {
  //
  const router = useRouter();

  const handleRegister = async (values: any) => {
    const response: any = await ApiClient.post("register", {
      email: values.email,
      password: values.password,
      phone: values.phone,
      name: values.name,
    })
      .then(function (response) {
        toast.success("Successfully");
        router.push("/");
      })
      .catch(function (error) {
        console.log(error);
        toast.error(error?.response?.data?.error);
      });
  };
  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 ">
          <Formik
            initialValues={{ email: "", password: "", phone: "", name: "" }}
            validationSchema={registerValidationSchema}
            onSubmit={(values: any) => handleRegister(values)}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              isValid,
              /* and other goodies */
            }) => (
              <Form className="p-6">
                <FieldGroup>
                  <div className="flex flex-col items-center gap-2 text-center">
                    <span className="text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      Celes Electronic Store
                    </span>
                    <p className="text-muted-foreground text-balance mb-0">
                      Register a new Celes account
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
                    <FieldLabel htmlFor="name">Full Name</FieldLabel>
                    <div>
                      <Input
                        id="name"
                        type="name"
                        placeholder="Usama Muhd..."
                        name="name"
                        className="bg-white"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                      />
                      <p className="text-red-500 text-xs">
                        {errors.name && touched.name && String(errors.name)}
                      </p>
                    </div>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                    <div>
                      <Input
                        id="phone"
                        type="phone"
                        placeholder="07012345678"
                        name="phone"
                        className="bg-white"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.phone}
                      />
                      <p className="text-red-500 text-xs">
                        {errors.phone && touched.phone && String(errors.phone)}
                      </p>
                    </div>
                  </Field>

                  <Field>
                    <div className="flex items-center">
                      <FieldLabel htmlFor="password">Password</FieldLabel>
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
                      {isSubmitting ? "Loading..." : "Register"}
                    </button>
                  </Field>

                  <FieldDescription className="text-center">
                    Do you have an account?{" "}
                    <Link href="/auth/login">Login</Link>
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

export default RegisterClient;
