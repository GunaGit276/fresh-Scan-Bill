package com.Billing.STMFoods.Model;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "sales")
public class Sales {
    @Id
    @Column(name = "billno" , unique = true, nullable = false)
    private int billNo;
    @Column(name = "entrydate" , nullable = false)
    private LocalDate entrydate;
    @Column(name = "cusId")
    private int cusId;
    @Column(name = "procode")
    private int procode;
    @Column(name = "quantity" , nullable = false)
    private int quantity;
    @Column(name = "weight" , nullable = false)
    private  double weight;
    @Column(name = "status" , nullable = false)
    private String status;
    @Column(name = "grossamt")
    private double grossAmt;
    @Column(name = "disamt")
    private double disamt;
    @Column(name = "spcdisamt")
    private double spcDisamt;
    @Column(name = "netamt")
    private double netAmt;
    @Column(name = "taxamt")
    private double taxamt;
    @Column(name = "totamt")
    private double totamt;
}
