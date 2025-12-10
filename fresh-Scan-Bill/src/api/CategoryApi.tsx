import { CategoryType } from "@/components/dialogs/ViewCategoryDialog";

const baseUrl = "http://localhost:8081/category";


export async function getAllCategories() {
    const res = await fetch(baseUrl);
    if (!res.ok) throw new Error("Failed to fatch The Category..!!");
    return res.json()
}

export async function getActiveCategories() {
    const res = await fetch("http://localhost:8081/activecategory");
    if (!res.ok) throw new Error("Failed to fatch The Category..!!");
    return res.json()
}

export async function getCategory(code: number) {
    const res = await fetch(`${baseUrl}/${code}`)
    if (!res.ok) throw new Error("Failed to get the Category..!!")
    return await res.json();
}

export async function getMaxCode() {
    const res = await fetch(`${baseUrl}/maxcode`);
    if (!res.ok) throw new Error("Failed to get the MaxCode..!!");
    const data = await res.json();
    // console.log(Number(data));
    return Number(data);
}

export async function postCategory(category: CategoryType, edit: boolean) {
    const res = await fetch(baseUrl, { method: edit ? "PUT" : "POST", headers: { "Content-Type": "application/json", }, body: JSON.stringify([category]) });
    console.log(category);
    if (!res.ok) throw new Error("Failed to Post the category..!!")
    return true
}