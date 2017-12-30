package com.racer.composite;
import java.util.*;
/**
 * 菜单项
 * 
 * @author Ren Wanchun
 * @version v1.0
 */
public class MenuItem extends MenuComponent{
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

	public void print(){
		System.out.print(" "+getName());
		if(isVegetarian()){
		    System.out.print("(v)");
		}
		System.out.println(", "+getPrice());
		System.out.println("    --"+getDescription());
	}

	public Iterator createIterator(){
		return new NullIterator();
	}
}