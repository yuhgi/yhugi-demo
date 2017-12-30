package DAOTest.VO;

import java.util.Date;
public class Employee {
	private int empno;
	private String empname;
	private String job;
	private Date hiredate;
	private float salary;
	
	public int getEmpno(){
		return empno;
	}
	public void setEmpno(int empno){
		this.empno=empno;
	}
	
	public String getEmpName(){
		return empname;
	}
	public void setEmpName(String empname){
		this.empname=empname;
	}
	
	public String getJob(){
		return job;
	}
	public void setJob(String job){
		this.job=job;
	}
	
	public Date getHireDate(){
		return hiredate;
	}
	public void setHireDate(Date hiredate){
		this.hiredate=hiredate;
	}
	
	public float getSalary(){
		return salary;
	}
	public void setSalary(float salary){
		this.salary=salary;
	}
}
