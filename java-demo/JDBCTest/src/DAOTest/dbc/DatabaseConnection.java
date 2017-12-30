package DAOTest.dbc;

/**
 * @author vincent
 *
 */
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnection {
	private static final String DBDRIVER="com.mysql.jdbc.Driver";
	private static final String DBURL="jdbc:mysql://localhost:3306/learnjava";
	private static final String DBUSER="root";
	private static final String DBPASSWORD="123456";
	private Connection conn;
	public DatabaseConnection()throws Exception{
		Class.forName(DBDRIVER);
		this.conn=DriverManager.getConnection(DBURL,DBUSER,DBPASSWORD);
	}
	public static void main(String[] args){
		try{
			DatabaseConnection databaseConn=new DatabaseConnection();
			Connection conn=databaseConn.getConnection();
			databaseConn.close();
			System.out.println("close");
			conn.close();
		}
		catch(Exception e){
			System.out.print(e.toString());
		}
	}
	public Connection getConnection(){
		return this.conn;
	}
	
	public void close()throws Exception{
		if(this.conn!=null){
			try{
				this.conn.close();
			}
			catch(Exception e){
				throw e;
			}
		}
	}
}
