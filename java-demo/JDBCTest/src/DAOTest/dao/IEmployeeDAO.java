package DAOTest.dao;

import DAOTest.VO.Employee;
import java.util.List;;
public interface IEmployeeDAO {
	public boolean doCreate(Employee employee)throws Exception;
	public List<Employee> findAll(String keyword)throws Exception;
	public Employee findById(int empno)throws Exception;
}
