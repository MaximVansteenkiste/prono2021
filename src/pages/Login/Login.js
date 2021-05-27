import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { MainContext } from "../../App";
import Card from "../../components/Card";
import Input from "../../components/Input";
import StyledButton from "../../components/StyledButton";
import useLogin from "../../hooks/api/useLogin";
const Login = () => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const { login } = useLogin();
  const { setPath } = useContext(MainContext);

  return (
    <div className="mx-2 mt-2 space-y-2 grid grid-cols-1 md:place-items-center md:w-full">
      <Card title="Login" className="max-w-md">
        <form
          onSubmit={handleSubmit((data) =>
            login(data, { onSuccess: () => history.push("/") })
          )}
          className="mt-2"
        >
          <div className="flex flex-col space-y-2">
            <Input
              type="email"
              placeholder="E-mail"
              required
              {...register("email")}
            ></Input>
            <Input
              type="password"
              placeholder="Wachtwoord"
              required
              {...register("password")}
            ></Input>
          </div>
          <div className="flex justify-end mt-5 space-x-2">
            <StyledButton
              onClick={(e) => {
                e.preventDefault();
                history.push("/register");
              }}
            >
              Registreer
            </StyledButton>
            <StyledButton type="submit">Login</StyledButton>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Login;
