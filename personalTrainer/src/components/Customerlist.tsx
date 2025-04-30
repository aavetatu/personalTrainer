import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry, ColDef } from "ag-grid-community";
import { useState, useEffect } from "react";
import { Customer } from "../types";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function Customerlist() {

	const [customers, setCustomers] = useState<Customer[]>([]);

	const [columnDefs] = useState<ColDef<Customer>[]>([
		{ field: "firstname", filter: true, width: 130 },
		{ field: "lastname", filter: true, width: 140 },
		{ field: "streetaddress", filter: true, width: 190 },
		{ field: "postcode", filter: true, width: 120 },
		{ field: "city", filter: true, width: 120 },
		{ field: "email", filter: true, width: 190 },
		{ field: "phone", filter: true, width: 140 },
	])

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
				console.log(data);
				setCustomers(data._embedded.customers);
			})
			.catch(err => console.error(err));
	}

	return (
		<>
			<div style={{ width: "90%", height: 500 }}>
				<AgGridReact
					rowData={customers}
					columnDefs={columnDefs}
				/>
			</div>
		</>
	);
}
