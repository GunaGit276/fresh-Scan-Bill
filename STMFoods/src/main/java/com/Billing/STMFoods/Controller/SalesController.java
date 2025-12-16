package com.Billing.STMFoods.Controller;

import com.Billing.STMFoods.DTO.ProductWiseStock;
import com.Billing.STMFoods.Model.Sales;
import com.Billing.STMFoods.Model.Stock;
import com.Billing.STMFoods.Service.SalesService;
import com.Billing.STMFoods.Service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
public class SalesController {

    @Autowired
    private SalesService salesService;

    @GetMapping("/sales")
    public List<Sales> getAllSales(){
        return salesService.getAllSales();
    }

    @GetMapping("sales/productwisesales")
    public List<ProductWiseStock> getProductWiseSales(){
        return salesService.getProductWiseSales();
    }


    @GetMapping("/sales/maxcode")
    public int getMaxCode(){        return salesService.getMaxCode();
    }

    @PostMapping("/sales")
    public String postSales(@RequestBody List<Sales> sales){
        return salesService.postSales(sales);
    }

}
