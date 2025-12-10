package com.Billing.STMFoods.Controller;

import com.Billing.STMFoods.Model.Category;
import com.Billing.STMFoods.Service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
public class CategoryController {

    @Autowired
    CategoryService categoryService;

    @GetMapping("/category")
    public List<Category> getAllCategory(){
        return categoryService.getCategory();
    }

    @GetMapping("/category/{code}")
    public Optional<Category> getCategoryById(@PathVariable("code") int code){        return categoryService.getCategoryById(code);
    }

        @GetMapping("/activecategory")
    public Iterable<Category> getActiveCategory(){        return categoryService.getActiveCategory();
    }

    @GetMapping("/category/maxcode")
    public int getMaxCode(){        return categoryService.getMaxCode();
    }


    @PostMapping("/category")
    public String postCategory(@RequestBody List<Category> categories){
        return categoryService.postCategory(categories);
    }
    @PutMapping("/category")
    public String putCategory(@RequestBody List<Category> categories){
        return categoryService.putCategory(categories);
    }
}
