package com.yuhgi.springmvc.model;

import lombok.Data;
import org.hibernate.validator.constraints.NotBlank;
import org.hibernate.validator.constraints.Range;

@Data
public class Student {
    private String id;

    @NotBlank(message="姓名不能为空")
    private String name;

    @Range(min=10,max=30,message = "年龄为10到30岁之间")
    private int age;

    @NotBlank(message="专业不能为空")
    private String subject;

}
