package com.racer.singlethreadexecution;

public class Gate{
    private int counter = 0;
    private String name = "Nobody";
    private String address = "Nowhere";
    public void pass(String name,String address){
        this.counter++;
        this.name = name;
        for(int i=0;i<100000000;i++);
        this.address = address;
        check();
    }

    public String toString(){
        return "NO."+counter+": "+name+", "+address;
    }

    private void check(){
        if(name.charAt(0)!=address.charAt(0)){
            System.out.println("***** BROKEN *****"+toString());
        }
    }
}