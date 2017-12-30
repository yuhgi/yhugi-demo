package com.racer.mvc;

public class DuckCall implements Quackable{
    Observable observable;
    public DuckCall(){
        this.observable = new Observable(this);
    }
    
    public void registerObserver(Observer observer){
        observable.registerObserver(observer);
    }
    public void notifyObservers(){
        observable.notifyObservers();
    }
    public void quack(){
        System.out.println("Kwak");
        notifyObservers();
    }
}