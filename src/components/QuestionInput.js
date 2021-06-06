import Card from "./Card";
import Input from "./Input";

const QuestionInput = ({
  question: { nummer, vraag, id },
  register,
  prediction,
}) => {
  return (
    <Card>
      <div className="flex w-full">
        <div className="text-xl font-bold w-full">
          {nummer}. {vraag}
        </div>
        <div className="text-lg font-semibold flex mx-5 w-full">
          <Input
            type="text"
            className="w-full"
            defaultValue={prediction?.antwoord}
            {...register(`${id}.vraag`)}
          />
        </div>
      </div>
    </Card>
  );
};

export default QuestionInput;
