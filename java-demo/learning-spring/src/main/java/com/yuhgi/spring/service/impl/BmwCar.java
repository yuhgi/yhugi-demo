package com.yuhgi.spring.service.impl;

import com.yuhgi.spring.service.ICar;
import org.springframework.stereotype.Service;

@Service
public class BmwCar implements ICar{

    public String getCarName(){
        return "BMW car";
    }
}
