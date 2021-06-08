import Card from "./Card";
import Input from "./Input";

const QuestionInput = ({
  question: { question, id },
  onChange,
  prediction,
}) => {
  return (
    <Card>
      <div className="flex w-full">
        <div className="md:text-xl font-bold w-full">
          {id}. {question}
        </div>
        <div className="text-lg font-semibold flex mx-5 w-full">
          <Input
            type="text"
            className="w-full"
            defaultValue={prediction?.answer}
            onChange={onChange}
            required
            name={`question${id}`}
          />
        </div>
      </div>
    </Card>
  );
};

export default QuestionInput;
