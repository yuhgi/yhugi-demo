package com.yuhgi.demo.annotation;

import java.lang.reflect.Method;

public class App {
    public static void main(String[] args) {
        try {
            Class c = Class.forName("com.yuhgi.demo.annotation.Child");
            // 找到类上面的注解
            boolean isExist = c.isAnnotationPresent(Description.class);
            // 上面的这个方法是用这个类来判断这个类是否存在Description这样的一个注解
            if (isExist) {
                // 拿到注解实例，解析类上面的注解
                Description d = (Description) c.getAnnotation(Description.class);
                System.out.println(d.value());
                System.out.println(d.desc());
                System.out.println(d.author());
                System.out.println(d.age());
            }

            //获取所有的方法
            Method[] ms = c.getMethods();
            // 遍历所有的方法
            for (Method m : ms) {
                boolean isMethodExist = m.isAnnotationPresent(Description.class);
                if (isMethodExist) {
                    Description d1 = m.getAnnotation(Description.class);
                    System.out.println(d1.value());
                }
            }
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}
