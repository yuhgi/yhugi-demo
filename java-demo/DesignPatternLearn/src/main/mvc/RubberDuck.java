package com.racer.mvc;

public class RubberDuck implements Quackable{
    Observable observable;
    public RubberDuck(){
        this.observable = new Observable(this);
    }
    
    public void registerObserver(Observer observer){
        observable.registerObserver(observer);
    }
    public void notifyObservers(){
        observable.notifyObservers();
    }
    public void quack(){
        System.out.println("Squeak");
        notifyObservers();
    }
}