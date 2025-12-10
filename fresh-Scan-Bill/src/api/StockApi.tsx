
const baseUrl = "http://localhost:8081/stock";

export async function getProductwiseStock() {
    const res = await fetch(`${baseUrl}/productwisestock`);
    if (!res.ok) throw new Error("Failed to get the Data..!!");
    return await res.json();
}

export async function getMaxCode() {
    const res = await fetch(`${baseUrl}/maxcode`);
    if (!res.ok) throw new Error("Failed to get the MaxCode..!!");
    const data = await res.json();
    // console.log(Number(data));
    return Number(data);
}

export async function postStock(stock) {
    const res = await fetch(baseUrl, { method: "POST", headers: { "Content-Type": "application/json", }, body: JSON.stringify([stock]) })
    if (!res.ok) throw new Error("Failed to Post the stock..!!")
    return true
}

export async function getStockByProduct(procode: number) {
    const res = await fetch(`${baseUrl}/${procode}`);
    if (!res.ok) throw new Error("Failed to get the Data..!!");
    return await res.json();
}


