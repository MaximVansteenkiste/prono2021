import { CgArrowLeftO } from "react-icons/cg";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

const Info = () => {
  return (
    <div className="h-full">
      <div className="px-3 pb-3 pt-2 flex text-2xl justify-between align-middle sticky top-0 bg-background z-10 text-title">
        <Link to="/home">
          <Button className="text-accent">
            <CgArrowLeftO />
          </Button>
        </Link>
      </div>
      <div className="text-title font-bold text-xl px-3 pb-3 pt-2 flex justify-between align-middle sticky top-0 bg-background z-10">
        Puntenverdeling Groepsfase
      </div>
      <ul className="circle">
        <li>
          {" "}
          • 3 punten voor de juiste voorspelling van het resultaat van de match
          (winst/gelijk/verlies)
        </li>
        <li>
          {" "}
          • 1 punt voor het juist voorspellen van het aantal gescoorde
          doelpunten per spelend team
        </li>
        <li>
          {" "}
          • 7 punten: Eindresultaat van de match volledig juist voorspeld
        </li>
        <li>
          {" "}
          • 2 punten voor elk goed voorspelde land bij de eindstand in de groep
        </li>
      </ul>
      <div className="text-title font-bold text-xl px-3 pb-3 pt-2 flex justify-between align-middle sticky top-0 bg-background z-10">
        Puntenverdeling Knockoutfase
      </div>
      TBD - kunnen we nog samen bespreken, maar dit is mijn voorstel:
      <ul className="circle">
        <li>
          {" "}
          • 4 punten voor de juiste voorspelling van het resultaat van de match
          (winst/gelijk/verlies)
        </li>
        <li>
          {" "}
          • 2 punten voor het juist voorspellen van het aantal gescoorde
          doelpunten per spelend team
        </li>
        <li>
          {" "}
          • 10 punten: Eindresultaat van de match volledig juist voorspeld
        </li>
        <li> • 2 punten voor elk goed voorspelde land in de kwartfinales</li>
        <li> • 4 punten voor elk goed voorspelde land in de halve finales</li>
        <li> • 8 punten voor elk goed voorspelde land in de finale</li>
        <li>
          {" "}
          • 10 punten voor de juiste winnaar (moet niet noodzakelijk dezelfde
          zijn als de oorspronkelijke voorspelling)
        </li>
        <li>
          {" "}
          • 15 punten als de winnaar dezelfde is als in de oorspronkelijke
          voorspelling (juiste winnaar in het begin voorspellen kan dus in
          totaal 25 punten opleveren){" "}
        </li>
      </ul>
      <div className="text-title font-bold text-xl px-3 pb-3 pt-2 flex justify-between align-middle sticky top-0 bg-background z-10">
        Puntenverdeling Bonusvragen
      </div>
      <ul className="circle">
        <li> • 15 punten: juiste winnaar (zoals hierboven dus) </li>
        <li>
          {" "}
          • 10 punten: topschutter - own goal - land meeste doelpunten voor -
          land meeste doelpunten tegen - land meeste kaarten
        </li>
        <li> • 5 punten: de rest</li>
      </ul>
    </div>
  );
};

export default Info;
