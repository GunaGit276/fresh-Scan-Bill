package com.Billing.STMFoods.Repository;

import com.Billing.STMFoods.DTO.ProductWiseStock;
import com.Billing.STMFoods.Model.Sales;
import com.Billing.STMFoods.Model.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SalesRepository extends JpaRepository<Sales,Integer> {

    @Query(value = """
            select P.code as procode,
            p.name as proname,
            c.name as caname,
            sum(s.quantity-s.cquantity) as quantity,
            sum(s.weight-s.cweight) as weight,
            max(s.entry_date) as lastentry,
            p.lowstock as lowstock 
            from stock s
            left join product p on p.code=s.procode
            left join category c on c.code=s.cacode
            group by p.code,p.name,c.name,p.lowstock
            """, nativeQuery = true)
    public List<ProductWiseStock> getProductWiseStock();
@Query(value = """
            select max(billNo)+1 as maxCode from sales
            """,nativeQuery = true)
public  int getMaxCode();
}
