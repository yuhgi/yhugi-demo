package com.yuhgi.spring.model;

import org.springframework.beans.factory.annotation.Autowired;

import com.yuhgi.spring.service.ICar;
import org.springframework.beans.factory.annotation.Qualifier;

public class CarFactory {

    @Autowired
    @Qualifier("bmwCar")
    private ICar car;

    public String toString(){
        return car.getCarName();
    }

}

