package com.yuhgi.springmvc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.lang.reflect.Array;
import java.util.Date;
import java.util.Map;

@Controller
public class Home {
    @RequestMapping({"/","/home"})
    public String showHomePage(Map<String,Object> model){
        model.put("date",new Date());

        return "home";
    }
}
