package com.yuhgi.demo.annotation;

@Description(desc = "i am class annotation",author="mary")
public class Child implements People {
    @Override
    @Description("i am method annotation")
    public String name() {
        return null;
    }

    @Override
    public int age() {
        return 0;
    }

    @Deprecated
    public void work() {
        System.out.println("work");
    }
}
