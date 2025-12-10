package com.Billing.STMFoods.Model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "stock")
public class Stock {
    @Id
    @Column(name = "code" , unique = true, nullable = false)
    private int code;
    @Column(name = "entryDate" , nullable = false)
    private LocalDate entryDate;
    @Column(name = "cacode")
    private int cacode;
    @Column(name = "procode")
    private int procode;
    @Column(name = "remark")
    private String remark;
    @Column(name = "mnfDate" , nullable = false)
    private LocalDate mnfDate;
    @Column(name = "expDate" , nullable = false)
    private LocalDate expDate;
    @Column(name = "quantity" , nullable = false)
    private int quantity;
    @Column(name = "weight" , nullable = false)
    private  double weight;
    @Column(name = "cquantity" , nullable = false)
    private int cquantity;
    @Column(name = "cweight" , nullable = false)
    private  double cweight;
}
