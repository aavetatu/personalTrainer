import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry, ColDef } from "ag-grid-community";
import { useState, useEffect } from "react";
import { Training, TrainingData } from "../types";
import dayjs from "dayjs";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function Traininglist() {

	const [trainings, setTrainings] = useState<Training[]>([]);

	useEffect(() => {
		fetchTrainings();
	}, []);

	const fetchTrainings = () => {
		fetch(import.meta.env.VITE_API_URL + "trainings")
			.then(response => {
				if (!response.ok)
					throw new Error("Error while fetching trainings");
				return response.json();
			})
			.then(async data => {
				const trainingData: TrainingData[] = data._embedded.trainings;

				const trainingWithCustomers: Training[] = await Promise.all(
					trainingData.map(async (training) => {
						try {
							const customerRes = await fetch(training._links.customer.href);
							if (!customerRes.ok)
								throw new Error("Error while fetching customer data");
							const customerData = await customerRes.json();
							const customerName = `${customerData.firstname} ${customerData.lastname}`;

							return {
								date: dayjs(training.date).format("DD/MM/YYYY"),
								duration: training.duration,
								activity: training.activity,
								customerName: customerName,
							};
						} catch (err) {
							console.error("Error fetching customer data", err);
							return {
								date: dayjs(training.date).format("DD/MM/YYYY"),
								duration: training.duration,
								activity: training.activity,
								customerName: "Unknown",
							};
						}
					})
				);
				setTrainings(trainingWithCustomers);
			})
			.catch(err => console.error(err));
	};

	const [columnDefs] = useState<ColDef<Training>[]>([
		{ field: "date", filter: true, width: 300 },
		{ field: "duration", filter: true, width: 150 },
		{ field: "activity", filter: true, width: 200 },
		{ field: "customerName", filter: true, width: 200 },
	]);

	return (
		<>
			<div style={{ width: "90%", height: 500 }}>
				<AgGridReact
					rowData={trainings}
					columnDefs={columnDefs}
				/>
			</div>
		</>
	);
}
