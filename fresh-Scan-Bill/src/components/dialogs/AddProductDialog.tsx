import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Cast, Package, Save } from "lucide-react";
import { ProductType } from "@/pages/ProductsPage";
import { CategoryType } from "@/components/dialogs/ViewCategoryDialog";
import { getActiveCategories } from "@/api/CategoryApi";
import { postProduct, getProduct, getMaxCode } from "@/api/ProductApi";

interface AddProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  edit: boolean;
  productcode: number;
}

export default function AddProductDialog({ open, onOpenChange, productcode, edit }: AddProductDialogProps) {
  const [maxCode, setMaxCode] = useState<number | null>(null);
  const basedata = {
    name: "",
    code: maxCode,
    cacode: 0,
    bestBefore: 0,
    grossAmt: 0.0,
    taxPer: 0.0,
    netAmt: 0.0,
    disPer: 0.0,
    lowStock: 0,
    saleMode: "",
    active: "",
  }
  const [formData, setFormData] = useState(basedata);




  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    const getAllCategory = async () => {
      try {
        const data = await getActiveCategories();
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    }
    const getProductByCode = async () => {
      try {
        console.log(edit);
        if (edit) {
          console.log(`Procode ${productcode}`);
          const data = await getProduct(productcode);
          setFormData(data);
        } else {
          console.log("else calles :")
          const code = await getMaxCode();
          setMaxCode(code);
          setFormData(basedata);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getAllCategory();
    getProductByCode();
  }, [open, AddProductDialog]);

  const saleModes = [
    { saleMode: "Weight", code: "W" },
    { saleMode: "Pieces", code: "P" },
    { saleMode: "Box", code: "B" },
  ];

  const activeOptions = [
    { text: "Yes", value: "Y" },
    { text: "No", value: "N" },
  ];




  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Posting product:", formData);
    const res = await postProducts(formData, edit);
    if (!res) {
      console.log("Failed To Save Product..!!");
    }
    else {
      console.log("Product Saved..!!");
    }
    onOpenChange(false);
  };

  const postProducts = async (pro: any, edit: boolean) => {
    return postProduct(pro as ProductType, edit)
  };

  const handleKeyDown = (e, nextInputId) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const next = document.getElementById(nextInputId);
      if (next) next.focus();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Add New Product
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="w-full">
            <Label htmlFor="name">Product Name *</Label>
            <Input
              id="name"
              onKeyDown={(e) => handleKeyDown(e, "category")}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Betel nut laddu"
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="code">Code</Label>
              <Input id="code" value={formData.code} placeholder="e.g., BNL-001" disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                onKeyDown={(e) => handleKeyDown(e, "bestBefore")}
                className="w-full p-2 border border-border rounded-md bg-background"
                value={formData.cacode}
                onChange={(e) => {
                  setFormData({ ...formData, cacode: Number(e.target.value) })
                  console.log(Number(e.target.value));
                }
                }
              >  <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.code} value={cat.code}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bestBefore">Best Before</Label>
              <Input
                className="no-spinner"
                id="bestBefore"
                onKeyDown={(e) => handleKeyDown(e, "grossAmt")}
                type="number"
                value={formData.bestBefore || ""}
                onChange={(e) => setFormData({ ...formData, bestBefore: Number(e.target.value) })}
                placeholder="0.00"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="grossAmt">Gross Amount</Label>
              <Input
                className="no-spinner"
                id="grossAmt"
                onKeyDown={(e) => handleKeyDown(e, "taxPer")}
                type="number"
                value={formData.grossAmt || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    grossAmt: Number(e.target.value),
                    netAmt: (Number(e.target.value) / 100) * (100 + formData.taxPer),
                  })
                }
                placeholder="0.00"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="taxPer">Tax %</Label>
              <Input
                className="no-spinner"
                id="taxPer"
                onKeyDown={(e) => handleKeyDown(e, "netAmt")}
                type="number"
                value={formData.taxPer || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    taxPer: Number(e.target.value),
                    netAmt: (formData.grossAmt / 100) * (100 + Number(e.target.value)),
                  })
                }
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="netAmt">Net Amount</Label>
              <Input
                className="no-spinner"
                id="netAmt"
                onKeyDown={(e) => handleKeyDown(e, "disPer")}
                type="number"
                value={formData.netAmt || ""}
                onChange={(e) => setFormData({ ...formData, netAmt: Number(e.target.value) })}
                placeholder="0.00"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="disPer">Discount %</Label>
              <Input
                className="no-spinner"
                id="disPer"
                onKeyDown={(e) => handleKeyDown(e, "lowStock")}
                type="number"
                value={formData.disPer || ""}
                onChange={(e) => setFormData({ ...formData, disPer: Number(e.target.value) })}
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lowStock">Low Stock</Label>
              <Input
                className="no-spinner"
                id="lowStock"
                onKeyDown={(e) => handleKeyDown(e, "saleMode")}
                type="number"
                value={formData.lowStock || ""}
                onChange={(e) => setFormData({ ...formData, lowStock: Number(e.target.value) })}
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="saleMode">Sale Mode</Label>
              <select
                id="saleMode"
                onKeyDown={(e) => handleKeyDown(e, "active")}
                className="w-full p-2 border border-border rounded-md bg-background"
                value={formData.saleMode}
                onChange={(e) => setFormData({ ...formData, saleMode: e.target.value })}
              >
                {saleModes.map((mode) => (
                  <option key={mode.code} value={mode.code}>
                    {mode.saleMode}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="active">Active Status</Label>
              <select
                id="active"
                onKeyDown={(e) => handleKeyDown(e, "submit")}
                className="w-full p-2 border border-border rounded-md bg-background"
                value={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.value })}
              >
                <option value="">Select Active Status</option>
                {activeOptions.map((v) => (
                  <option key={v.text} value={v.value}>
                    {v.text}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button id="submit" type="submit" className="flex-1">
              <Save className="h-4 w-4 mr-2" />
              Save Product
            </Button>
            <Button type="button" variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
