import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Package, Save } from "lucide-react";
import { getCategory, postCategory, getMaxCode } from "@/api/CategoryApi";

interface AddCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  edit: boolean;
  caCode: number;
}

export default function AddCategoryDialog({ open, onOpenChange, caCode, edit }: AddCategoryDialogProps) {
  const [maxCode, setMaxCode] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    code: 0,
    active: "",
  });

  // useEffect(() => {
  //   const fetchMaxCode = async () => {
  //     try {
  //       const code = await getMaxCode();
  //       setMaxCode(code);
  //       console.log(code);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   fetchMaxCode();
  // }, [open]);

  useEffect(() => {

    const getCategoryByCode = async () => {
      try {
        if (edit) {
          const Data = await getCategory(caCode);
          setFormData(Data)
        } else {
          const code = await getMaxCode();
          setMaxCode(code);
          setFormData({
            name: "",
            code: maxCode,
            active: "",
          });
        }
      } catch (error) {
        console.log(error);
      }

    }

    getCategoryByCode();
  }, [open]);

  const activeOptions = [
    { text: "Yes", value: "Y" },
    { text: "No", value: "N" },
  ];
  const handleKeyDown = (e, nextInputId) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const next = document.getElementById(nextInputId);
      if (next) next.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Category product:", formData);
    const res = await postCategory(formData, edit);
    if (!res) {
      throw new Error("Failed To Saved The Category....!!");
    }
    else {
      console.log("Cat saved......!!");
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Add New Category
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="w-full">
            <Label htmlFor="name">Category Name *</Label>
            <Input
              id="name"
              onKeyDown={(e) => handleKeyDown(e, "active")}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Betel nut laddu"
              required
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="code">Code</Label>
              <Input
                className="border-2 border-gray-300 rounded-md"
                id="code"
                type="number"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: Number(e.target.value) })}
                placeholder=""
                disabled
              />
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
              Save Category
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
