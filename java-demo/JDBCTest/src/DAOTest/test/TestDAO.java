package DAOTest.test;
import java.util.List;
import java.util.Iterator;
import DAOTest.VO.Employee;
import DAOTest.factory.DAOFactory;
public class TestDAO {
	public static void main(String[] args)throws Exception{
		insertTest();
		selectAllTest();
		selectTest();
	}
	private static void insertTest()throws Exception{
		Employee emp=null;
		for(int i=0;i<7;i++){
			emp=new Employee();
			emp.setEmpno(1000 + i) ;
			emp.setEmpName("刘向阳" + i) ;
			emp.setJob("程序员" + i) ;
			emp.setHireDate(new java.util.Date()) ;
			emp.setSalary(500 * i) ;
			
			if(DAOFactory.getIEmployeeDAOInstance().doCreate(emp)==true){
				System.out.println("Insert is done.");
			}
			else{
				System.out.println("NO "+emp.getEmpno()+" :record is exist");
			}
		}
	}
	
	private static void selectAllTest() throws Exception{
		List<Employee> all=DAOFactory.getIEmployeeDAOInstance().findAll("程序");
		Iterator<Employee> iter=all.iterator();
		while(iter.hasNext()){
			Employee emp=iter.next();
			System.out.println("NO "+emp.getEmpno()+" Name: "+emp.getEmpName()
					+" Job: "+emp.getJob());
		}
	}
	
	private static void selectTest()throws Exception{
		Employee emp=null;
		emp=DAOFactory.getIEmployeeDAOInstance().findById(1002);
		System.out.println("NO "+emp.getEmpno()+" Name: "+emp.getEmpName()
				+" Job: "+emp.getJob());
	}
}
