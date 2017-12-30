package com.racer.prototype;

public class Family implements Cloneable{
	private String father;
	private String mother;

	public Family(String father,String mother){
		this.father = father;
		this.mother = mother;
	}
	public void setFather(String father){
		this.father = father;
	}

	public String getFather(){
		return this.father;
	}

	public void setMother(String mother){
		this.mother = mother;
	}

	public String getMother(){
		return this.mother;
	}

	public Family clone()throws CloneNotSupportedException{
		return (Family)super.clone();
	}

	public String toString(){
		return "Father:"+this.father+", Mother:"+this.mother;
	}
}