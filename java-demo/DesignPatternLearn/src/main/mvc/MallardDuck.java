package com.racer.mvc;

public class MallardDuck implements Quackable{
    Observable observable;
    public MallardDuck(){
        this.observable = new Observable(this);
    }
    
    public void registerObserver(Observer observer){
        observable.registerObserver(observer);
    }
    public void notifyObservers(){
        observable.notifyObservers();
    }

    public void quack(){
        System.out.println("Quack");
        notifyObservers();
    }
}