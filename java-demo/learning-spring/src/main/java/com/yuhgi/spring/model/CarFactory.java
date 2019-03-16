package com.yuhgi.spring.model;

import org.springframework.beans.factory.annotation.Autowired;

import com.yuhgi.spring.service.ICar;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

@Component
public class CarFactory {

    @Autowired
    @Qualifier("bmwCar")
    private ICar car;

    @Resource(name="benzCar")
    private ICar secondCar;

    public String toString(){
        return car.getCarName() + ',' + secondCar.getCarName();
    }

}

