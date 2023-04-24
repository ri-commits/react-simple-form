import React from "react";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  password: string;
  confirmPassword: string;
};

const FormZod = () => {
  //   type FormData = z.infer<typeof schema>;
  const schema: ZodType<FormData> = z
    .object({
      firstName: z.string().min(2).max(30),
      lastName: z.string().min(2).max(30),
      email: z.string().email(),
      age: z.number().min(18).max(70),
      password: z.string().min(5).max(20),
      confirmPassword: z.string().min(5).max(20),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const submitData = (data: FormData) => {
    console.log("It Worked", data);
  };

  return (
    <div className="App">
      <form className="form-zod" onSubmit={handleSubmit(submitData)}>
        <label>First Name: </label>
        <input type="text" {...register("firstName")} />
        {errors.firstName && <span>{errors.firstName.message}</span>}
        <label>Last Name: </label>
        <input type="text" {...register("lastName")} />
        <label>Email: </label>
        <input type="email" {...register("email")} />
        <label>Age: </label>
        <input type="number" {...register("age", { valueAsNumber: true })} />
        <label>Password: </label>
        <input type="password" {...register("password")} />
        <label>Confirm Password: </label>
        <input type="password" {...register("confirmPassword")} />

        <input type="submit" />
      </form>
    </div>
  );
};

export default FormZod;
