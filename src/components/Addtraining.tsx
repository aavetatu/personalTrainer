import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  MenuItem,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

type AddTrainingProps = {
  fetchTrainings: () => void;
};

type Customer = {
  firstname: string;
  lastname: string;
  _links: {
    self: {
      href: string;
    };
  };
};

export default function Addtraining(props: AddTrainingProps) {
  const [date, setDate] = useState<dayjs.Dayjs | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [open, setOpen] = useState(false);

  const [training, setTraining] = useState({
    date: "",
    duration: 0,
    activity: "",
    customer: "",
  });

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "customers")
      .then((response) => response.json())
      .then((data) => setCustomers(data._embedded.customers))
      .catch((err) => console.error("Error while fetching customers", err));
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    if (!date) {
      console.error("Date is required");
      return;
    }

    const newTraining = {
      date: date.toISOString(),
      duration: training.duration,
      activity: training.activity,
      customer: training.customer,
    };

    fetch(import.meta.env.VITE_API_URL + "trainings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTraining),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error while adding training");
        }
        return response.json();
      })
      .then(() => props.fetchTrainings())
      .then(() => handleClose())
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a new Training</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date"
              value={date}
              format="DD/MM/YYYY HH:mm"
              onChange={(newDate) => setDate(newDate)}
            />
          </LocalizationProvider>
          <TextField
            required
            margin="dense"
            name="duration"
            type="number"
            value={training.duration}
            onChange={(e) =>
              setTraining({ ...training, duration: Number(e.target.value) })
            }
            label="Duration"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            name="activity"
            value={training.activity}
            onChange={(e) =>
              setTraining({ ...training, activity: e.target.value })
            }
            label="Activity"
            fullWidth
            variant="standard"
          />
          <TextField
            select
            required
            margin="dense"
            name="customer"
            value={training.customer}
            onChange={(e) =>
              setTraining({ ...training, customer: e.target.value })
            }
            label="Customer"
            fullWidth
            variant="standard"
          >
            {customers.map((customer, index) => (
              <MenuItem key={index} value={customer._links.self.href}>
                {customer.firstname} {customer.lastname}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
