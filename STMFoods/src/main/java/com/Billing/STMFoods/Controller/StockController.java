package com.Billing.STMFoods.Controller;

import com.Billing.STMFoods.DTO.ProductWiseStock;
import com.Billing.STMFoods.Model.Stock;
import com.Billing.STMFoods.Service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
public class StockController {

    @Autowired
    private StockService stockService;

    @GetMapping("/stock")
    public List<Stock> getAllStock(){
        return stockService.getAllStock();
    }

    @GetMapping("stock/productwisestock")
    public List<ProductWiseStock> getProductWiseStock(){
        return stockService.getProductWiseStock();
    }

    @GetMapping("stock/{procode}")
    public List<Stock> getStockbyProcode(@PathVariable(name = "procode") int procode){
        return stockService.getStockbyProcode(procode);
    }

    @GetMapping("/stock/maxcode")
    public int getMaxCode(){        return stockService.getMaxCode();
    }

    @PostMapping("/stock")
    public String postStock(@RequestBody List<Stock> stocks){
        return stockService.postStock(stocks);
    }

}
