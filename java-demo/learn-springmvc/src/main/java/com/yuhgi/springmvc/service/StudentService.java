package com.yuhgi.springmvc.service;

import java.util.ArrayList;
import java.util.Random;

import com.yuhgi.springmvc.model.Student;
import org.springframework.stereotype.Service;

@Service
public class StudentService {
    private ArrayList<Student> list;
    public StudentService(){
        ArrayList<Student> list =  new ArrayList<Student>();
        for(int i=0;i<100;i++){
            Student s = new Student();
            s.setId(Integer.toString(i));
            s.setName("张三"+i);
            s.setAge(10 + new Random().nextInt(20));
            s.setSubject("计算机"+i);
            list.add(s);
        }
        this.list = list;
    }
    public ArrayList<Student> getList(){
        return this.list;
    }

    public Boolean addStudent(Student s){
        this.list.add(s);
        return true;
    }

    public Student findStudent(String id){
        for(Student s : this.list){
            if(s.getId().equals(id)){
                return s;
            }
        }
        return null;
    }

    public Student delStudent(String id){
        for(Student s : this.list){
            if(s.getId().equals(id)){
                this.list.remove(s);
                return s;
            }
        }
        return null;
    }
}
