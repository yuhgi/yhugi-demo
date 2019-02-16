package com.yuhgi.spring;
import com.yuhgi.spring.model.*;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class App {
    public static void main(String[] args){
        ApplicationContext ctx=new ClassPathXmlApplicationContext("spring.xml");
//        Zoo zoo=(Zoo) ctx.getBean("zoo");
//        System.out.println(zoo.toString());
        CarFactory carFactory = (CarFactory) ctx.getBean("carFactory");
        System.out.println(carFactory.toString());
    }
}
