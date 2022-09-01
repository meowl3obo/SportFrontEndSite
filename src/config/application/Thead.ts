import { IThead } from "@/type/Global"

export const BuyRecordThead: Array<IThead> = [
    { key: "orderID", name: "Order.OrderID" },
    { key: "planName", name: "Order.PlanName" },
    { key: "point", name: "Order.Point" },
    { key: "date", name: "Order.Date" },
]

export const StoreRecordThead: Array<IThead> = [
    { key: "orderID", name: "Order.OrderID" },
    { key: "date", name: "Order.Date" },
    { key: "planName", name: "Order.PlanName" },
    { key: "point", name: "Order.Point" },
    { key: "price", name: "Order.Price" },
    { key: "channel", name: "Order.Channel" },
    { key: "status", name: "Order.Status" },
]

export const StoredOption: Array<IThead> = [
    { key: "radio", name: "" },
    { key: "name", name: "Stored.Option" },
    { key: "point", name: "Stored.Point" },
    { key: "price", name: "Stored.Price" },
    { key: "endTime", name: "Stored.EndDate" },
]

export const StoredMethod: Array<IThead> = [
    { key: "radio", name: "" },
    { key: "name", name: "Stored.Method" },
]