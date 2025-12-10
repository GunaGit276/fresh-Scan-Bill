import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AddCategoryDialog from "./AddCategoryDialog";
import { Tags, Plus, Edit, Code } from "lucide-react";
import { getAllCategories } from "@/api/CategoryApi";

interface ViewCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export type CategoryType = {
  code: number;
  name: string;
  active: string;
};



export default function ViewCategoryDialog({ open, onOpenChange }: ViewCategoryDialogProps) {
  const [addCategoryOpen, setAddCategoryOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [caCode, setCaCode] = useState(0);

  // const handleSaveCategory = (updatedCategory: CategoryType) => {
  //   setCategories((prev) => {
  //     const exists = prev.find((cat) => cat.code === updatedCategory.code);
  //     if (exists) {
  //       return prev.map((cat) => (cat.code === updatedCategory.code ? updatedCategory : cat));
  //     } else {
  //       return [...prev, updatedCategory];
  //     }
  //   });
  // };

  useEffect(() => {
    const getAllCategory = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    }
    getAllCategory();
  }, [open, addCategoryOpen]);

  const [categories, setCategories] = useState<CategoryType[]>([]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl max-h-[80vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between mt-2 bg-[#BBF9C1] p-1 rounded-lg">
          <DialogTitle className="flex flex-row items-center gap-2">
            <Tags className="h-5 w-5" />
            View And Edit Category
          </DialogTitle>
          <Button
            onClick={() => {
              setAddCategoryOpen(true);
              setEdit(false);
              setCaCode(Math.max(...categories.map((c) => c.code)) + 1);
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
        </DialogHeader>

        <div className="mt-4 space-y-4 overflow-y-auto max-h-[60vh] pr-2">
          {categories.map((category) => (
            <Card key={category.code} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex gap-4 lg:grid-cols-2 lg:items-center justify-between">
                  <div className="lg:col-span-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">
                        {category.name} - ({category.code})
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <div
                      className={`h-10 w-24 text-lg font-medium flex items-center justify-center rounded-lg ${category.active === "Y" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                        }`}
                    >
                      <h2>{category.active === "Y" ? "Active" : "Inactive"}</h2>
                    </div>

                    <div className="lg:col-span-2 flex items-center justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setAddCategoryOpen(true);
                          setEdit(true);
                          setCaCode(category.code);
                        }}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>

      <AddCategoryDialog
        open={addCategoryOpen}
        onOpenChange={setAddCategoryOpen}
        edit={edit}
        caCode={caCode}
      />
    </Dialog>
  );
}
