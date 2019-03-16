package com.yuhgi.spring.service.impl;

import com.yuhgi.spring.service.ICar;
import org.springframework.stereotype.Service;

@Service
public class BenzCar implements ICar{

    public String getCarName(){
        return "Benz car";
    }
}
