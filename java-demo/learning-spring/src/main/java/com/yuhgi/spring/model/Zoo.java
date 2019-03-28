package com.yuhgi.spring.model;

import org.springframework.beans.factory.annotation.Autowired;

public class Zoo {
    @Autowired(required = false)
    private Tiger tiger;
    @Autowired(required = false)
    private Monkey monkey;


    public String toString(){
        return tiger + "\n" + monkey;
    }

}
