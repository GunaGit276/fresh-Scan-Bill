import { ProductType } from "@/pages/ProductsPage";


const baseUrl = "http://localhost:8081/product";

export async function getAllProducts() {
    const res = await fetch(baseUrl)
    if (!res.ok) throw new Error("Failed to get the product..!!")
    return await res.json();
}


export async function getActiveProducts(cacode: Number) {
    const res = await fetch(`http://localhost:8081/activeproduct${cacode ? "/" + cacode.toString() : ""}`)
    if (!res.ok) throw new Error("Failed to get the product..!!")
    return await res.json();
}

export async function getProduct(code: number) {
    const res = await fetch(`${baseUrl}/${code}`)
    if (!res.ok) throw new Error("Failed to get the product..!!")
    return await res.json();
}

export async function getMaxCode() {
    const res = await fetch(`${baseUrl}/maxcode`);
    if (!res.ok) throw new Error("Failed to get the MaxCode..!!");
    const data = await res.json();
    // console.log(Number(data));
    return Number(data);
}

export async function postProduct(product: ProductType, edit: boolean) {
    const res = await fetch(baseUrl, { method: edit ? "PUT" : "POST", headers: { "Content-Type": "application/json", }, body: JSON.stringify([product]) })
    if (!res.ok) throw new Error("Failed to Post the product..!!")
    return true
}


