import { getToday } from "../../utils";

const today = getToday();

export const FILTER_FIELDS = {
  user: [
    {
      name: "startDate",
      type: "date",
      size: 4,
      label: "Start Date",
      min: today,
      defaultValue: "",
    },
    {
      name: "endDate",
      type: "date",
      size: 4,
      label: "End Date",
      min: today,
      defaultValue: "",
    },
    {
      name: "guests",
      type: "number",
      size: 2,
      label: "Guests",
      defaultValue: 1,
      min: 1,
      max: 5,
    },
  ],
  admin: [
    {
      name: "startDate",
      type: "date",
      size: 4,
      label: "Start Date",
      min: today,
      defaultValue: "",
    },
    {
      name: "endDate",
      type: "date",
      size: 4,
      label: "End Date",
      min: today,
      defaultValue: "",
    },
    {
      name: "status",
      type: "select",
      size: 2,
      label: "Booking Status",
      defaultValue: "all",
      options: ["all", "paid", "pending"],
    },
  ],
};