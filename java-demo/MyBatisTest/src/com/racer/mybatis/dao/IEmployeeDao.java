package com.racer.mybatis.dao;

import com.racer.mybatis.model.Employee;

public interface IEmployeeDao {
	public Employee selectByEmployeeId(int id);
}
