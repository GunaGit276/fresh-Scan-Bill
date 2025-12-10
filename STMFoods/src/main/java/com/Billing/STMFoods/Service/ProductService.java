package com.Billing.STMFoods.Service;

import com.Billing.STMFoods.Model.Category;
import com.Billing.STMFoods.Model.Product;
import com.Billing.STMFoods.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    ProductRepository productRepository;


    public List<Product> getProduct() {
        return productRepository.findAll();
    }
    public String postProduct(List<Product> products) {
        productRepository.saveAll(products);
        return "Product saved Successfull..!!";
    }


    public Optional<Product> getProductByCode(int code) {
        return productRepository.findById(code);
    }

    public String putProduct(List<Product> products) {
        productRepository.saveAll(products);
        return "Product Edited Successfull..!!";
    }
    public Iterable<Product> getActiveProduct() {
        return  productRepository.findAllByActive("Y");
    }

    public int getMaxCode() {
        return productRepository.getMaxCode();
    }

    public Iterable<Product> getActiveProductByCat(int cacode) {
        return productRepository.findAllByActiveAndCacode("Y",cacode);
    }
}
