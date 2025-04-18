import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry, ColDef, ICellRendererParams, themeMaterial } from 'ag-grid-community';
import { useState } from "react";

type Customer = {
	name: string;
}

export default function Customerlist() {

	const [customers, setCustomers] = useState<Customer[]>([]);

	const [columnDefs] = useState<ColDef<Customer>[]>([
		{
			field: 'name',
			headerName: 'Name',
			cellRenderer: (params: ICellRendererParams) => {
				return <span>{params.value}</span>;
			},
		},
	]);

	const addCustomer = () => {
		console.log("test")
	};

	return (
		<>
			<input
				placeholder="Name"

			/>
			<button onClick={() => addCustomer}>Add Customer</button>
			<div style={{ width: '90%', height: 500 }}>
				<AgGridReact
					rowData={customers}
					columnDefs={columnDefs}
					modules={[AllCommunityModule]}
				/>
			</div>
		</>
	);
}
