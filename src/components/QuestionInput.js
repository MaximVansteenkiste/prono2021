import Card from "./Card";
import Input from "./Input";

const QuestionInput = ({
  question: { nummer, topschutter, id },
  register,
  prediction,
}) => {
  return (
    <Card>
      <div className="flex justify-between">
        <div className="text-xl font-bold truncate">{nummer}</div>

        <div className="text-lg font-semibold flex mx-5">
          <Input
            type="string"
            className="w-100 text-center mx-1"
            defaultValue={prediction?.topschutter}
            {...register(`${id}.topschutter`)}
          />
        </div>
      </div>
    </Card>
  );
};

export default QuestionInput;
