package com.racer.mybatis.test;

import static org.junit.Assert.*;
import junit.framework.Assert;

import org.junit.Test;

import com.racer.mybatis.model.*;
import com.racer.mybatis.dao.*;
import com.racer.mybatis.dao.impl.EmployeeDao;

public class EmployeeTest {
	private static IEmployeeDao dao = new EmployeeDao();
	@Test
	public void selectByEmployeeIdTest() {
		Employee employee = dao.selectByEmployeeId(1);
		assertEquals(1, employee.getEmployeeId());
		assertEquals("张三",employee.getEmployeeName());
	}

}
