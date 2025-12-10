import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Calendar, 
  Download, 
  TrendingUp,
  DollarSign,
  Package,
  Users,
  FileText,
  BarChart3
} from "lucide-react";

export default function ReportsPage() {
  const reportTypes = [
    {
      title: "Sales Report",
      description: "Daily, weekly, and monthly sales analysis",
      icon: <DollarSign className="h-6 w-6" />,
      action: "Generate Sales Report"
    },
    {
      title: "Inventory Report", 
      description: "Stock levels, low stock alerts, and batch tracking",
      icon: <Package className="h-6 w-6" />,
      action: "Generate Inventory Report"
    },
    {
      title: "Customer Report",
      description: "Customer purchases, outstanding payments",
      icon: <Users className="h-6 w-6" />,
      action: "Generate Customer Report"
    },
    {
      title: "Financial Report",
      description: "Profit & loss, tax reports, payment analysis",
      icon: <TrendingUp className="h-6 w-6" />,
      action: "Generate Financial Report"
    },
    {
      title: "Product Performance",
      description: "Best selling products, category analysis",
      icon: <BarChart3 className="h-6 w-6" />,
      action: "Generate Product Report"
    },
    {
      title: "Batch Expiry Report",
      description: "Expiring batches and waste management",
      icon: <Calendar className="h-6 w-6" />,
      action: "Generate Expiry Report"
    }
  ];

  const quickStats = [
    { label: "Today's Sales", value: "₹45,230", change: "+12.5%" },
    { label: "This Month", value: "₹8,95,450", change: "+8.2%" },
    { label: "Outstanding", value: "₹2,15,680", change: "-5.1%" },
    { label: "Low Stock Items", value: "12", change: "+2" }
  ];

  return (
    <Layout activePage="/reports">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Business Reports</h1>
            <p className="text-muted-foreground">Generate and download business analytics</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Date Range
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export All
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          {quickStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className={`text-xs ${stat.change.includes('+') ? 'text-success' : 'text-destructive'}`}>
                    {stat.change} from last period
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Date Range Filter */}
        <Card>
          <CardHeader>
            <CardTitle>Report Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="from-date">From Date</Label>
                <Input id="from-date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="to-date">To Date</Label>
                <Input id="to-date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="warehouse">Warehouse</Label>
                <select className="w-full p-2 border border-border rounded-md bg-background">
                  <option>All Warehouses</option>
                  <option>Main Warehouse</option>
                  <option>Branch Store</option>
                </select>
              </div>
              <div className="flex items-end">
                <Button className="w-full">Apply Filters</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Report Types */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reportTypes.map((report, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    {report.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{report.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{report.description}</p>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    <FileText className="h-4 w-4 mr-2" />
                    {report.action}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "Daily Sales Report - September 19, 2025", size: "2.4 MB", date: "2 hours ago" },
                { name: "Monthly Inventory Report - August 2025", size: "5.8 MB", date: "1 day ago" },
                { name: "Customer Outstanding Report", size: "1.2 MB", date: "3 days ago" },
                { name: "Product Performance - Q3 2025", size: "3.6 MB", date: "1 week ago" }
              ].map((report, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-accent/50">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{report.name}</p>
                      <p className="text-xs text-muted-foreground">{report.size} • {report.date}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}