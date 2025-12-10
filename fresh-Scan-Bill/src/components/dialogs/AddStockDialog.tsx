import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DatePicker from "@/components/ui/DatePicker";
import { Label } from "@/components/ui/label";
import { Package, Save } from "lucide-react";
import { ProductType } from "@/pages/ProductsPage";
import { CategoryType } from "@/components/dialogs/ViewCategoryDialog";
import { getActiveCategories } from "@/api/CategoryApi";
import { getActiveProducts } from "@/api/ProductApi";
import { getMaxCode, postStock } from "@/api/StockApi";

interface AddProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddStockDialog({ open, onOpenChange }: AddProductDialogProps) {
  const [maxCode, setMaxCode] = useState<number | null>(0);
  // const basedata = {

  // }
  const err = {
    category: "",
    product: "",
  }
  const [formData, setFormData] = useState({
    entryDate: new Date,
    code: maxCode,
    cacode: 0,
    procode: 0,
    remark: "",
    mnfDate: new Date,
    expDate: new Date,
    quantity: 0,
    weight: 0.0,
    cquantity: 0,
    cweight: 0.0,
  });
  const [products, setProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [bestBefore, setBestBefor] = useState(0);
  const [errors, setErrors] = useState(err);

  const handleError = (field, message) => {
    setErrors((prev) => ({ ...prev, [field]: message }));
    setTimeout(() => {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }, 1000);
  };

  useEffect(() => {
    const getAllCategory = async () => {
      try {
        const data = await getActiveCategories();
        setCategories(data);
        const code = await getMaxCode();
        console.log(code);
        setFormData({ ...formData, code: code })
      } catch (error) {
        console.log(error);
      }
    }
    getAllCategory();
  }, [open]);

  useEffect(() => {
    const getProductByCategory = async () => {
      try {
        const data = await getActiveProducts(formData.cacode ? formData.cacode : 0);
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    }
    getProductByCategory();
  }, [open, formData.cacode]);

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
    const res = await postStocks(formData);
    if (!res) {
      console.log("Failed To Save Product..!!");
    }
    else {
      console.log("Product Saved..!!");
    }
    onOpenChange(false);
  };

  const postStocks = async (stk) => {
    return postStock(stk)
  };

  const handleKeyDown = (e, nextInputId: string) => {
    if (e.key === "Enter") {
      try {
        if (nextInputId === "product") {
          if (formData.cacode === 0) {
            handleError("category", "Select Category..!!");
            return
          }
        }
        if (nextInputId === "remark") {
          if (formData.procode === 0) {
            handleError("product", "Select Product..!!");
            return
          }
        }
        e.preventDefault();
        const next = document.getElementById(nextInputId);
        if (next) next.focus();
      } catch (error) {
        console.log(error.message);
      }
    };
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Add New Stock
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="code">Code</Label>
              <Input id="code" value={formData.code} placeholder="e.g., BNL-001" disabled />
            </div>

            <div className="w-full"
              onKeyDown={(e) => handleKeyDown(e, "category")}>
              <Label htmlFor="entryDate">Entry Date</Label>
              <DatePicker
                dateid="entryDate"
                value={formData.entryDate}
                onBlur={(date) => setFormData({ ...formData, entryDate: date })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <span className="text-red-600 text-xs ml-2">{errors.category}</span>
              <select
                id="category"
                onKeyDown={async (e) => {
                  handleKeyDown(e, "product");
                }}
                className="w-full p-2 border border-border rounded-md bg-background"
                value={formData.cacode}
                onChange={(e) => {
                  setFormData({ ...formData, cacode: Number(e.target.value), procode: 0 })
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
              <Label htmlFor="product">Product</Label>
              <span className="text-red-600 text-xs ml-2">{errors.product}</span>
              <select
                id="product"
                onKeyDown={(e) => handleKeyDown(e, "remark")}
                className="w-full p-2 border border-border rounded-md bg-background"
                value={formData.procode}
                onChange={(e) => {
                  setFormData({ ...formData, procode: Number(e.target.value) });
                  console.log(Number(e.target.value));
                  if (Number(e.target.value) === 0) {
                    return
                  }
                  console.log("here")
                }
                }
                onBlur={
                  (e) => {
                    const pro = products.find(p => p.code === Number(e.target.value))
                    setBestBefor(pro?.bestBefore || 0);
                    const expDate = new Date(formData.mnfDate);
                    expDate.setDate(expDate.getDate() + pro.bestBefore);
                    console.log(`${bestBefore}   ${expDate.toISOString().split("T")[0]}  ${formData.expDate.toISOString().split("T")[0]}`);
                    setFormData({ ...formData, expDate: new Date(expDate.toISOString().split("T")[0]) });
                  }
                }
              >  <option value="">Select product</option>
                {products.map((pro) => (
                  <option key={pro.code} value={pro.code}>
                    {pro.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full">
              <Label htmlFor="remark">Remarks</Label>
              <Input
                id="remark"
                onKeyDown={(e) => handleKeyDown(e, "mnfDate")}
                value={formData.remark}
                onChange={(e) => setFormData({ ...formData, remark: e.target.value })}
                placeholder="Something you wanna remember"
                required
              />
            </div>

            <div className="w-full"
              onKeyDown={(e) => handleKeyDown(e, "bestBefore")}>
              <Label htmlFor="mnfDate">Manufacturing Date</Label>
              <DatePicker
                dateid="mnfDate"
                value={formData.mnfDate}
                onChange={(d) => setFormData({ ...formData, mnfDate: d })}
                onBlur={(date) => {
                  if (date) {
                    const exp = new Date(date);
                    console.log(`on blur1`)
                    // console.log(`exp ${exp} date${date}`)
                    exp.setDate(exp.getDate() + bestBefore);
                    // console.log(`mnf ${date}`);
                    setFormData((p) => ({ ...p, mnfDate: new Date(date), expDate: new Date(exp), }));

                  }
                }}
              />
            </div>


            <div className="space-y-2">
              <Label htmlFor="bestBefore">Best Before</Label>
              <Input
                className="no-spinner"
                id="bestBefore"
                onKeyDown={(e) => handleKeyDown(e, "expDate")}
                type="number"
                value={bestBefore || ""}
                onChange={
                  (e) => {
                    setBestBefor(Number(e.target.value))
                    const expDate = new Date(formData.mnfDate)
                    expDate.setDate(expDate.getDate() + Number(e.target.value))
                    setFormData({ ...formData, expDate: expDate })
                  }
                }
                onBlur={
                  (e) => {
                    const expDate = new Date(formData.mnfDate);
                    expDate.setDate(expDate.getDate() + bestBefore);
                    // console.log(`${bestBefore} mnf date${formData.mnfDate}  calc exp dste${expDate.toISOString().split("T")[0]}  ${formData.expDate.toISOString().split("T")[0]}`);
                    setFormData({ ...formData, expDate: new Date(expDate) });
                  }
                }
                placeholder="0"
              />
            </div>

            <div className="w-full"
              onKeyDown={(e) => handleKeyDown(e, "quantity")}>
              <Label htmlFor="expDate">Expiry Date</Label>
              <DatePicker
                dateid="expDate"
                value={formData.expDate}
                onBlur={(date) => {
                  setFormData({ ...formData, expDate: new Date(date) })
                  console.log(`on blur`)
                  setBestBefor(Math.floor((date.getTime() - formData.mnfDate.getTime()) / (1000 * 60 * 60 * 24)))
                }}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                className="no-spinner"
                id="quantity"
                onKeyDown={(e) => handleKeyDown(e, "weight")}
                type="number"
                value={formData.quantity || ""}
                onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                placeholder="0"
              />
            </div>


            <div className="space-y-2">
              <Label htmlFor="weight">Weight</Label>
              <Input
                className="no-spinner"
                id="weight"
                onKeyDown={(e) => handleKeyDown(e, "submit")}
                type="number"
                value={formData.weight || ""}
                onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
                placeholder="0.00"
                required
              />
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
