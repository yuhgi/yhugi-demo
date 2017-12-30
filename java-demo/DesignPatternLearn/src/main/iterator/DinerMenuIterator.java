package com.racer.iterator.impl;
import java.util.Iterator;
import com.racer.iterator.MenuItem;
import com.racer.iterator.Menu;

public class DinerMenuIterator implements Iterator{
	MenuItem[] items;
	int position = 0;
	public DinerMenuIterator(MenuItem[] items){
		this.items=items;
	}
	public Object next(){
		MenuItem menuItem = items[position++];
		return menuItem;
	}

	public boolean hasNext(){
		if(position>=items.length||items[position]==null)
			return false;
		else
			return true;
	}
	public void remove(){
		if(position<=0){
			throw new IllegalStateException("You can't remove an item until you've done at least one next()");
		}
		if(items[position-1]!=null){
			for(int i=position-1;i<(items.length-1);i++){
				items[i]=items[i+1];
			}
			items[items.length-1]=null;
		}
	}
}
