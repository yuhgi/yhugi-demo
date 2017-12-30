package com.racer.prototype;

public class Main{
	public static void main(String[] args)throws CloneNotSupportedException {
		StudentShallowCopy student1 = new StudentShallowCopy("张三",22,new Family("张三爸爸","张三妈妈"));
		StudentShallowCopy student2 = student1.clone();
		student1.setAge(25);
		student1.getFamily().setFather("张三新爸爸");
		System.out.println("student1: "+student1);
		System.out.println("student2: "+student2);

		StudentDeepCopy student3 = new StudentDeepCopy("张三",22,new Family("张三爸爸","张三妈妈"));
		StudentDeepCopy student4 = student3.clone();
		student3.setAge(25);
		student3.getFamily().setFather("张三新爸爸");
		System.out.println("student3: "+student3);
		System.out.println("student4: "+student4);
	}
}