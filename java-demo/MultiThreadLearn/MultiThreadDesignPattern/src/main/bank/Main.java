package com.racer.bank;

public class Main{
    public static void main(String[] args) {
        Bank CHINA_BANK = new Bank("Ben Walish",1000);
        Runnable task1 = new WithDrawTask(CHINA_BANK);
        Runnable task2 = new DepositTask(CHINA_BANK);
        for(int i=0;i<10;i++)
            (new Thread(task1)).start();
        for(int i=0;i<5;i++)
            (new Thread(task2)).start();
    }
}

class WithDrawTask implements Runnable{
    Bank bank;
    public WithDrawTask(Bank bank){
        this.bank=bank;
    }
    public void run(){
        while(true){
            bank.withdraw(1);
        }
    }
}

class DepositTask implements Runnable{
    Bank bank;
    public DepositTask(Bank bank){
        this.bank=bank;
    }
    public void run(){
        while(true){
            bank.deposit(1);
        }
    }
}