import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { Input } from "../components/form/Input";
import { useAuth } from "../context/AuthProvider";
import { useForm } from "react-hook-form";
import { IUser } from "../models";

export const LoginPage = () => {
  const { Login, firebaseError } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>();

  const OnSubmit = (data: IUser) => {
    Login(data);
  };
  return (
    <div className="flex items-center w-screen h-screen justify-center p-5">
      <form
        onSubmit={handleSubmit(OnSubmit)}
        className="p-8 rounded-lg  flex flex-col gap-4 border-2 shadow-lg  w-[90%] sm:max-w-lg lg:w-[450px]  "
      >
        <h1 className="text-center text-3xl lg:text-4xl">Login</h1>
        {firebaseError && (
          <div role="alert" className="alert alert-error p-2">
            <span className="text-center">{firebaseError}.</span>
          </div>
        )}

        <div className="">
          <label className="form-control space-y-3 w-xs max-w-md">
            <span>Email</span>
            <Input
              classes="input-bordered focus:outline-primary focus:border-none"
              type="email"
              {...register("email", {
                required: "El correo es obligatorio",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "El formato del correo es inválido",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </label>
        </div>

        <div className="">
          <label className="form-control space-y-3 w-full max-w-md">
            <span>Password</span>
            <Input
              classes="input-bordered focus:outline-primary focus:border-none"
              type="password"
              {...register("password", {
                required: "La contraseña es obligatoria",
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener al menos 6 caracteres",
                },
              })}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </label>
        </div>

        <span>
          ¿No tienes cuenta?{" "}
          <Link to={"/register"} className="text-primary underline">
            Regístrate
          </Link>
        </span>

        <div className="">
          <Button text="Login" classes="btn btn-primary w-full" />
        </div>
      </form>
    </div>
  );
};
