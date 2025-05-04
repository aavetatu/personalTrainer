import { useState, useEffect } from 'react';
import { Training } from '../types';
import { Bar, BarChart, Tooltip, XAxis, YAxis } from 'recharts';


export default function TrainingChart() {

	const [chartData, setChartData] = useState<Training[]>([]);

	useEffect(() => {
		fetch(import.meta.env.VITE_API_URL + "trainings")
			.then((response) => response.json())
			.then((data) => {
				const formattedData = data._embedded.trainings.map((training: Training) => ({
					activity: training.activity,
					duration: training.duration,
				}));
				setChartData(formattedData);
			})
	}, []);

	return (
		<BarChart width={600} height={300} data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
			<XAxis dataKey="activity" />
			<YAxis />
			<Tooltip />
			<Bar dataKey="duration" fill="#8884d8" />
		</BarChart>
	)
}
