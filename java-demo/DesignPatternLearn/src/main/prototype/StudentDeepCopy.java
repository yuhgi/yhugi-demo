package com.racer.prototype;

public class StudentDeepCopy implements Cloneable{
	private String name;
	private int age;
	private Family family;
	public StudentDeepCopy(String name,int age,Family family){
		this.name = name;
		this.age = age;
		this.family = family;
	}
	public void setName(String name){
		this.name = name;
	}
	public String getName(){
		return this.name;
	}

	public void setAge(int age){
		this.age = age;
	}
	public int getAge(){
		return this.age;
	}

	public void setFamily(Family family){
		this.family = family;
	}

	public Family getFamily(){
		return this.family;
	}

	public String toString(){
		return "Name: "+this.name+", Age: "+this.age+", "+family;
	}
	public StudentDeepCopy clone()throws CloneNotSupportedException{
		StudentDeepCopy student =  (StudentDeepCopy)super.clone();
		student.family = this.family.clone();
		return student;
	}
}