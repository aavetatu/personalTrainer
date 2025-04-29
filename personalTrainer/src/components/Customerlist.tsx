import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry, ColDef } from 'ag-grid-community';
import { useState, useEffect } from "react";

ModuleRegistry.registerModules([AllCommunityModule]);


type Customer = {
	firstname: string;
	lastname: string;
	streetaddress: string;
	postcode: string;
	city: string;
	email: string;
	phone: string;
	//	_links: {
	//		self: {
	//			href: string;
	//		},
	//		customer: {
	//			href: string;
	//		},
	//		trainings: {
	//			href: string;
	//		},
	//	}
}

export default function Customerlist() {

	const [customers, setCustomers] = useState<Customer[]>([]);

	const [columnDefs] = useState<ColDef<Customer>[]>([
		{ field: 'firstname', filter: true },
		{ field: 'lastname', filter: true },
		{ field: 'streetaddress', filter: true },
		{ field: 'postcode', filter: true },
		{ field: 'city', filter: true },
		{ field: 'email', filter: true },
		{ field: 'phone', filter: true },
	])

	useEffect(() => {
		fetchCustomers();
	}, []);

	const fetchCustomers = () => {
		console.log("fetching from: ", import.meta.env.VITE_API_URL + "customers")
		fetch(import.meta.env.VITE_API_URL + "customers")
			.then(response => {
				if (!response.ok)
					throw new Error('Error in fetch');
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
			<div style={{ width: '90%', height: 500 }}>
				<AgGridReact
					rowData={customers}
					columnDefs={columnDefs}
				/>
			</div>
		</>
	);
}
