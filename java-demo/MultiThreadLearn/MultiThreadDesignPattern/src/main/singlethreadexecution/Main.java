package com.racer.singlethreadexecution;

public class Main{
    public static void main(String[] args) {
        System.out.println("Testing Gate, hit CTRL+C to exit.\n");
        Gate gate = new Gate();
        new UserThread(gate,"Alice","Alaska").start();
        new UserThread(gate,"Bobby","Brazil").start();
        new UserThread(gate,"Chris","Canada").start();
    }
}