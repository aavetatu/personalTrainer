import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry, ColDef, ICellRendererParams, CsvExportModule } from "ag-grid-community";
import { useState, useEffect, useRef } from "react";
import { Training, TrainingData } from "../types";
import Addtraining from "./Addtraining";
import dayjs from "dayjs";
import { Button, Snackbar } from "@mui/material";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function Traininglist() {

	const [trainings, setTrainings] = useState<Training[]>([]);
	const [open, setOpen] = useState(false);
	const gridApi = useRef<any>(null);

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
								date: dayjs(training.date).format("DD/MM/YYYY HH:mm"),
								duration: training.duration,
								activity: training.activity,
								customerName: customerName,
								selfLink: training._links.self.href,
							};
						} catch (err) {
							console.error("Error fetching customer data", err);
							return {
								date: dayjs(training.date).format("DD/MM/YYYY HH:mm"),
								duration: training.duration,
								activity: training.activity,
								customerName: "Unknown",
								selfLink: training._links.self.href,
							};
						}
					})
				);
				setTrainings(trainingWithCustomers);
			})
			.catch(err => console.error(err));
	};

	interface ExtendedColDef<DataType = any> extends ColDef<DataType> {
		suppressCsvExport?: boolean;
	};

	const [columnDefs] = useState<ExtendedColDef<Training>[]>([
		{ field: "date", filter: true, width: 300 },
		{ field: "duration", filter: true, width: 150 },
		{ field: "activity", filter: true, width: 200 },
		{ field: "customerName", filter: true, width: 200 },
		{
			width: 100,
			suppressCsvExport: true,
			cellRenderer: (params: ICellRendererParams) =>
				<Button size="small" color="error" onClick={() => handleDelete(params)}>Delete</Button>,
		},
	]);

	const handleDelete = (params: ICellRendererParams) => {
		if (window.confirm("Are you sure you want to delete this training?")) {
			fetch(params.data.selfLink, {
				method: "DELETE",
			})
				.then(response => {
					if (!response.ok)
						throw new Error("Error while deleting training");
				})
				.then(() => fetchTrainings())
				.then(() => setOpen(true))
				.catch(err => console.error(err));
		}
	};

	const handleExport = () => {
		if (gridApi.current) {
			const exportableColumns = columnDefs
				.filter(col => col.field)
				.map(col => col.field)
			gridApi.current.exportDataAsCsv({
				columnKeys: exportableColumns
			});
		}
	};

	return (
		<>
			<Addtraining fetchTrainings={fetchTrainings} />
			<Button onClick={handleExport}>Export to CSV</Button>
			<div style={{ width: "90%", height: 500 }}>
				<AgGridReact
					rowData={trainings}
					columnDefs={columnDefs}
					onGridReady={(params) => {
						gridApi.current = params.api;
					}}
				/>
			</div>
			<Snackbar
				open={open}
				autoHideDuration={3000}
				onClose={() => setOpen(false)}
				message="Training deleted successfully"
			/>
		</>
	);
}
