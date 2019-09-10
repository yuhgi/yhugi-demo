package com.yuhgi.shiro;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.config.IniSecurityManagerFactory;
import org.apache.shiro.mgt.SecurityManager;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.util.Factory;
import org.junit.Assert;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

public class TestShiro {
    @Test
    public void testHelloworld(){
        //用户们
        User zhang3 = new User();
        zhang3.setName("zhang3");
        zhang3.setPassword("12345");

        User li4 = new User();
        li4.setName("li4");
        li4.setPassword("abcde");

        User wang5 = new User();
        wang5.setName("wang5");
        wang5.setPassword("wrongpassword");

        List<User> users = new ArrayList<>();

        users.add(zhang3);
        users.add(li4);
        users.add(wang5);
        //角色们
        String roleAdmin = "admin";
        String roleProductManager ="productManager";

        List<String> roles = new ArrayList<>();
        roles.add(roleAdmin);
        roles.add(roleProductManager);

        //权限们
        String permitAddProduct = "addProduct";
        String permitAddOrder = "addOrder";

        List<String> permits = new ArrayList<>();
        permits.add(permitAddProduct);
        permits.add(permitAddOrder);

        //登陆每个用户
        for (User user : users) {
            if(ShiroUtils.login(user))
                System.out.printf("%s \t登录成功，用的密码是 %s\t %n",user.getName(),user.getPassword());
            else
                System.out.printf("%s \t登录失败，用的密码是 %s\t %n",user.getName(),user.getPassword());
        }

        //判断能够登录的用户是否拥有某个角色
        for (User user : users) {
            for (String role : roles) {
                if(ShiroUtils.login(user)) {
                    if(ShiroUtils.hasRole(user, role))
                        System.out.printf("%s\t 拥有角色: %s\t%n",user.getName(),role);
                    else
                        System.out.printf("%s\t 不拥有角色: %s\t%n",user.getName(),role);
                }
            }
        }
        System.out.println("-------how2j 分割线------");

        //判断能够登录的用户，是否拥有某种权限
        for (User user : users) {
            for (String permit : permits) {
                if(ShiroUtils.login(user)) {
                    if(ShiroUtils.isPermitted(user, permit))
                        System.out.printf("%s\t 拥有权限: %s\t%n",user.getName(),permit);
                    else
                        System.out.printf("%s\t 不拥有权限: %s\t%n",user.getName(),permit);
                }
            }
        }
    }
}
