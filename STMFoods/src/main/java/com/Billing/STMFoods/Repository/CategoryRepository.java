package com.Billing.STMFoods.Repository;

import com.Billing.STMFoods.Model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category,Integer> {
    public  Iterable<Category> findAllByActive(String active);
    @Query(value = """
            select max(code)+1 as maxCode from category
            """,nativeQuery = true)
    public  int getMaxCode();
}
