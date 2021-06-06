import { useState } from "react";
import Button from "../../../components/Button";
import Card from "../../../components/Card";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import Fade from "react-reveal/Fade";
import useDeleteDoc from "../../../api/useDeleteDoc";
import AddContact from "../../../components/AddContact/AddContact";

const DayOverview = ({ dateLabel, matches }) => {
  return (
    <Fade top cascade duration={300}>
      <div className="my-6">
        <div className="text-3xl font-bold pb-2 text-left pl-2 text-title sticky top-12 bg-background rounded-b-sm">
          {dateLabel}
        </div>
        <div className="flex flex-col space-y-2">
          {matches.map((m) => (
            <Match match={m} key={m.id} />
          ))}
        </div>
      </div>
    </Fade>
  );
};

const Match = ({ match: { id, hometeam, awayteam, score, date, time } }) => {
  return (
    <Card title={time}>
      <div></div>
    </Card>
  );
};

export default DayOverview;
