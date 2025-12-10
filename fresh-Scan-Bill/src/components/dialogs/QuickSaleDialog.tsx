import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingCart, Plus, Minus } from "lucide-react";

interface QuickSaleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function QuickSaleDialog({ open, onOpenChange }: QuickSaleDialogProps) {
  const [selectedProducts, setSelectedProducts] = useState([
    { id: 1, name: "Betel nut laddu", price: 120, qty: 1 },
    { id: 2, name: "Cotton milk laddu", price: 80, qty: 1 }
  ]);

  const updateQuantity = (id: number, change: number) => {
    setSelectedProducts(prev => 
      prev.map(p => p.id === id ? { ...p, qty: Math.max(0, p.qty + change) } : p)
    );
  };

  const total = selectedProducts.reduce((sum, p) => sum + (p.price * p.qty), 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Quick Sale
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-3">
            {selectedProducts.map((product) => (
              <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-muted-foreground">₹{product.price} each</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => updateQuantity(product.id, -1)}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center">{product.qty}</span>
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => updateQuantity(product.id, 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="customer">Customer Name</Label>
              <Input id="customer" placeholder="Enter customer name" />
            </div>
            
            <div className="flex justify-between items-center p-3 bg-accent rounded-lg">
              <span className="font-medium">Total:</span>
              <span className="text-lg font-bold">₹{total}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button className="flex-1">
              Complete Sale
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}