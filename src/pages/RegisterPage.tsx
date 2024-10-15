
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { Input } from "../components/form/Input";
import { useForm } from "react-hook-form";
import { IUser } from "../models";
import { useAuth } from "../context/AuthProvider";

export const RegisterPage = () => {
  const { Register, firebaseError } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>();

  const OnSubmit = (data: IUser) => {
    Register(data);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit(OnSubmit)}
        className="p-8 rounded-lg flex flex-col gap-4 border-2 shadow-lg  w-[90%] sm:max-w-lg lg:w-[450px]"
      >
        <h1 className="text-center text-3xl lg:text-4xl">Create account</h1>
        {firebaseError && (
          <div role="alert" className="alert alert-error p-2">
            <span className="text-center">{firebaseError}.</span>
          </div>
        )}

        <div>
          <label className="form-control space-y-3 w-xs max-w-md">
            <span>Email</span>
            <Input
              classes="input-bordered focus:outline-primary focus:border-none"
              type="email"
              {...register("email", {
                required: "El correo electrónico es obligatorio",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Formato de correo electrónico no válido",
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

        <div>
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
          ¿Ya tienes cuenta?{" "}
          <Link to={"/login"} className="text-primary underline">
            Inicia sesión
          </Link>
        </span>

        <div>
          <Button text="Register" classes="btn btn-primary w-full" />
        </div>
      </form>
    </div>
  );
};
