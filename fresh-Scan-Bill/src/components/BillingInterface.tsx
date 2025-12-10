import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  Plus, 
  Minus, 
  Trash2, 
  Calculator,
  Printer,
  Save,
  Users,
  Scan,
  AlertCircle,
  Package
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CartItem {
  id: string;
  name: string;
  sku: string;
  batch: string;
  price: number;
  quantity: number;
  uom: string;
  tax: number;
  total: number;
}

export default function BillingInterface() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Organic Almonds",
      sku: "ALM-001",
      batch: "ALM-2024-001",
      price: 800,
      quantity: 2.5,
      uom: "kg",
      tax: 5,
      total: 2100
    },
    {
      id: "2", 
      name: "Quinoa Seeds",
      sku: "QUI-001",
      batch: "QUI-2024-003",
      price: 350,
      quantity: 1,
      uom: "kg",
      tax: 5,
      total: 367.50
    }
  ]);

  const [customer, setCustomer] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [paymentMode, setPaymentMode] = useState("cash");

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalTax = cartItems.reduce((sum, item) => sum + ((item.price * item.quantity * item.tax) / 100), 0);
  const grandTotal = subtotal + totalTax;

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCartItems(items => items.filter(item => item.id !== id));
      return;
    }
    
    setCartItems(items => 
      items.map(item => 
        item.id === id 
          ? { ...item, quantity: newQuantity, total: item.price * newQuantity * (1 + item.tax / 100) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      {/* Main Billing Area */}
      <div className="lg:col-span-8 space-y-6">
        {/* Search & Customer */}
        <Card>
          <CardContent className="p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="search">Search Products</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Search by name, SKU, or scan barcode..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                  <Button size="icon" variant="outline" className="absolute right-1 top-1">
                    <Scan className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="customer">Customer</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="customer"
                    placeholder="Select or add customer..."
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cart Items */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Cart Items ({cartItems.length})</span>
              <Button variant="outline" size="sm">
                <Calculator className="h-4 w-4 mr-2" />
                Quick Add
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {cartItems.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No items in cart. Search and add products to start billing.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{item.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {item.sku}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          Batch: {item.batch}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        ₹{item.price} per {item.uom} • Tax: {item.tax}%
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 0.5)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <div className="text-center min-w-[60px]">
                        <p className="font-medium">{item.quantity}</p>
                        <p className="text-xs text-muted-foreground">{item.uom}</p>
                      </div>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 0.5)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    <div className="text-right min-w-[80px]">
                      <p className="font-semibold">₹{(item.price * item.quantity).toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">
                        +₹{((item.price * item.quantity * item.tax) / 100).toFixed(2)} tax
                      </p>
                    </div>

                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Billing Summary */}
      <div className="lg:col-span-4">
        <Card className="sticky top-6">
          <CardHeader>
            <CardTitle>Bill Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Totals */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>₹{totalTax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>₹{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Payment Mode */}
            <div className="space-y-2">
              <Label>Payment Mode</Label>
              <div className="grid grid-cols-2 gap-2">
                {["cash", "card", "upi", "bank"].map((mode) => (
                  <Button
                    key={mode}
                    variant={paymentMode === mode ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPaymentMode(mode)}
                    className="capitalize"
                  >
                    {mode}
                  </Button>
                ))}
              </div>
            </div>

            {/* Payment Amount */}
            <div className="space-y-2">
              <Label htmlFor="amount">Amount Received</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                defaultValue={grandTotal}
              />
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <Button className="w-full" size="lg" disabled={cartItems.length === 0}>
                <Printer className="h-4 w-4 mr-2" />
                Print & Complete Sale
              </Button>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm">
                  <Save className="h-4 w-4 mr-2" />
                  Save Draft
                </Button>
                <Button variant="outline" size="sm">
                  Email Invoice
                </Button>
              </div>
            </div>

            {/* Quick Shortcuts */}
            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground mb-2">Quick Shortcuts</p>
              <div className="grid grid-cols-2 gap-1 text-xs">
                <div className="flex justify-between">
                  <span>F1</span>
                  <span className="text-muted-foreground">Search</span>
                </div>
                <div className="flex justify-between">
                  <span>F2</span>
                  <span className="text-muted-foreground">Customer</span>
                </div>
                <div className="flex justify-between">
                  <span>F3</span>
                  <span className="text-muted-foreground">Payment</span>
                </div>
                <div className="flex justify-between">
                  <span>F4</span>
                  <span className="text-muted-foreground">Complete</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}