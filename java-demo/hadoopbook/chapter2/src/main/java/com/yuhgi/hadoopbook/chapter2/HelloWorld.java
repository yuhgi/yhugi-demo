package com.yuhgi.hadoopbook.chapter2;

public class HelloWorld {
    public static void main(String[] args){
        System.out.println("Hello World!");
        System.out.println("Hello".substring(1,3));
        System.out.println(Integer.parseInt("-001"));

        System.out.println("HelloWorld".matches("^H\\w+d"));
    }
}
