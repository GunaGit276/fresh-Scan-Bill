package com.Billing.STMFoods.Controller;

import com.Billing.STMFoods.Model.Category;
import com.Billing.STMFoods.Model.Product;
import com.Billing.STMFoods.Service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
public class ProductController {

    @Autowired
    ProductService productService;

    @GetMapping("/product")
    public List<Product> getAllProduct(){
        return productService.getProduct();
    }

    @GetMapping("/product/{code}")
    public Optional<Product> getProductByCode(@PathVariable("code") int code){
        return productService.getProductByCode(code);
    }

    @GetMapping("/activeproduct")
    public Iterable<Product> getActiveProduct(){        return productService.getActiveProduct();
    }

    @GetMapping("/activeproduct/{cacode}")
    public Iterable<Product> getActiveProductByCat(@PathVariable(name = "cacode")int cacode){        return productService.getActiveProductByCat(cacode);
    }

    @GetMapping("/product/maxcode")
    public int getMaxCode(){        return productService.getMaxCode();
    }


    @PostMapping("/product")
    public String postProduct(@RequestBody List<Product> products){
        return productService.postProduct(products);
    }

    @PutMapping("/product")
    public String putProduct(@RequestBody List<Product> products){
        return productService.putProduct(products);
    }
}
