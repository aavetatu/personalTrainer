import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry, ColDef } from 'ag-grid-community';
import { useState, useEffect } from "react";
import { Training } from "../types";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function Traininglist() {

	const [trainings, setTrainings] = useState<Training[]>([]);

	useEffect(() => {
		fetchTrainings();
	}, []);

	const fetchTrainings = () => {
		console.log(import.meta.env.VITE_API_URL + "trainings")
		fetch(import.meta.env.VITE_API_URL + "trainings")
			.then(response => {
				if (!response.ok)
					throw new Error("Error while fetching trainings");
				return response.json();
			})
			.then(data => {
				setTrainings(data._embedded.trainings);
			})
			.catch(err => console.error(err));
	};

	const [columnDefs] = useState<ColDef<Training>[]>([
		{ field: 'date', filter: true, width: 120 },
		{ field: 'duration', filter: true, width: 150 },
		{ field: 'activity', filter: true, width: 200 },
	]);

	return (
		<>
			<div style={{ width: '90%', height: 500 }}>
				<AgGridReact
					rowData={trainings}
					columnDefs={columnDefs}
				/>
			</div>
		</>
	);
}
