package com.Billing.STMFoods.DTO;

import jakarta.persistence.ColumnResult;
import jakarta.persistence.ConstructorResult;
import jakarta.persistence.Entity;
import jakarta.persistence.SqlResultSetMapping;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

//@AllArgsConstructor
//@NoArgsConstructor
//@Data
//@SqlResultSetMapping(
//        name = "ProductWiseStockMapping",
//        classes = @ConstructorResult(
//                targetClass = ProductWiseStock.class,
//                columns = {
//                        @ColumnResult(name = "procode", type = Integer.class),
//                        @ColumnResult(name = "proname", type = String.class),
//                        @ColumnResult(name = "quantity", type = Integer.class),
//                        @ColumnResult(name = "weight", type = Double.class)
//                }
//        )
//)
//public class ProductWiseStock {
//
//    private int procode;
//    private  String proname;
//    private int quantity;
//    private double weight;
//
//}
public interface ProductWiseStock {
    int getProcode();
    String getProname();
    String getCaname();
    int getQuantity();
    double getWeight();
    LocalDate getLastentry();
    int getLowstock();
}