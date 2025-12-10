import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus, 
  Users, 
  Phone, 
  Mail,
  MapPin,
  Edit,
  FileText,
  CreditCard
} from "lucide-react";

export default function CustomersPage() {
  const customers = [
    {
      id: "1",
      name: "Green Valley Store",
      type: "Retailer",
      phone: "+91 98765 43210",
      email: "orders@greenvalley.com",
      address: "123 Main Street, Mumbai, Maharashtra",
      gstin: "27ABCDE1234F1Z5",
      creditLimit: 50000,
      outstanding: 12450,
      totalPurchases: 235000,
      lastOrder: "2024-01-10"
    },
    {
      id: "2", 
      name: "Organic Market Hub",
      type: "Distributor",
      phone: "+91 87654 32109",
      email: "procurement@organichub.com",
      address: "456 Commerce Road, Delhi, NCR",
      gstin: "07FGHIJ5678K2L6",
      creditLimit: 100000,
      outstanding: 45300,
      totalPurchases: 567000,
      lastOrder: "2024-01-09"
    },
    {
      id: "3",
      name: "Fresh Foods Co.",
      type: "Retailer",
      phone: "+91 76543 21098",
      email: "buying@freshfoods.in",
      address: "789 Market Street, Bangalore, Karnataka",
      gstin: "29KLMNO9012P3Q7",
      creditLimit: 25000,
      outstanding: 8900,
      totalPurchases: 123000,
      lastOrder: "2024-01-08"
    }
  ];

  return (
    <Layout activePage="/customers">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Customer Management</h1>
            <p className="text-muted-foreground">Manage your retailers, distributors, and customer accounts</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Export List
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
          </div>
        </div>

        {/* Search & Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search customers by name, phone, or GSTIN..."
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Type</Button>
                <Button variant="outline" size="sm">Outstanding</Button>
                <Button variant="outline" size="sm">Location</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customers List */}
        <div className="grid gap-4">
          {customers.map((customer) => (
            <Card key={customer.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="grid gap-4 lg:grid-cols-12 lg:items-center">
                  {/* Customer Info */}
                  <div className="lg:col-span-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{customer.name}</h3>
                      <Badge 
                        variant={customer.type === "Distributor" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {customer.type}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Phone className="h-3 w-3" />
                        {customer.phone}
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-3 w-3" />
                        {customer.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3 w-3" />
                        {customer.address}
                      </div>
                    </div>
                    <p className="text-xs font-mono bg-muted px-2 py-1 rounded w-fit">
                      GSTIN: {customer.gstin}
                    </p>
                  </div>

                  {/* Financial Info */}
                  <div className="lg:col-span-6 space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-muted-foreground">Credit Limit</p>
                        <p className="font-semibold">₹{customer.creditLimit.toLocaleString()}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-muted-foreground">Outstanding</p>
                        <p className={`font-semibold ${
                          customer.outstanding > customer.creditLimit * 0.8 
                            ? "text-destructive" 
                            : "text-foreground"
                        }`}>
                          ₹{customer.outstanding.toLocaleString()}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-muted-foreground">Total Purchases</p>
                        <p className="font-semibold text-success">₹{customer.totalPurchases.toLocaleString()}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-muted-foreground">Last Order</p>
                        <p className="font-semibold">{customer.lastOrder}</p>
                      </div>
                    </div>
                    
                    {/* Credit Usage Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Credit Usage</span>
                        <span>{((customer.outstanding / customer.creditLimit) * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all ${
                            customer.outstanding / customer.creditLimit > 0.8 
                              ? "bg-destructive" 
                              : customer.outstanding / customer.creditLimit > 0.6
                              ? "bg-warning"
                              : "bg-success"
                          }`}
                          style={{ 
                            width: `${Math.min((customer.outstanding / customer.creditLimit) * 100, 100)}%` 
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="lg:col-span-2 flex items-center justify-end gap-2">
                    <Button variant="outline" size="sm">
                      <CreditCard className="h-4 w-4 mr-1" />
                      Statement
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-primary">{customers.length}</p>
              <p className="text-sm text-muted-foreground">Total Customers</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-success">
                {customers.filter(c => c.type === "Distributor").length}
              </p>
              <p className="text-sm text-muted-foreground">Distributors</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-warning">
                ₹{customers.reduce((acc, c) => acc + c.outstanding, 0).toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">Total Outstanding</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-primary">
                ₹{customers.reduce((acc, c) => acc + c.totalPurchases, 0).toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">Total Sales</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}