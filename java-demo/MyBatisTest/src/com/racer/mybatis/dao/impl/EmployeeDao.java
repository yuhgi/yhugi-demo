package com.racer.mybatis.dao.impl;

import com.racer.mybatis.dao.IEmployeeDao;
import com.racer.mybatis.model.Employee;
import java.io.Reader;
import java.io.IOException;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

public class EmployeeDao implements IEmployeeDao {
	private static Reader reader;
	private static SqlSessionFactory sessionFactory;
	static{
		try{
			reader = Resources.getResourceAsReader("config/Configuration.xml");
			sessionFactory = new SqlSessionFactoryBuilder().build(reader);
		}
		catch(IOException e){
			e.printStackTrace();
		}
	}
	public Employee selectByEmployeeId(int id){
		SqlSession session = sessionFactory.openSession();
		try{
			Employee employee =session.selectOne("com.racer.mybatis.mapper.EmployeeMapper.selectEmployeeById",id);
			return employee;
		}
		catch(Exception e){
			e.printStackTrace();
			return null;
		}
		finally{
			session.close();
		}
	}
}
