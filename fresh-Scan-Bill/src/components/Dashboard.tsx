import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatCard from "@/components/StatCard";
import QuickSaleDialog from "@/components/dialogs/QuickSaleDialog";
import AddProductDialog from "@/components/dialogs/AddProductDialog";
import AddCustomerDialog from "@/components/dialogs/AddCustomerDialog";
import {
  ShoppingCart,
  Package,
  Users,
  TrendingUp,
  AlertTriangle,
  Clock,
  DollarSign,
  Boxes
} from "lucide-react";

export default function Dashboard() {
  const [quickSaleOpen, setQuickSaleOpen] = useState(false);
  const [addProductOpen, setAddProductOpen] = useState(false);
  const [addCustomerOpen, setAddCustomerOpen] = useState(false);
  const stats = [
    {
      title: "Today's Sales",
      value: "₹45,230",
      subtitle: "23 transactions",
      icon: <DollarSign className="h-6 w-6" />,
      trend: { value: 12.5, isPositive: true }
    },
    {
      title: "Active Products",
      value: "1,247",
      subtitle: "856 in stock",
      icon: <Package className="h-6 w-6" />,
      trend: { value: 3.2, isPositive: true }
    },
    {
      title: "Total Customers",
      value: "342",
      subtitle: "18 new this month",
      icon: <Users className="h-6 w-6" />,
      trend: { value: 8.1, isPositive: true }
    },
    {
      title: "Low Stock Items",
      value: "12",
      subtitle: "Requires attention",
      icon: <AlertTriangle className="h-6 w-6" />,
      trend: { value: -2.3, isPositive: false }
    }
  ];

  const recentSales = [
    { id: "INV-001", customer: "Green Valley Store", amount: "₹2,450", time: "2 min ago" },
    { id: "INV-002", customer: "Organic Market Hub", amount: "₹8,320", time: "15 min ago" },
    { id: "INV-003", customer: "Fresh Foods Co.", amount: "₹1,890", time: "32 min ago" },
    { id: "INV-004", customer: "Natural Living", amount: "₹5,670", time: "1 hr ago" },
  ];

  const expiringBatches = [
    { product: "Organic Almonds", batch: "ALM-2024-001", expiry: "2024-01-15", qty: "25 kg" },
    { product: "Quinoa Seeds", batch: "QUI-2024-003", expiry: "2024-01-18", qty: "40 kg" },
    { product: "Chia Seeds", batch: "CHI-2024-002", expiry: "2024-01-22", qty: "15 kg" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-accent rounded-xl p-6 text-primary-foreground">
        <h1 className="text-2xl font-bold mb-2">Welcome back, Admin!</h1>
        <p className="text-primary-foreground/80">
          Here's what's happening with your natural food distribution business today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Sales */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Recent Sales</CardTitle>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSales.map((sale) => (
                <div key={sale.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                  <div className="space-y-1">
                    <p className="font-medium text-foreground">{sale.customer}</p>
                    <p className="text-sm text-muted-foreground">Invoice: {sale.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">{sale.amount}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {sale.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Expiring Batches Alert */}
        <Card className="border-warning/20 bg-warning/5">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Expiring Soon
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {expiringBatches.map((batch, index) => (
                <div key={index} className="p-3 rounded-lg border border-warning/20 bg-warning/10">
                  <p className="font-medium text-sm">{batch.product}</p>
                  <p className="text-xs text-muted-foreground">Batch: {batch.batch}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs bg-warning/20 text-warning-foreground px-2 py-1 rounded">
                      {batch.expiry}
                    </span>
                    <span className="text-xs font-medium">{batch.qty}</span>
                  </div>
                </div>
              ))}
              <Button variant="warning" size="sm" className="w-full">
                Review All Batches
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button
              variant="gradient"
              className="h-20 flex flex-col gap-2"
              onClick={() => setQuickSaleOpen(true)}
            >
              <ShoppingCart className="h-6 w-6" />
              New Sale
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col gap-2"
              onClick={() => setAddProductOpen(true)}
            >
              <Package className="h-6 w-6" />
              Add Product
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col gap-2"
              onClick={() => setAddCustomerOpen(true)}
            >
              <Users className="h-6 w-6" />
              Add Customer
            </Button>
            <Button variant="ghost" className="h-20 flex flex-col gap-2">
              <Boxes className="h-6 w-6" />
              Stock Entry
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <QuickSaleDialog open={quickSaleOpen} onOpenChange={setQuickSaleOpen} />
      {/* <AddProductDialog open={addProductOpen} onOpenChange={setAddProductOpen} /> */}
      <AddCustomerDialog open={addCustomerOpen} onOpenChange={setAddCustomerOpen} />
    </div>
  );
}