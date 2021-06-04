import { useCallback, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { MainContext } from "../../App";
import useLogin from "../../hooks/api/useLogin";
import useUser from "../../hooks/useUser";
import firebase from "../../firebase";
import Card from "../../components/Card";
import Input from "../../components/Input";
import Button from "../../components/Button";
import StyledButton from "../../components/StyledButton";

const Login = () => {
  const { setNotification } = useContext(MainContext);
  const { register, handleSubmit } = useForm();
  const { login } = useLogin();
  const [isPasswordForget, setIsPasswordForget] = useState();
  const history = useHistory();
  const user = useUser();

  if (user && user !== "loading") {
    history.push("/");
  }
  const onSubmit = useCallback(
    (data) => {
      if (isPasswordForget) {
        firebase
          .auth()
          .sendPasswordResetEmail(data.email)
          .then(() => {
            setIsPasswordForget(false);
            setNotification({
              message: "De mail is verstuurd",
              type: "success",
            });
          })
          .catch(() =>
            setNotification({
              message: "Er liep iets mis",
            })
          );
        return;
      }

      login(data);
    },
    [isPasswordForget, login, setNotification]
  );

  return (
    <div className="mx-2 mt-2 space-y-2 grid grid-cols-1 md:place-items-center md:w-full">
      <Card
        title={isPasswordForget ? "Herstel wachtwoord" : "Login"}
        className="w-full md:max-w-lg"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
          <div className="flex flex-col space-y-2">
            <Input
              type="email"
              placeholder="E-mail"
              className="w-full"
              required
              {...register("email")}
            ></Input>
            {isPasswordForget || (
              <Input
                type="password"
                placeholder="Wachtwoord"
                required
                className="w-full"
                {...register("password")}
              ></Input>
            )}
          </div>
          <div className="flex justify-end mt-5 space-x-2">
            <Button
              onClick={(e) => {
                e.preventDefault();
                setIsPasswordForget((prev) => !prev);
              }}
              className="text-xs font-light"
            >
              {isPasswordForget ? "Naar login" : "Wachtwoord vergeten?"}
            </Button>
            <StyledButton type="submit">
              {isPasswordForget ? "Verstuur mail" : "Login"}
            </StyledButton>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Login;
