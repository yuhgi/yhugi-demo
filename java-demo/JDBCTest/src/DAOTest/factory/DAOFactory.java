package DAOTest.factory;
import DAOTest.dao.IEmployeeDAO;
import DAOTest.dao.proxy.EmployeeDAOProxy;
public class DAOFactory {
	public static IEmployeeDAO getIEmployeeDAOInstance()throws Exception{
		return new EmployeeDAOProxy();
	}
}
