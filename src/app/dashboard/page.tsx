import StatsCard from "@/components/features/StatsCard";
import DataTable from "@/components/features/DataTable";
import Badge from "@/components/ui/Badge";

const stats = [
  { title: "Total Users", value: "12,345", change: "+12% from last month", changeType: "positive" as const, icon: "👥" },
  { title: "Revenue", value: "$45,678", change: "+8% from last month", changeType: "positive" as const, icon: "💰" },
  { title: "Orders", value: "1,234", change: "-3% from last month", changeType: "negative" as const, icon: "📦" },
  { title: "Conversion", value: "3.2%", change: "No change", changeType: "neutral" as const, icon: "📊" },
];

const recentOrders = [
  { id: "ORD-001", customer: "Alice Johnson", amount: "$120.00", status: "completed", date: "2026-03-04" },
  { id: "ORD-002", customer: "Bob Smith", amount: "$85.50", status: "pending", date: "2026-03-03" },
  { id: "ORD-003", customer: "Charlie Brown", amount: "$230.00", status: "completed", date: "2026-03-03" },
  { id: "ORD-004", customer: "Diana Prince", amount: "$45.00", status: "cancelled", date: "2026-03-02" },
  { id: "ORD-005", customer: "Eve Davis", amount: "$180.00", status: "pending", date: "2026-03-02" },
];

const statusColors: Record<string, "green" | "yellow" | "red"> = {
  completed: "green",
  pending: "yellow",
  cancelled: "red",
};

const columns = [
  { key: "id" as const, header: "Order ID" },
  { key: "customer" as const, header: "Customer" },
  { key: "amount" as const, header: "Amount" },
  {
    key: "status" as const,
    header: "Status",
    render: (value: unknown) => (
      <Badge color={statusColors[value as string] || "gray"}>
        {String(value)}
      </Badge>
    ),
  },
  { key: "date" as const, header: "Date" },
];

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
        </div>
        <DataTable columns={columns} data={recentOrders} />
      </div>
    </div>
  );
}
