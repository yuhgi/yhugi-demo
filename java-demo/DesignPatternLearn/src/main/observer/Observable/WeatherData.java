package com.racer.observer.observable;
import java.util.*;
public class WeatherData extends Observable{
	private float temperature;
	private float humidtity;
	private float pressure;
	public WeatherData(){
	}

	public void measurementsChanged(){
		setChanged();
		notifyObservers();
	}


	public void setMeasurements(float temperature,float humidtity,float pressure){
		this.temperature=temperature;
		this.humidtity=humidtity;
		this.pressure=pressure;
		measurementsChanged();
	}

	public float getTemperature(){
		return this.temperature;
	}

	public float getHumidity(){
		return this.humidtity;
	}

	public float getPressure(){
		return this.pressure;
	}
}