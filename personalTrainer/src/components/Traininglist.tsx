import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry, ColDef } from 'ag-grid-community';
import { useState, useEffect } from "react";
import { Training } from "../types";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function Traininglist() {

	const [trainings, setTrainings] = useState<Training[]>([]);

	const [columnDefs] = useState<ColDef<Training>[]>([
		{ field: 'date', filter: true, width: 120 },
		{ field: 'duration', filter: true, width: 150 },
		{ field: 'activity', filter: true, width: 200 },
		//		{ field: 'postcode', filter: true, width: 100 },
		//		{ field: 'city', filter: true, width: 120 },
		//		{ field: 'email', filter: true, width: 200 },
		//		{ field: 'phone', filter: true, width: 150 },
	])
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
