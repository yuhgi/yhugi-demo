package DAOTest.dao.proxy;

import java.util.List;
import java.util.ArrayList;
import java.sql.ResultSet;
import DAOTest.dao.IEmployeeDAO;
import DAOTest.dao.impl.EmployeeDAOImpl;
import DAOTest.VO.Employee;
import DAOTest.dbc.DatabaseConnection;
public class EmployeeDAOProxy implements IEmployeeDAO{
	private DatabaseConnection dbc=null;
	private IEmployeeDAO dao=null;
	public EmployeeDAOProxy()throws Exception{
		this.dbc=new DatabaseConnection();
		this.dao=new EmployeeDAOImpl(this.dbc.getConnection());
	}
	
	public boolean doCreate(Employee emp)throws Exception{
		boolean flag=false;
		try{
			if(this.dao.findById(emp.getEmpno())==null){
				flag=this.dao.doCreate(emp);
			}
		}
		catch(Exception e){
			throw e;
		}
		finally{
			this.dbc.close();
		}
		return flag;
	}
	
	public List<Employee> findAll(String keyword)throws Exception{
		List<Employee> all=null;
		try{
			all=this.dao.findAll(keyword);
		}
		catch(Exception e){
			throw e;
		}
		finally{
			this.dbc.close();
		}
		return all;
	}
	
	public Employee findById(int empno)throws Exception{
		Employee emp=null;
		try{
			emp=this.dao.findById(empno);
		}
		catch(Exception e){
			throw e;
		}
		finally{
			this.dbc.close();
		}
		return emp;
	}
}
