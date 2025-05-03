import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry, ColDef, ICellRendererParams } from "ag-grid-community";
import { useState, useEffect } from "react";
import { Customer } from "../types";
import Addcustomer from "./Addcustomer";
import Editcustomer from "./Editcustomer";
import { Button, Snackbar } from '@mui/material';

ModuleRegistry.registerModules([AllCommunityModule]);

export default function Customerlist() {

	const [customers, setCustomers] = useState<Customer[]>([]);
	const [open, setOpen] = useState(false);

	const [columnDefs] = useState<ColDef<Customer>[]>([
		{ field: "firstname", filter: true, width: 120 },
		{ field: "lastname", filter: true, width: 120 },
		{ field: "streetaddress", filter: true, width: 170 },
		{ field: "postcode", filter: true, width: 120 },
		{ field: "city", filter: true, width: 110 },
		{ field: "email", filter: true, width: 190 },
		{ field: "phone", filter: true, width: 120 },
		{
			width: 100,
			cellRenderer: (params: ICellRendererParams) =>
				<Editcustomer data={params.data} fetchCustomers={fetchCustomers} />,
		},
		{
			width: 100,
			cellRenderer: (params: ICellRendererParams) =>
				<Button size="small" color="error" onClick={() => handleDelete(params)}>Delete</Button>,
		},
	]);

	const handleDelete = (params: ICellRendererParams) => {
		fetch(params.data._links.self.href, {
			method: "DELETE",
		})
			.then(response => {
				if (!response.ok)
					throw new Error("Error while deleting customer");

				return response.json();
			})
			.then(() => fetchCustomers())
			.then(() => setOpen(true))
			.catch(err => console.error(err));
	};

	useEffect(() => {
		fetchCustomers();
	}, []);

	const fetchCustomers = () => {
		console.log("fetching from: ", import.meta.env.VITE_API_URL + "customers")
		fetch(import.meta.env.VITE_API_URL + "customers")
			.then(response => {
				if (!response.ok)
					throw new Error("Error while fetching customers");

				return response.json();
			})
			.then(data => {
				setCustomers(data._embedded.customers);
			})
			.catch(err => console.error(err));
	}

	return (
		<>
			<Addcustomer fetchCustomers={fetchCustomers} />
			<div style={{ width: "90", height: 650 }}>
				<AgGridReact
					rowData={customers}
					columnDefs={columnDefs}
					pagination={true}
					paginationAutoPageSize={true}
				/>
			</div>
			<Snackbar
				open={open}
				autoHideDuration={3000}
				onClose={() => setOpen(false)}
				message="Customer deleted successfully"
			/>
		</>
	);
}
