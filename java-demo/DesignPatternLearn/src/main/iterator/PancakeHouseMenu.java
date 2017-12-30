package com.racer.iterator.impl;

import com.racer.iterator.MenuItem;
import com.racer.iterator.Menu;
import java.util.*;

public class PancakeHouseMenu implements Menu{
	ArrayList<MenuItem> menuItems;

	public PancakeHouseMenu(){
		menuItems = new ArrayList<MenuItem>();

		addItem("K&B's Pancake Breakfast","Pancake with scrambled eggs, and toast",true,2.99);
		addItem("Regular Pancake Breakfast","Pancake with fried eggs, and sausage",false,2.99);
		addItem("Blueberry Pancakes","Pancakes made with fresh blueberries",true,3.49);
		addItem("Waffles","with your choices of blueberries or strawberries",true,3.59);
	}

	public void addItem(String name,String description,boolean vegetarian,double price){
		MenuItem menuItem = new MenuItem(name,description,vegetarian,price);
		menuItems.add(menuItem);
	}

	public java.util.Iterator createIterator(){
		return menuItems.iterator();
	}
}