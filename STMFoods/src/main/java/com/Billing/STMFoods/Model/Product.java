package com.Billing.STMFoods.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "product")
@AllArgsConstructor
@NoArgsConstructor
public class Product  {
    @Id
    @Column(name = "code" , unique = true, nullable = false)
    private int code;
    @Column(name = "name" , unique = true, nullable = false,length = 50)
    private String name;
    @Column(name = "cacode" )
    private int cacode;
    @Column(name = "grossamt")
    private double grossAmt;
    @Column(name = "taxper")
    private double taxPer;
    @Column(name = "netamt")
    private double netAmt;
    @Column(name = "disper")
    private double disper;
    @Column(name = "bestbefore")
    private int bestBefore;
    @Column(name = "lowstock")
    private int lowStock;
    @Column(name = "salemode")
    private String saleMode;
    @Column(name = "active" ,  nullable = false,length = 1)
    private String active;


}
