package com.racer.iterator.impl;
import com.racer.iterator.*;
import java.util.ArrayList;

public class PancakeHouseIterator implements Iterator{
	ArrayList<MenuItem> items;
	int position = 0;
	public PancakeHouseIterator(ArrayList<MenuItem> items){
		this.items=items;
	}
	public Object next(){
		MenuItem menuItem = items.get(position++);
		return menuItem;
	}

	public boolean hasNext(){
		if(position>=items.size()||items.get(position)==null)
			return false;
		else
			return true;
	}
}
