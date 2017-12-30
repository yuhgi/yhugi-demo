package com.racer.observer;
import java.util.ArrayList;
import java.util.List;
public class WeatherData implements Subject{
	private List<Observer> observers;
	private float temperature;
	private float humidtity;
	private float pressure;
	public WeatherData(){
		observers=new ArrayList<Observer>();
	}
	public void registerObserver(Observer o){
		observers.add(o);
	}
	public void removeObserver(Observer o){
		int index=observers.indexOf(o);
		if(index>=0){
			observers.remove(index);
		}
		
	}
	public void notifyObservers(){
		for(int i=0;i<observers.size();i++){
			Observer observer=(Observer)observers.get(i);
			observer.update(temperature,humidtity,pressure);
		}
	}

	public void measurementsChanged(){
		notifyObservers();
	}


	public void setMeasurements(float temperature,float humidtity,float pressure){
		this.temperature=temperature;
		this.humidtity=humidtity;
		this.pressure=pressure;
		measurementsChanged();
	}
}