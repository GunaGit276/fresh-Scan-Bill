package com.Billing.STMFoods.Service;

import com.Billing.STMFoods.DTO.ProductWiseStock;
import com.Billing.STMFoods.Model.Sales;
import com.Billing.STMFoods.Repository.SalesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SalesService {
    @Autowired
    private SalesRepository salesRepository;

    public List<Sales> getAllSales() {
        return salesRepository.findAll();
    }

    public String postSales(List<Sales> sales) {
        salesRepository.saveAll(sales);
        return "Sales Saved Succesfully";
    }

    public List<ProductWiseStock> getProductWiseSales() {
        return salesRepository.getProductWiseStock();
    }

    public int getMaxCode() {
       return salesRepository.getMaxCode();
    }
}
