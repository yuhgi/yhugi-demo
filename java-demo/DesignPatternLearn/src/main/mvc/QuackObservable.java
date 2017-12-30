package com.racer.mvc;

public interface QuackObservable{
    public void registerObserver(Observer observer);
    public void notifyObservers();
}