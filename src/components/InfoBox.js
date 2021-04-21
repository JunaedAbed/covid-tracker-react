import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import CountUp from "react-countup";
import "./InfoBox.css";

function InfoBox({ title, cases, total, ...props }) {
  return (
    <Card onClick={props.onClick} className="infoBox">
      <CardContent>
        <Typography
          className="infoBox__title"
          color="textSecondary"
          gutterBottom
        >
          {title}
        </Typography>

        <h2 className="infoBox__cases">
          {/* <CountUp start={0} end={cases} duration={2} separator="," /> */}
          {cases}
        </h2>

        <Typography className="infoBox__total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
