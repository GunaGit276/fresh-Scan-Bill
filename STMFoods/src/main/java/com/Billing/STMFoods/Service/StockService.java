package com.Billing.STMFoods.Service;

import com.Billing.STMFoods.DTO.ProductWiseStock;
import com.Billing.STMFoods.Model.Stock;
import com.Billing.STMFoods.Repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StockService {
    @Autowired
    private StockRepository stockRepository;

    public List<Stock> getAllStock() {
        return stockRepository.findAll();
    }

    public String postStock(List<Stock> stocks) {
        stockRepository.saveAll(stocks);
        return "Stock Saved Succesfully";
    }

    public List<ProductWiseStock> getProductWiseStock() {
        return stockRepository.getProductWiseStock();
    }

    public List<Stock> getStockbyProcode(int procode) {
        return stockRepository.findAllByProcode(procode);
    }

    public int getMaxCode() {
       return stockRepository.getMaxCode();
    }
}
