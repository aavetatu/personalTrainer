import { useState, useEffect } from "react";
import { Training } from "../types";
import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";
import { groupBy, sumBy } from "lodash";

export default function TrainingChart() {
  const [trainingData, setTrainingData] = useState<Training[]>([]);
  const activities = groupBy(trainingData, "activity");

  const chartData = Object.entries(activities).map(([activity, sessions]) => ({
    activity,
    totalDuration: sumBy(sessions, "duration"),
  }));

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "trainings")
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data._embedded.trainings.map((t: Training) => ({
          activity: t.activity,
          duration: t.duration,
        }));
        setTrainingData(formattedData);
      });
  }, []);

  return (
    <BarChart
      width={600}
      height={300}
      data={chartData}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <XAxis dataKey="activity" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="totalDuration" fill="#8884d8" />
    </BarChart>
  );
}
