package com.yuhgi.springmvc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Map;

@Controller
@RequestMapping("/student")
public class Student {
    @RequestMapping(value="/count",method = {RequestMethod.GET,RequestMethod.POST})
    public String count(@RequestParam("count") String count, Map<String,Object> model){
        model.put("count",count);
        return "student";
    }
}
