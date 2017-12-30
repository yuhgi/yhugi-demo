package com.racer.iterator;

/**
 * 菜单项
 * 
 * @author Ren Wanchun
 * @version v1.0
 */
public class MenuItem{
	String name;//名称
	String description;//描述
	boolean vegetarian;//是否是素食
	double price;//价格

	public MenuItem(String name,String description,boolean vegetarian,double price){
		this.name=name;
		this.description=description;
		this.vegetarian=vegetarian;
		this.price=price;
	}
	public MenuItem(){}

	public String getName(){
		return this.name;
	} 

	public String getDescription(){
		return this.description;
	}

	public boolean isVegetarian(){
		return vegetarian;
	}

	public double getPrice(){
		return price;
	}
}