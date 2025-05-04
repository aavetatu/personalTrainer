import { AgGridReact } from "ag-grid-react";
import {
  AllCommunityModule,
  ModuleRegistry,
  ColDef,
  ICellRendererParams,
} from "ag-grid-community";
import { useState, useEffect, useRef } from "react";
import { Customer } from "../types";
import Addcustomer from "./Addcustomer";
import Editcustomer from "./Editcustomer";
import { Button, Snackbar } from "@mui/material";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function Customerlist() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [open, setOpen] = useState(false);
  const gridApi = useRef<any>(null);

  interface ExtendedColDef<DataType = any> extends ColDef<DataType> {
    suppressCsvExport?: boolean;
  }

  const [columnDefs] = useState<ExtendedColDef<Customer>[]>([
    { field: "firstname", filter: true, width: 120 },
    { field: "lastname", filter: true, width: 120 },
    { field: "streetaddress", filter: true, width: 170 },
    { field: "postcode", filter: true, width: 120 },
    { field: "city", filter: true, width: 110 },
    { field: "email", filter: true, width: 190 },
    { field: "phone", filter: true, width: 120 },
    {
      width: 100,
      suppressCsvExport: true,
      cellRenderer: (params: ICellRendererParams) => (
        <Editcustomer data={params.data} fetchCustomers={fetchCustomers} />
      ),
    },
    {
      width: 100,
      suppressCsvExport: true,
      cellRenderer: (params: ICellRendererParams) => (
        <Button size="small" color="error" onClick={() => handleDelete(params)}>
          Delete
        </Button>
      ),
    },
  ]);

  const handleDelete = (params: ICellRendererParams) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      fetch(params.data._links.self.href, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) throw new Error("Error while deleting customer");

          return response.json();
        })
        .then(() => fetchCustomers())
        .then(() => setOpen(true))
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    fetch(import.meta.env.VITE_API_URL + "customers")
      .then((response) => {
        if (!response.ok) throw new Error("Error while fetching customers");

        return response.json();
      })
      .then((data) => {
        setCustomers(data._embedded.customers);
      })
      .catch((err) => console.error(err));
  };

  const handleExport = () => {
    if (gridApi.current) {
      const exportableColumns = columnDefs
        .filter((col) => col.field)
        .map((col) => col.field);
      gridApi.current.exportDataAsCsv({
        columnKeys: exportableColumns,
      });
    }
  };

  return (
    <>
      <Addcustomer fetchCustomers={fetchCustomers} />
      <Button onClick={handleExport}>Export to CSV</Button>
      <div style={{ width: "90", height: 650 }}>
        <AgGridReact
          rowData={customers}
          columnDefs={columnDefs}
          pagination={true}
          paginationAutoPageSize={true}
          onGridReady={(params) => {
            gridApi.current = params.api;
          }}
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
