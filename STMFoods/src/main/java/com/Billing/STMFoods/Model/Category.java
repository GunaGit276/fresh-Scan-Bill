package com.Billing.STMFoods.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@Table(name = "category")
@AllArgsConstructor
@NoArgsConstructor
public class Category {
    @Id
    @Column(name = "code" , unique = true, nullable = false)
    private int code;
    @Column(name = "name" , unique = true, nullable = false,length = 50)
    private String name;
    @Column(name = "active" ,  nullable = false,length = 1)
    private String active;





}
