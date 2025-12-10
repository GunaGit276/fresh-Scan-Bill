package com.Billing.STMFoods.Service;

import com.Billing.STMFoods.Model.Category;
import com.Billing.STMFoods.Repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    CategoryRepository categoryRepository;


    public List<Category> getCategory() {
        return categoryRepository.findAll();
    }

    public String postCategory(List<Category> categories) {
         categoryRepository.saveAll(categories);
         return "Category saved Successfull..!!";
    }

    public Optional<Category> getCategoryById(int code) {
        return categoryRepository.findById(code);
    }

    public String putCategory(List<Category> categories) {
        categoryRepository.saveAll(categories);
        return "Category Edited Successfull..!!";
    }

    public Iterable<Category> getActiveCategory() {
        return  categoryRepository.findAllByActive("Y");
    }

    public int getMaxCode() {
        return categoryRepository.getMaxCode();
    }
}
