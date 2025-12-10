package com.Billing.STMFoods.Repository;

import com.Billing.STMFoods.Model.Category;
import com.Billing.STMFoods.Model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product,Integer> {
    public  Iterable<Product> findAllByActive(String active);
    public  Iterable<Product> findAllByActiveAndCacode(String active,int cacode);
    @Query(value = """
            select max(code)+1 as maxCode from product
            """,nativeQuery = true)
    public  int getMaxCode();

}
