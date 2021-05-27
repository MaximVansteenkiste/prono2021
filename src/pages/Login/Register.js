import { useCallback, useContext } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { MainContext } from "../../App";
import Card from "../../components/Card";
import Input from "../../components/Input";
import StyledButton from "../../components/StyledButton";
import firebase from "../../firebase";

const Register = () => {
  const { register, handleSubmit, watch } = useForm();
  const { setNotification } = useContext(MainContext);
  const history = useHistory();

  const onRegister = useCallback(
    ({ email, password }) => {
      if (watch("password") !== watch("password2")) {
        setNotification({ message: "Wachtwoorden komen niet overeen" });
        return;
      }

      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          setNotification({
            message: "Nieuw account aangemaakt!",
            type: "success",
          });
          history.push("/");
        })
        .catch((error) => {
          setNotification({ message: "Er liep iets mis" });
        });
    },
    [history, setNotification, watch]
  );

  return (
    <div className="mx-2 mt-2 space-y-2 grid grid-cols-1 md:place-items-center md:w-full">
      <Card title="Registreer" className="max-w-md">
        <form
          onSubmit={handleSubmit((data) => onRegister(data))}
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
            <Input
              type="password"
              placeholder="Herhaal wachtwoord"
              required
              {...register("password2")}
            ></Input>
          </div>
          <div className="flex justify-end mt-5 space-x-2">
            <StyledButton type="submit">Registreer</StyledButton>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Register;
