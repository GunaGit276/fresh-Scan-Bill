import Layout from "@/components/Layout";
import AddProductDialog from "@/components/dialogs/AddProductDialog";
import ViewCategoryDialog from "@/components/dialogs/ViewCategoryDialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Barcode, Edit, MoreHorizontal, Tags } from "lucide-react";
import { useEffect, useState } from "react";
import { getAllProducts } from "@/api/ProductApi";
import { CategoryType } from "@/components/dialogs/ViewCategoryDialog";
import { getAllCategories } from "@/api/CategoryApi";


export type ProductType = {
  code: number;
  name: string;
  cacode: number;
  grossAmt: number;
  taxPer: number;
  netAmt: number;
  disPer: number;
  bestBefore: number;
  saleMode: string;
  lowStock: number;
  active: string;
};

export default function ProductsPage() {
  const [addProductOpen, setAddProductOpen] = useState(false);
  const [viewCategoryOpen, setViewCategoryOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [ProCode, setProCode] = useState(0);
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data)
      } catch (error) {
        console.log(error);
      }
    }

    fetchAllProducts()

    const getAllCategory = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    }
    getAllCategory();
  }, [open, addProductOpen, viewCategoryOpen])

  const [products, setProducts] = useState<ProductType[]>([]);

  // const handleSaveProduct = (updatedProduct: ProductType) => {
  //   setProducts((prev) => {
  //     const exists = prev.find((pro) => pro.code === updatedProduct.code);
  //     if (exists) {
  //       return prev.map((pro) => (pro.code === updatedProduct.code ? updatedProduct : pro));
  //     } else {
  //       return [...prev, updatedProduct];
  //     }
  //   });
  // };

  return (
    <Layout activePage="/products">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Product Management</h1>
            <p className="text-muted-foreground">
              Manage your inventory, batches, and pricing
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setViewCategoryOpen(true)}>
              <Tags className="h-4 w-4 mr-2" />
              View Category
            </Button>
            <Button
              onClick={() => {
                setEdit(false);
                setAddProductOpen(true);
                // setProCode(Math.max(...products.map((p) => p.code)) + 1);
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Product
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
                  placeholder="Search products by name, SKU, or category..."
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Category
                </Button>
                <Button variant="outline" size="sm">
                  Stock Status
                </Button>
                <Button variant="outline" size="sm">
                  Expiry
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products List */}
        <div className="grid gap-4">
          {products.map((product) => (
            <Card key={product.code} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="grid sm:grid-cols-2 items-between justify-between">
                  <div className="flex flex-row justify-between space-y-2 gap-2 ">
                    <div className="flex flex-col items-start  gap-2 mr-2">
                      <h3 className="font-semibold text-lg">{product.name} -({product.code})</h3>
                      <p className="text-sm text-muted-foreground">
                        Category : {categories.find(e => e.code == product.cacode)?.name || "Unknown"}
                      </p>
                    </div>
                    <div className="flex flex-col justify-center gap-1 text-sm">
                      <h4>Gross Amount : ₹{product.grossAmt}/{product.saleMode}</h4>
                      {/* <span className="text-muted-foreground">•</span> */}
                      <h4> Tax Percent : {product.taxPer} %</h4>
                      {/* <span className="text-muted-foreground">•</span> */}
                      <h4>Net Amount : ₹{product.netAmt}/{product.saleMode}</h4>
                      {/* <span className="text-muted-foreground">•</span> */}
                    </div>
                    <div className={`h-10 w-24 text-lg font-medium flex items-center justify-center rounded-lg ${product.active === "Y"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                      }`}
                    >
                      <h2>{product.active === "Y" ? "Active" : "Inactive"}</h2>
                    </div>
                  </div>

                  <div className=" flex items-center justify-end gap-2">
                    <Button variant="outline" size="sm">
                      <Barcode className="h-4 w-4 mr-1" />
                      Print Label
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEdit(true);
                        setProCode(product.code);
                        setAddProductOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Summary */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-primary">{products.length}</p>
              <p className="text-sm text-muted-foreground">Total Products</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-sm text-muted-foreground">Low Stock Items</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-sm text-muted-foreground">Expiring Batches</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <AddProductDialog
        open={addProductOpen}
        onOpenChange={setAddProductOpen}
        edit={edit}
        productcode={ProCode}

      />
      <ViewCategoryDialog open={viewCategoryOpen} onOpenChange={setViewCategoryOpen} />
    </Layout>
  );
}
