package com.racer.mvc;

public class RedheadDuck implements Quackable{
    Observable observable;
    public RedheadDuck(){
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