import Layout from "@/components/Layout";
import AddStockDialog from "@/components/dialogs/AddStockDialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Leaf } from "lucide-react";
import { useEffect, useState } from "react";
import { getProductwiseStock, getStockByProduct } from "@/api/StockApi";
import { XOGame } from "@/components/dialogs/tic-tac-toe";


export default function StockPage() {
    const [addProductOpen, setAddProductOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [proCode, setProCode] = useState(0);
    const [product, setProduct] = useState("");
    const [stockByProduct, setStockByProduct] = useState([]);
    const [productWiseStock, setProductWiseStock] = useState([]);
    const [remark, setRemark] = useState("");

    useEffect(() => {
        // const fetchAllProducts = async () => {
        //     try {
        //         const data = await getProductwiseStock();
        //         setProductWiseStock(data)
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }

        // fetchAllProducts()

        const getAllProductwiseStock = async () => {
            try {
                const data = await getProductwiseStock();
                setProductWiseStock(data);
                // console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
        getAllProductwiseStock();
    }, [open])

    useEffect(() => {
        const getStockWithProCode = async () => {
            try {
                if (proCode == 0) return
                const data = await getStockByProduct(proCode);
                setStockByProduct(data);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
        getStockWithProCode();
    }, [proCode])

    return (
        <Layout activePage="/stock">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold">Stock Management</h1>
                        <p className="text-muted-foreground">
                            Manage your inventory, batches, and pricing
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            onClick={() => {
                                setAddProductOpen(true);
                                setEdit(false);
                            }}
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Stock
                        </Button>
                    </div>
                </div>
                <div className="grid  grid-cols-[60%_40%] h-[calc(100vh-300px)] overflow-hidden p-4 " >

                    <div className=" overflow-y-auto  p-4 rounded-xl shadow mr-4 border-2 border-black-900">
                        {productWiseStock.map((product) => (
                            <Card key={product.procode} className="bg-white transition-shadow border-2 border-black-900 m-2 hover:shadow-lg hover:bg-[#f3cf5880]  hover:border-yellow-400">
                                <CardContent className="p-3">
                                    {/* <div className="flex justify-between items-center"> */}
                                    <div onClick={() => {
                                        setProCode(product.procode);
                                        // console.log(product.product);
                                        setProduct(product.proname);
                                    }} className="grid grid-cols-[40%_60%]">
                                        <div className="flex flex-col items-start justify-center  gap-2 ml-4">
                                            <h3 className="font-semibold text-lg ">{product.proname} -({product.procode})</h3>
                                            <h4 className="font-semibold text-gray-500 text-xs ">Category : {product.caname}</h4>
                                        </div>
                                        <div className="flex justify-between items-center" >
                                            <div className="font-bold" >
                                                <h4>Last Entry : {new Date(product.lastentry).toLocaleDateString("en-GB")}</h4>
                                            </div>
                                            <div className={`flex flex-col justify-center text-sm border-2 p-2 rounded-xl mr-8
                                                ${product.lowstock <= product.quantity ? "bg-red-100" : product.lowstock <= (product.quantity * 1.5) ? "bg-yellow-100" : "bg-green-100"}
                                            `}>
                                                <h4 className="font-bold" >Stock Information</h4>
                                                <h4>Qty : {product.quantity}</h4>
                                                <h4>Weight : {Number(product.weight).toFixed(3)} KG</h4>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    <div className="w-full  overflow-x-auto  bg-green p-4 rounded-xl shadow border-2 border-black-900 ">
                        {stockByProduct.length > 0 ? (
                            <div className="flex flex-col h-full">
                                {/* Top heading */}
                                <h2 className="text-xl font-semibold mb-4 text-gray-800 sticky top-0 bg-white">
                                    Stock Details
                                </h2>

                                {/* Table wrapper */}
                                <div className="flex-1 min-w-max overflow-y-auto">
                                    <div className="p-4 bg-white rounded-xl shadow-md">
                                        <table className="border-collapse border border-gray-300 rounded-lg overflow-hidden text-sm w-full">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th className="border p-3 text-left font-semibold">Entry Date</th>
                                                    <th className="border p-3 text-left font-semibold">Product</th>
                                                    <th className="border p-3 text-left font-semibold">MNF Date</th>
                                                    <th className="border p-3 text-left font-semibold">EXP Date</th>
                                                    <th className="border p-3 text-left font-semibold">Qty</th>
                                                    <th className="border p-3 text-left font-semibold">Weight</th>
                                                    <th className="border p-3 text-left font-semibold">C.Qty</th>
                                                    <th className="border p-3 text-left font-semibold">C.Weight</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {stockByProduct.map((s) => (
                                                    <tr
                                                        key={s.code}
                                                        className="border-t hover:bg-[#f3cf5880] transition-colors"
                                                        onMouseEnter={() => {
                                                            setRemark(s.remark === null ? "remark" : s.remark);
                                                        }}
                                                        onMouseLeave={() => {
                                                            setRemark("");
                                                        }}
                                                    >
                                                        <td className="border p-3">{s.entryDate}</td>
                                                        <td className="border p-3">{product}</td>
                                                        <td className="border p-3">{s.mnfDate}</td>
                                                        <td className="border p-3">{s.expDate}</td>
                                                        <td className="border p-3">{s.quantity}</td>
                                                        <td className="border p-3">{Number(s.weight).toFixed(3)}</td>
                                                        <td className="border p-3">{s.cquantity}</td>
                                                        <td className="border p-3">{Number(s.cweight).toFixed(3)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                {/* Bottom heading */}
                                {remark !== "" && (
                                    <h2 className="text-xl font-semibold text-gray-800 mt-auto bg-white">
                                        Remarks : {remark}
                                    </h2>
                                )}
                            </div>
                        ) :
                            <div className="flex flex-col h-[100%] w-[100%] justify-center items-center gap-3 px-6 border-b border-border">
                                <h1 className="text-3xl font-semibold text-foreground">STM Foods</h1>
                                <p className="text-3xl text-muted-foreground">Stock Details</p>
                            </div>
                            // <XOGame />
                        }
                    </div>
                </div>


                {/* Stats Summary */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardContent className="p-4 text-center">
                            <p className="text-2xl font-bold text-primary">{27}</p>
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

            <AddStockDialog
                open={addProductOpen}
                onOpenChange={setAddProductOpen} />
        </Layout>
    );
}
