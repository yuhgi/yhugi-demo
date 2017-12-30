package DAOTest.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import DAOTest.VO.Employee;
import DAOTest.dao.IEmployeeDAO;
public class EmployeeDAOImpl implements IEmployeeDAO{
	private Connection conn=null;
	private PreparedStatement pstmt=null;
	public EmployeeDAOImpl(Connection conn){
		this.conn=conn;
	}
	
	public boolean doCreate(Employee emp)throws Exception{
		boolean flag=false;
		String sql="insert into employee(empno,empname,job,hiredate,salary) values(?,?,?,?,?)";
		this.pstmt=this.conn.prepareStatement(sql);
		this.pstmt.setInt(1,emp.getEmpno());
		this.pstmt.setString(2,emp.getEmpName());
		this.pstmt.setString(3,emp.getJob());
		this.pstmt.setDate(4, new java.sql.Date(emp.getHireDate().getTime()));
		this.pstmt.setFloat(5,emp.getSalary());
		if(this.pstmt.executeUpdate()>0){
			flag=true;
		}
		this.pstmt.close();
		return flag;
	}
	
	public List<Employee> findAll(String keyword)throws Exception{
		List<Employee> all=new ArrayList<Employee>();
		String sql="select empno,empname,job,hiredate,salary from employee where empname like ? or job like ?";
		this.pstmt=this.conn.prepareStatement(sql);
		this.pstmt.setString(1, "%"+keyword+"%");
		this.pstmt.setString(2, "%"+keyword+"%");
		ResultSet rs=this.pstmt.executeQuery();
		while(rs.next()){
			Employee emp=new Employee();
			emp.setEmpno(rs.getInt(1));
			emp.setEmpName(rs.getString(2));
			emp.setJob(rs.getString(3));
			emp.setHireDate(rs.getDate(4));
			emp.setSalary(rs.getFloat(5));
			all.add(emp);
		}
		this.pstmt.close();
		return all;
	}
	
	public Employee findById(int empno)throws Exception{
		Employee emp=null;
		String sql="select empno,empname,job,hiredate,salary from employee where empno=?";
		this.pstmt=this.conn.prepareStatement(sql);
		this.pstmt.setInt(1,empno);
		ResultSet rs=this.pstmt.executeQuery();
		if(rs.next()){
			emp=new Employee();
			emp.setEmpno(rs.getInt(1));
			emp.setEmpName(rs.getString(2));
			emp.setJob(rs.getString(3));
			emp.setHireDate(rs.getDate(4));
			emp.setSalary(rs.getFloat(5));
		}
		this.pstmt.close();
		return emp;
	}
}
