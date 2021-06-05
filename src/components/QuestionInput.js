import Card from "./Card";
import Input from "./Input";

const QuestionInput = ({
  question: { nummer, topschutter, id },
  register,
  prediction,
}) => {
  return (
    <Card>
      <div className="flex w-full">
        <div className="text-xl font-bold truncate">{nummer}</div>
        <div className="text-lg font-semibold flex mx-5 w-full">
          <Input
            type="text"
            className="w-full"
            defaultValue={prediction?.topschutter}
            {...register(`${id}.topschutter`)}
          />
        </div>
      </div>
    </Card>
  );
};

export default QuestionInput;
