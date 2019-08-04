package com.yuhgi.demo.slf4j;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.lang.reflect.Array;
import java.util.Date;

class Student{
    String name;
    int age;
    public Student(String name,int age){
        this.name = name;
        this.age = age;
    }
    @Override
    public String toString(){
        return "Student:"+this.name+"-"+this.age;
    }
}

public class App {
    public static void main(String[] args) {
        Logger logger = LoggerFactory.getLogger(App.class);
            int arr[]= {1,2,3,4};
            logger.trace("Hello World - {}","trace");
            logger.debug("Hello World - {}","debug");
            logger.info("Hello World - {}","info");
            logger.warn("Hello World - {}","warn");
            logger.error("Hello World - {}","error");
            logger.error("This is a Class {}",new Student("Mary",21));
            logger.info("This is a Date {}",new Date());
            logger.info("This is a Array {}",arr);
            // 如何log一个Exception
            logger.error("日志错误描述", new Exception("这是一个错误"));
    }
}
